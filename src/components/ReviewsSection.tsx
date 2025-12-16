import React from "react";
import {
  User,
  Calendar,
  Package,
  Clock,
  Star,
  Sparkles,
  MessageSquarePlus,
} from "../icons";

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
    <div className="flex-shrink-0 w-80 md:w-96 p-6 rounded-xl border border-dashed border-blue-500/50 bg-gradient-to-br from-blue-900/20 to-purple-900/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
      <div className="text-center py-4">
        <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
          <MessageSquarePlus className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Share Your Experience!
        </h3>
        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          Had a great delivery? Let others know about your experience with
          Because You Won't™
        </p>
        <a
          href="https://discord.com/users/nilstg"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          Leave Review on Discord
        </a>
        <p className="text-xs text-gray-400 mt-4">
          Message NilsTG after your order to share feedback
        </p>
      </div>
    </div>
  );

  const ReviewCard: React.FC<{ review: Review; index: number }> = ({
    review,
    index,
  }) => {
    const cardClasses =
      "bg-gradient-to-br from-green-900/20 to-blue-900/10 border-green-500/20 shadow-green-500/10";

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
            <div className="p-2 rounded-lg bg-green-600">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-sm text-green-300">
                {review.customer}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar className="h-3 w-3" />
                {review.date}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">Verified</span>
          </div>
        </div>

        {/* Review Content */}
        <div className="space-y-3 text-sm">
          {review.order && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Package className="h-4 w-4 text-blue-400" />
                <span className="font-medium text-blue-300">Order:</span>
              </div>
              <p className="text-gray-300 pl-6">&quot;{review.order}&quot;</p>
            </div>
          )}

          {review.deliverySpeed && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-purple-400" />
                <span className="font-medium text-purple-300">
                  Delivery Speed:
                </span>
              </div>
              <p className="text-gray-300 pl-6">
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
              <a
                href="https://discord.com/users/nilstg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Leave Review on Discord
              </a>
            </div>
          </div>
        </div>
      </div>

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
