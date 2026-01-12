import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Star,
  Send,
  Loader2,
  CheckCircle,
  MessageSquarePlus,
} from "lucide-react";

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewFormModal: React.FC<ReviewFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [username, setUsername] = useState("");
  const [discord, setDiscord] = useState("");
  const [orderType, setOrderType] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [deliverySpeed, setDeliverySpeed] = useState("");
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID;

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    firstElement?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formspreeId) {
      setSubmitStatus("error");
      setErrorMessage("Review submission not configured.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Format date nicely: "Dec 16, 2025 at 12:51 AM"
      const now = new Date();
      const formattedDate =
        now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }) +
        " at " +
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `⭐ New Review from ${username} (${rating}/5 stars)`,
          reviewType: "Customer Review",
          username,
          discord: discord || "Not provided",
          orderType,
          rating: `${rating}/5 stars`,
          deliverySpeed: deliverySpeed || "Not specified",
          review,
          submittedAt: formattedDate,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form after success
        setTimeout(() => {
          setUsername("");
          setDiscord("");
          setOrderType("");
          setRating(0);
          setDeliverySpeed("");
          setReview("");
          onClose();
          setSubmitStatus("idle");
        }, 2000);
      } else {
        setSubmitStatus("error");
        setErrorMessage("Failed to submit review. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        <div
          ref={modalRef}
          className="relative bg-brand-surface rounded-2xl shadow-xl max-w-lg w-full border border-brand-border/50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-brand-surface border-b border-brand-border/50 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquarePlus className="h-6 w-6 text-brand-primary" />
              <h2
                id="review-modal-title"
                className="text-xl font-bold text-white"
              >
                Leave a Review
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Success State */}
            {submitStatus === "success" && (
              <div className="bg-brand-success/10 border border-brand-success/20 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-brand-success" />
                <div>
                  <p className="text-brand-success font-bold">
                    Review Submitted!
                  </p>
                  <p className="text-brand-success/70 text-sm">
                    Thank you for your feedback!
                  </p>
                </div>
              </div>
            )}

            {/* Error State */}
            {submitStatus === "error" && (
              <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-4">
                <p className="text-red-300">{errorMessage}</p>
              </div>
            )}

            {/* Username */}
            <div>
              <label
                htmlFor="review-username"
                className="block text-sm font-bold text-gray-200 mb-1.5"
              >
                Minecraft Username <span className="text-red-400">*</span>
              </label>
              <input
                id="review-username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your IGN"
                className="w-full bg-brand-black border border-brand-border rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all placeholder:text-gray-500"
              />
            </div>

            {/* Discord */}
            <div>
              <label
                htmlFor="review-discord"
                className="block text-sm font-bold text-gray-200 mb-1.5"
              >
                Discord Username{" "}
                <span className="text-gray-500">(optional)</span>
              </label>
              <input
                id="review-discord"
                type="text"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
                placeholder="username or User#1234"
                className="w-full bg-brand-black border border-brand-border rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all placeholder:text-gray-500"
              />
            </div>

            {/* Order Type */}
            <div>
              <label
                htmlFor="review-order"
                className="block text-sm font-bold text-gray-200 mb-1.5"
              >
                What did you order? <span className="text-red-400">*</span>
              </label>
              <input
                id="review-order"
                type="text"
                required
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                placeholder="e.g., Villager transport, Shop items..."
                className="w-full bg-brand-black border border-brand-border rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all placeholder:text-gray-500"
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-2">
                Rating <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none focus:ring-2 focus:ring-brand-accent rounded transition-transform hover:scale-110"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        star <= (hoverRating || rating)
                          ? "text-brand-accent fill-brand-accent"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-gray-300 text-sm">
                    {rating}/5 stars
                  </span>
                )}
              </div>
            </div>

            {/* Delivery Speed */}
            <div>
              <label
                htmlFor="review-speed"
                className="block text-sm font-bold text-gray-200 mb-1.5"
              >
                How was the delivery speed?
              </label>
              <select
                id="review-speed"
                value={deliverySpeed}
                onChange={(e) => setDeliverySpeed(e.target.value)}
                className="w-full bg-brand-black border border-brand-border rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
              >
                <option value="">Select...</option>
                <option value="Lightning fast! ⚡">Lightning fast! ⚡</option>
                <option value="Very quick">Very quick</option>
                <option value="On time">On time</option>
                <option value="A bit slow">A bit slow</option>
                <option value="Took a while">Took a while</option>
              </select>
            </div>

            {/* Review Text */}
            <div>
              <label
                htmlFor="review-text"
                className="block text-sm font-bold text-gray-200 mb-1.5"
              >
                Your Review <span className="text-red-400">*</span>
              </label>
              <textarea
                id="review-text"
                required
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tell us about your experience..."
                className="w-full bg-brand-black border border-brand-border rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all placeholder:text-gray-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !rating || submitStatus === "success"}
              className="w-full bg-brand-primary hover:bg-blue-600 disabled:bg-brand-surface disabled:text-brand-muted text-white py-3 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-black disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : submitStatus === "success" ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Submitted!
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Review
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewFormModal;
