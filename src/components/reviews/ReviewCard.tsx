'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { StarRating } from '@/components/ui/StarRating';
import { Review } from '@/types';
import { formatDate } from '@/lib/utils';
import { FiUser } from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';

interface ReviewCardProps {
  review: Review;
  index?: number;
}

export function ReviewCard({ review, index = 0 }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-gradient-to-b from-blue-500 to-purple-500">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Rating */}
          <div className="mb-4">
            <StarRating rating={review.rating} readonly size="sm" />
          </div>

          {/* Review Text */}
          <blockquote className="flex-1 mb-6">
            <p className="text-foreground leading-relaxed italic">
              "{review.review_text}"
            </p>
          </blockquote>

          {/* Reviewer Info */}
          <div className="mt-auto">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <FiUser className="h-5 w-5 text-white" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground truncate">
                  {review.reviewer_name}
                </h4>
                
                {review.reviewer_company && (
                  <div className="flex items-center gap-1 mt-1">
                    <HiOutlineOfficeBuilding className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm text-muted-foreground truncate">
                      {review.reviewer_company}
                    </p>
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(review.created_at)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Skeleton loader for review cards
export function ReviewCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Rating skeleton */}
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className="w-4 h-4 bg-muted rounded animate-pulse"
              />
            ))}
          </div>

          {/* Review text skeleton */}
          <div className="flex-1 mb-6 space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
            <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
          </div>

          {/* Reviewer info skeleton */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
              <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
              <div className="h-3 bg-muted rounded animate-pulse w-1/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
