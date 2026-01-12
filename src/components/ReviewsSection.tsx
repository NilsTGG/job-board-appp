import React, { useState } from "react";
import {
  User,
  Calendar,
  Package,
  Clock,
  Star,
  Sparkles,
  MessageSquarePlus,
} from "../icons";
import ReviewFormModal from "./ReviewFormModal";

interface Review {
  id: string;
  customer: string;
  date: string;
  order?: string;
  deliverySpeed?: string;
  trustLevel?: string;
  surprise?: string;
  summary?: string;
  review?: string;
  isReal: boolean;
  isTemplate?: boolean;
}

const ReviewsSection: React.FC = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Real customer reviews only
  const realReviews: Review[] = [
    {
      id: "real-1",
      customer: "ilovebmwe30",
      date: "31/08/2025 19:44",
      order: "I ordered 2 villagers and the process was perfect",
      deliverySpeed:
        "Too quick I expected about a hour maybe longer but it was within 10 minutes",
      trustLevel: "I would trust to do more job",
      surprise: "It was just so quick",
      summary: "Superb quick rapid",
      isReal: true,
    },
    {
      id: "real-2",
      customer: "Alan",
      date: "14/09/2025 19:48",
      order: "Villager relocation (multiple villagers delivered safely)",
      deliverySpeed: "On time / smooth (no delays reported)",
      trustLevel: "Very professional service — would recommend",
      surprise: "All villagers arrived safe and sound",
      summary: "Will definitely recommend Because You Won't™ to everyone!",
      isReal: true,
    },
  ];

  // Duplicate reviews for seamless infinite loop (only real reviews)
  const reviewsForLoop = [
    ...realReviews,
    ...realReviews,
    ...realReviews,
    ...realReviews,
  ];

  // "Leave a Review" placeholder card
  const LeaveReviewCard: React.FC = () => (
    <div className="flex-shrink-0 w-80 md:w-96 p-6 rounded-xl border border-dashed border-brand-primary/50 bg-brand-surface shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary">
      <div className="text-center py-4">
        <div className="inline-flex p-4 rounded-full bg-brand-primary/10 mb-4 border border-brand-primary/20">
          <MessageSquarePlus className="h-8 w-8 text-brand-primary" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Share Your Experience!
        </h3>
        <p className="text-brand-muted text-sm mb-6 leading-relaxed">
          Had a great delivery? Let others know about your experience with
          Because You Won't™
        </p>
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/80 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-primary/25 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-black"
        >
          <Star className="h-4 w-4" />
          Leave a Review
        </button>
        <p className="text-xs text-brand-muted mt-4">
          Your review will be sent to our team
        </p>
      </div>
    </div>
  );

  const ReviewCard: React.FC<{ review: Review; index: number }> = ({
    review,
    index,
  }) => {
    const cardClasses =
      "bg-brand-surface border-brand-border/50 shadow-black/20";

    return (
      <div
        className={`flex-shrink-0 w-80 md:w-96 p-6 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${cardClasses}`}
        style={{
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-brand-success/10 border border-brand-success/20">
              <User className="h-5 w-5 text-brand-success" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">
                {review.customer}
              </div>
              <div className="flex items-center gap-1 text-xs text-brand-muted">
                <Calendar className="h-3 w-3" />
                {review.date}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-brand-success">
            <div className="w-2 h-2 bg-brand-success rounded-full animate-pulse"></div>
            <span className="text-xs font-bold uppercase tracking-wider">
              Verified
            </span>
          </div>
        </div>

        {/* Review Content */}
        <div className="space-y-3 text-sm">
          {review.order && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Package className="h-4 w-4 text-brand-primary" />
                <span className="font-bold text-gray-300">Order:</span>
              </div>
              <p className="text-gray-400 pl-6">&quot;{review.order}&quot;</p>
            </div>
          )}

          {review.deliverySpeed && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-brand-accent" />
                <span className="font-bold text-gray-300">Delivery Speed:</span>
              </div>
              <p className="text-gray-400 pl-6">
                &quot;{review.deliverySpeed}&quot;
              </p>
            </div>
          )}

          {review.trustLevel && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-green-400" />
                <span className="font-medium text-green-300">Trust Level:</span>
              </div>
              <p className="text-gray-300 pl-6">
                &quot;{review.trustLevel}&quot;
              </p>
            </div>
          )}

          {review.surprise && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="font-medium text-yellow-300">Surprise:</span>
              </div>
              <p className="text-gray-300 pl-6">
                &quot;{review.surprise}&quot;
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        {review.summary && (
          <div className="mt-4 p-3 rounded-lg bg-green-900/20">
            <div className="font-semibold text-green-300">Summary:</div>
            <p className="text-gray-300 italic">&quot;{review.summary}&quot;</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      className="py-16 bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10 overflow-hidden"
      id="reviews"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Real testimonials from satisfied customers who trusted us with their
            Minecraft logistics needs
          </p>
          <div className="flex justify-center items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>Verified Reviews</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-2 text-blue-400">
              <MessageSquarePlus className="h-4 w-4" />
              <span>Your Review Could Be Next!</span>
            </div>
          </div>
        </div>

        {/* Infinite Scroll Container */}
        <div className="relative">
          {/* Gradient overlays for seamless blending */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 via-gray-900/50 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Reviews Container */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 hover-pause-animation reviews-scroll"
              style={{
                width: `${(reviewsForLoop.length + 2) * 400}px`,
                animation: `scroll-horizontal ${
                  (reviewsForLoop.length + 2) * 8
                }s linear infinite`,
              }}
            >
              {reviewsForLoop.map((review, index) => (
                <ReviewCard
                  key={`${review.id}-${Math.floor(index / realReviews.length)}`}
                  review={review}
                  index={index}
                />
              ))}
              {/* Add Leave Review cards scattered in the scroll */}
              <LeaveReviewCard />
              <LeaveReviewCard />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30 max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-green-600 border-2 border-gray-900 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-gray-900 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-600 border-2 border-gray-900 flex items-center justify-center text-white font-bold text-sm">
                  +?
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Be Part of Our Growing Community!
            </h3>
            <p className="text-gray-300 mb-6">
              Use our services and share your experience. Your feedback helps us
              improve and helps others make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#submit-job"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("submit-job")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Package className="h-4 w-4" />
                Submit Your First Job
              </a>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <Star className="h-5 w-5" />
                Leave a Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      <ReviewFormModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes scroll-horizontal {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${realReviews.length * 400}px);
            }
          }

          .hover-pause-animation:hover {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .reviews-scroll {
              animation: none !important;
            }
          }

          @media (max-width: 768px) {
            @keyframes scroll-horizontal {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-${realReviews.length * 320}px);
              }
            }
          }
        `,
        }}
      />
    </section>
  );
};

export default ReviewsSection;
