'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { StarDisplay } from '@/components/ui/StarRating';
import { ReviewCard, ReviewCardSkeleton } from '@/components/reviews/ReviewCard';
import { WriteReviewForm } from '@/components/reviews/WriteReviewForm';
import { Review, ReviewStats } from '@/types';
import { FiMessageSquare, FiPlus, FiX, FiUsers, FiStar } from 'react-icons/fi';

interface ReviewsResponse {
  reviews: Review[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  stats: ReviewStats;
}

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    total_reviews: 0,
    average_rating: 0,
    rating_distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async (page: number = 1, append: boolean = false) => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await fetch(`/api/reviews?page=${page}&limit=6`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data: ReviewsResponse = await response.json();
      
      if (append) {
        setReviews(prev => [...prev, ...data.reviews]);
      } else {
        setReviews(data.reviews);
        setStats(data.stats);
      }
      
      setHasMore(data.pagination.hasMore);
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchReviews(currentPage + 1, true);
    }
  };

  const handleReviewSuccess = () => {
    setShowWriteForm(false);
    // Refresh reviews to show updated stats
    fetchReviews();
  };

  if (error) {
    return (
      <section id="testimonials" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">Failed to load testimonials</p>
            <Button 
              onClick={() => fetchReviews()} 
              variant="outline" 
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Here's what my clients say about working with me
          </p>

          {/* Stats */}
          {!loading && stats.total_reviews > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
            >
              <div className="flex items-center gap-2">
                <StarDisplay rating={stats.average_rating} size="md" showValue />
                <span className="text-sm text-muted-foreground">
                  ({stats.total_reviews} review{stats.total_reviews !== 1 ? 's' : ''})
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <FiUsers className="h-4 w-4" />
                <span className="text-sm">
                  {stats.total_reviews} satisfied client{stats.total_reviews !== 1 ? 's' : ''}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Write Review Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Button
            onClick={() => setShowWriteForm(!showWriteForm)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {showWriteForm ? (
              <>
                <FiX className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <FiPlus className="h-4 w-4 mr-2" />
                Write a Review
              </>
            )}
          </Button>
        </motion.div>

        {/* Write Review Form */}
        {showWriteForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-16"
          >
            <WriteReviewForm onSuccess={handleReviewSuccess} />
          </motion.div>
        )}

        {/* Reviews Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <ReviewCardSkeleton key={index} index={index} />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {reviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  variant="outline"
                  size="lg"
                >
                  {loadingMore ? 'Loading...' : 'Load More Reviews'}
                </Button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <FiMessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No reviews yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Be the first to share your experience working with me!
            </p>
            <Button
              onClick={() => setShowWriteForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <FiPlus className="h-4 w-4 mr-2" />
              Write the First Review
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
