'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { StarRating } from '@/components/ui/StarRating';
import { reviewFormSchema, type ReviewFormData } from '@/lib/validations';
import { FiSend, FiCheck, FiX } from 'react-icons/fi';

interface WriteReviewFormProps {
  onSuccess?: () => void;
}

export function WriteReviewForm({ onSuccess }: WriteReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0
    }
  });

  const watchedText = watch('review_text', '');

  const onSubmit = async (data: ReviewFormData) => {
    if (rating === 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = { ...data, rating };
      console.log('Submitting review:', formData);
      
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Review API response:', result);

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setRating(0);
        onSuccess?.();
        console.log('Review submitted successfully');
      } else {
        console.error('Review API error:', result);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setValue('rating', newRating);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FiSend className="h-5 w-5" />
          Write a Review
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Share your experience working with me. Your review will be displayed after approval.
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name and Company */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reviewer_name" className="block text-sm font-medium text-foreground mb-2">
                Your Name *
              </label>
              <Input
                id="reviewer_name"
                placeholder="John Doe"
                {...register('reviewer_name')}
                className={errors.reviewer_name ? 'border-red-500' : ''}
              />
              {errors.reviewer_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reviewer_name.message}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="reviewer_company" className="block text-sm font-medium text-foreground mb-2">
                Company/Position
              </label>
              <Input
                id="reviewer_company"
                placeholder="Company Inc. / CEO"
                {...register('reviewer_company')}
                className={errors.reviewer_company ? 'border-red-500' : ''}
              />
              {errors.reviewer_company && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reviewer_company.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="reviewer_email" className="block text-sm font-medium text-foreground mb-2">
              Email Address *
            </label>
            <Input
              id="reviewer_email"
              type="email"
              placeholder="john@example.com"
              {...register('reviewer_email')}
              className={errors.reviewer_email ? 'border-red-500' : ''}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Your email will not be displayed publicly
            </p>
            {errors.reviewer_email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.reviewer_email.message}
              </p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Rating *
            </label>
            <StarRating
              rating={rating}
              onRatingChange={handleRatingChange}
              size="lg"
              className="mb-2"
            />
            {rating === 0 && (
              <p className="text-red-500 text-sm">
                Please select a rating
              </p>
            )}
          </div>

          {/* Review Text */}
          <div>
            <label htmlFor="review_text" className="block text-sm font-medium text-foreground mb-2">
              Your Review *
            </label>
            <Textarea
              id="review_text"
              placeholder="Share your experience working with me..."
              rows={4}
              {...register('review_text')}
              className={errors.review_text ? 'border-red-500' : ''}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.review_text && (
                <p className="text-red-500 text-sm">
                  {errors.review_text.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground ml-auto">
                {watchedText?.length || 0} / 500 characters
              </p>
            </div>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <FiCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                <p className="text-green-800 dark:text-green-200 text-sm">
                  Thank you for your review! It will be displayed after approval.
                </p>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <FiX className="h-4 w-4 text-red-600 dark:text-red-400" />
                <p className="text-red-800 dark:text-red-200 text-sm">
                  Sorry, there was an error submitting your review. Please try again.
                </p>
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <FiSend className="h-4 w-4 mr-2" />
                Submit Review
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
