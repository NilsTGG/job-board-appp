import React, { useState, useEffect, useRef } from "react";
import {
  Package,
  Clock,
  Copy,
  CheckCircle,
  RefreshCw,
  MapPin,
  User,
  MessageCircle,
  X,
} from "lucide-react";

export interface StoredOrder {
  cartItems: Array<{
    product: { id: string; name: string; price: number };
    shop: { name: string };
    quantity: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  userLocation: { x: number; y: number; z: number };
  discord: string;
  ign: string;
  submittedAt: string;
  submissionId?: string | null;
}

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onResend?: () => Promise<{ ok: boolean; message?: string }>;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  isOpen,
  onClose,
  onResend,
}) => {
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [copied, setCopied] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendResult, setResendResult] = useState<{
    ok: boolean;
    message?: string;
  } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Load order from localStorage
  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem("lastOrder");
        if (stored) {
          setOrder(JSON.parse(stored));
        }
      } catch (err) {
        console.error("Failed to load order from localStorage", err);
      }
    }
  }, [isOpen]);

  // Focus trap for accessibility
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

  if (!isOpen) return null;

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  // Calculate estimated delivery time based on distance
  const getEstimatedDelivery = () => {
    if (!order?.deliveryFee) return "~15-30 minutes";
    // Rough estimate: base 10 min + 5 min per 100 blocks (approximated from fee)
    const segments = Math.max(1, (order.deliveryFee - 3) / 2);
    const minMinutes = Math.round(10 + segments * 3);
    const maxMinutes = Math.round(15 + segments * 5);
    return `~${minMinutes}-${maxMinutes} minutes`;
  };

  const copyOrderDetails = async () => {
    if (!order) return;
    const items = order.cartItems
      .map((i) => `• ${i.quantity}x ${i.product.name} (${i.shop.name})`)
      .join("\n");
    const coords = `${order.userLocation.x}, ${order.userLocation.y}, ${order.userLocation.z}`;
    const text = `Order Receipt
================
${items}

IGN: ${order.ign}
Discord: ${order.discord}
Delivery Coords: ${coords}

Subtotal: ${order.subtotal} 💎
Delivery Fee: ${order.deliveryFee} 💎
Total: ${order.total} 💎

Submitted: ${formatDate(order.submittedAt)}
${order.submissionId ? `Submission ID: ${order.submissionId}` : ""}
================`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleResend = async () => {
    if (!onResend) return;
    setIsResending(true);
    setResendResult(null);
    try {
      const result = await onResend();
      setResendResult(result);
    } catch (err) {
      setResendResult({ ok: false, message: "Failed to resend order." });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-black/75 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        <div
          ref={modalRef}
          className="inline-block align-bottom bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-gray-700"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2
                    id="confirmation-title"
                    className="text-xl font-bold text-white"
                  >
                    Order Confirmed! 🎉
                  </h2>
                  <p className="text-green-100 text-sm">
                    Your order has been received
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close confirmation"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {order ? (
            <div className="px-6 py-5 space-y-5">
              {/* Estimated Delivery */}
              <div
                className="bg-blue-900/30 border border-blue-700/50 rounded-xl p-4"
                aria-live="polite"
              >
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-blue-200 font-semibold">
                      Estimated Delivery Time
                    </div>
                    <div className="text-blue-100 text-lg font-bold">
                      {getEstimatedDelivery()}
                    </div>
                  </div>
                </div>
                <p className="text-blue-300/80 text-xs mt-2">
                  You'll receive a Discord DM when NilsTG is online to
                  coordinate delivery.
                </p>
              </div>

              {/* What happens next */}
              <div className="bg-gray-700/50 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4 text-purple-400" />
                  What happens next?
                </h3>
                <ol className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span>Discord DM within 30 minutes (when online)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Final price confirmation and scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Meet in-game at your delivery location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <span>Pay diamonds → Items delivered! ✨</span>
                  </li>
                </ol>
              </div>

              {/* Order Details */}
              <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                <h3 className="text-white font-semibold mb-3">Order Summary</h3>

                <div className="space-y-2 text-sm">
                  {order.cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-gray-300"
                    >
                      <span>
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="text-gray-400">
                        {item.product.price * item.quantity} 💎
                      </span>
                    </div>
                  ))}

                  <div className="border-t border-gray-700 pt-2 mt-2 space-y-1">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>{order.subtotal} 💎</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Delivery Fee</span>
                      <span>{order.deliveryFee} 💎</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total</span>
                      <span className="text-yellow-400">{order.total} 💎</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <User className="h-3 w-3" />
                    <span>IGN</span>
                  </div>
                  <div className="text-white font-medium">{order.ign}</div>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>Discord</span>
                  </div>
                  <div className="text-white font-medium">{order.discord}</div>
                </div>
                <div className="col-span-2 bg-gray-700/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <MapPin className="h-3 w-3" />
                    <span>Delivery Coordinates</span>
                  </div>
                  <div className="text-white font-medium font-mono">
                    {order.userLocation.x}, {order.userLocation.y},{" "}
                    {order.userLocation.z}
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="text-xs text-gray-500 space-y-1">
                <div>Submitted: {formatDate(order.submittedAt)}</div>
                {order.submissionId && (
                  <div>
                    Reference ID:{" "}
                    <span className="font-mono text-gray-400">
                      {order.submissionId}
                    </span>
                  </div>
                )}
              </div>

              {/* Resend Result */}
              {resendResult && (
                <div
                  className={`rounded-lg p-3 text-sm ${
                    resendResult.ok
                      ? "bg-green-900/30 border border-green-600/50 text-green-200"
                      : "bg-red-900/30 border border-red-600/50 text-red-200"
                  }`}
                  role="alert"
                  aria-live="assertive"
                >
                  {resendResult.message ||
                    (resendResult.ok
                      ? "Order resent successfully!"
                      : "Failed to resend order.")}
                </div>
              )}
            </div>
          ) : (
            <div className="px-6 py-10 text-center text-gray-400">
              <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No recent order found.</p>
              <p className="text-sm mt-1">
                Place an order to see your receipt here.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="bg-gray-700/50 px-6 py-4 flex flex-wrap gap-3 justify-end">
            <button
              onClick={copyOrderDetails}
              disabled={!order}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy Details"}
            </button>

            {onResend && (
              <button
                onClick={handleResend}
                disabled={!order || isResending}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isResending ? "animate-spin" : ""}`}
                />
                {isResending ? "Resending..." : "Resend Order"}
              </button>
            )}

            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
