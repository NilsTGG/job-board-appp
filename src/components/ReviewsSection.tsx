import React from "react";
import { User, Calendar, Package, Clock, Star, Sparkles } from "../icons";

interface Review {
  id: string;
  customer: string;
  date: string;
  order: string;
  deliverySpeed: string;
  trustLevel: string;
  surprise: string;
  summary: string;
  isReal: boolean;
  isTemplate?: boolean;
}

const ReviewsSection: React.FC = () => {
  // Real review data provided
  const realReview: Review = {
    id: "real-1",
    customer: "ilovebmwe30 BMW E30 [SWRZ]",
    date: "31/08/2025 19:44",
    order: "I ordered 2 villagers and the process was perfect",
    deliverySpeed:
      "Too quick I expected about a hour maybe longer but it was within 10 minutes",
    trustLevel: "I would trust to do more job",
    surprise: "It was just so quick",
    summary: "Superb quick rapid",
    isReal: true,
  };

  // Template reviews with variations
  const templateReviews: Review[] = [
    {
      id: "template-1",
      customer: "Your review here? Order now and be forever immortalized!",
      date: "Soon™",
      order: "Your dream delivery awaits...",
      deliverySpeed: "Lightning fast service guaranteed",
      trustLevel: "Join hundreds of satisfied customers",
      surprise: "Professional Minecraft logistics at your service",
      summary: "Order now and experience the difference!",
      isReal: false,
      isTemplate: true,
    },
    {
      id: "template-2",
      customer: "MinecraftPro2024",
      date: "15/09/2025 14:32",
      order: "Needed urgent farm supplies transported across dimensions",
      deliverySpeed: "Faster than my elytra flight!",
      trustLevel: "Already planning my next order",
      surprise: "Zero items lost, perfect communication",
      summary: "Professional service, highly recommend",
      isReal: false,
    },
    {
      id: "template-3",
      customer: "BuilderMaster",
      date: "12/09/2025 09:15",
      order: "Massive building materials delivery to my mega base",
      deliverySpeed: "Completed while I was still organizing my chests",
      trustLevel: "This is my go-to logistics service now",
      surprise: "Even helped optimize my storage system",
      summary: "Beyond expectations, worth every diamond",
      isReal: false,
    },
    {
      id: "template-4",
      customer: "🎯 Your success story could be next!",
      date: "Today",
      order: "Whatever you need delivered, built, or rescued",
      deliverySpeed: "Professional speed, guaranteed results",
      trustLevel: "Join our community of satisfied clients",
      surprise: "Experience premium Minecraft logistics",
      summary: "Submit your job and join the testimonials!",
      isReal: false,
      isTemplate: true,
    },
    {
      id: "template-5",
      customer: "RedstoneEngineer",
      date: "10/09/2025 21:03",
      order: "Complex villager trading hall setup assistance",
      deliverySpeed: "Finished before my redstone contraption was done",
      trustLevel: "Definitely using this service again",
      surprise: "Even gave me some optimization tips",
      summary: "Expert knowledge, flawless execution",
      isReal: false,
    },
    {
      id: "template-6",
      customer: "EndGamePlayer",
      date: "08/09/2025 16:47",
      order: "Emergency shulker rescue from the End",
      deliverySpeed: "Saved my items faster than I could respawn",
      trustLevel: "My new favorite Minecraft service",
      surprise: "Professional gear and backup plans",
      summary: "Reliable, fast, and trustworthy",
      isReal: false,
    },
  ];

  // Combine all reviews and duplicate for seamless loop
  const allReviews = [realReview, ...templateReviews];
  const reviewsForLoop = [...allReviews, ...allReviews, ...allReviews]; // Triple for smooth infinite scroll

  const ReviewCard: React.FC<{ review: Review; index: number }> = ({
    review,
    index,
  }) => {
    const isTemplate = review.isTemplate;
    const cardClasses = isTemplate
      ? "bg-gradient-to-br from-yellow-900/20 to-orange-900/10 border-yellow-500/20 shadow-yellow-500/10"
      : review.isReal
      ? "bg-gradient-to-br from-green-900/20 to-blue-900/10 border-green-500/20 shadow-green-500/10"
      : "bg-gray-800/80 border-gray-600/30 shadow-gray-500/10";

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
            <div
              className={`p-2 rounded-lg ${
                isTemplate
                  ? "bg-yellow-600"
                  : review.isReal
                  ? "bg-green-600"
                  : "bg-blue-600"
              }`}
            >
              {isTemplate ? (
                <Sparkles className="h-5 w-5 text-white" />
              ) : (
                <User className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <div
                className={`font-semibold text-sm ${
                  isTemplate
                    ? "text-yellow-300"
                    : review.isReal
                    ? "text-green-300"
                    : "text-white"
                }`}
              >
                {review.customer}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar className="h-3 w-3" />
                {review.date}
              </div>
            </div>
          </div>
          {review.isReal && (
            <div className="flex items-center gap-1 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium">Verified</span>
            </div>
          )}
          {isTemplate && (
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="h-4 w-4 animate-pulse" />
            </div>
          )}
        </div>

        {/* Review Content */}
        <div className="space-y-3 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Package className="h-4 w-4 text-blue-400" />
              <span className="font-medium text-blue-300">Order:</span>
            </div>
            <p className="text-gray-300 pl-6">&quot;{review.order}&quot;</p>
          </div>

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

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-green-400" />
              <span className="font-medium text-green-300">Trust Level:</span>
            </div>
            <p className="text-gray-300 pl-6">
              &quot;{review.trustLevel}&quot;
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="font-medium text-yellow-300">Surprise:</span>
            </div>
            <p className="text-gray-300 pl-6">&quot;{review.surprise}&quot;</p>
          </div>
        </div>

        {/* Summary */}
        <div
          className={`mt-4 p-3 rounded-lg ${
            isTemplate
              ? "bg-yellow-900/20"
              : review.isReal
              ? "bg-green-900/20"
              : "bg-blue-900/20"
          }`}
        >
          <div
            className={`font-semibold ${
              isTemplate
                ? "text-yellow-300"
                : review.isReal
                ? "text-green-300"
                : "text-blue-300"
            }`}
          >
            Summary:
          </div>
          <p className="text-gray-300 italic">&quot;{review.summary}&quot;</p>
        </div>

        {/* Call to action for templates */}
        {isTemplate && (
          <div className="mt-4 text-center">
            <a
              href="#submit-job"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-semibold text-xs transition-all duration-300 hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("submit-job")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Package className="h-3 w-3" />
              Order Now
            </a>
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
            <div className="flex items-center gap-2 text-yellow-400">
              <Star className="h-4 w-4" />
              <span>Your Review Next?</span>
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
                width: `${reviewsForLoop.length * 400}px`,
                animation: `scroll-horizontal ${
                  reviewsForLoop.length * 8
                }s linear infinite`,
              }}
            >
              {reviewsForLoop.map((review, index) => (
                <ReviewCard
                  key={`${review.id}-${Math.floor(index / allReviews.length)}`}
                  review={review}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-gray-300 mb-4">
              Experience professional Minecraft logistics and share your own
              testimonial
            </p>
            <a
              href="#submit-job"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
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
              transform: translateX(-${allReviews.length * 400}px);
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
                transform: translateX(-${allReviews.length * 320}px);
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
