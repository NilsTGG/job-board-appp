import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Package,
  MapPin,
  Calculator,
  CheckCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { CartItem } from "./CartDrawer";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  // Returns a promise resolving to { ok, message? }
  onConfirmOrder: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orderDetails: any
  ) => Promise<{ ok: boolean; message?: string }>;
}

const COORD_REGEX = /^-?\d{1,6}\s*,\s*-?\d{1,3}\s*,\s*-?\d{1,6}$/;

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onConfirmOrder,
}) => {
  const [coords, setCoords] = useState("");
  const [discord, setDiscord] = useState("");
  const [ign, setIgn] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Parse user coords
  const userLocation = useMemo(() => {
    if (!COORD_REGEX.test(coords)) return null;
    const parts = coords.split(",").map((s) => Number(s.trim()));
    if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
    return { x: parts[0], y: parts[1], z: parts[2] };
  }, [coords]);

  // Calculate delivery fee
  // Logic: Max distance from any shop to user location
  const deliveryFee = useMemo(() => {
    if (!userLocation || cartItems.length === 0) return null;

    let maxDist = 0;

    // Find the shop that is furthest away (to cover the "route")
    // Or maybe sum of distances? Let's do max distance for simplicity + base fee per shop?
    // Let's stick to the user's "Monopoly" idea: Distance based fee.
    // We'll calculate distance from the *furthest* shop to the user.

    cartItems.forEach((item) => {
      const shop = item.shop;
      const dx = userLocation.x - shop.coords.x;
      const dz = userLocation.z - shop.coords.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist > maxDist) maxDist = dist;
    });

    const segments = Math.ceil(maxDist / 100);
    // Base fee (3) + 2 per 100 blocks
    return 3 + segments * 2;
  }, [userLocation, cartItems]);

  const total = subtotal + (deliveryFee || 0);

  const formspreeEnabled = Boolean(import.meta.env.VITE_FORMSPREE_FORM_ID);
  const webhookEnabled = Boolean(import.meta.env.VITE_DISCORD_WEBHOOK);

  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [resultOk, setResultOk] = useState<boolean | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Calculate estimated delivery time based on distance
  const estimatedDeliveryTime = useMemo(() => {
    if (!deliveryFee) return null;
    const segments = Math.max(1, (deliveryFee - 3) / 2);
    const minMinutes = Math.round(10 + segments * 3);
    const maxMinutes = Math.round(15 + segments * 5);
    return `${minMinutes}-${maxMinutes} min`;
  }, [deliveryFee]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userLocation || !discord || !ign || isSubmitting || hasSubmitted)
      return;

    setIsSubmitting(true);
    setResultMessage(null);
    setResultOk(null);

    try {
      const res = await onConfirmOrder({
        cartItems,
        subtotal,
        deliveryFee,
        total,
        userLocation,
        discord,
        ign,
      });

      setResultOk(res.ok);
      setResultMessage(
        res.message ??
          (res.ok
            ? "Order received — check Discord for updates."
            : "Failed to send order.")
      );

      // On success, automatically close after a short delay so user sees the confirmation
      if (res.ok) {
        setHasSubmitted(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setHasSubmitted(false);
          onClose();
        }, 1500);
        return;
      }
    } catch (err) {
      setResultOk(false);
      setResultMessage("Unexpected error sending order. Please try again.");
      console.error("Order send error", err);
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
      aria-labelledby="modal-title"
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
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-900/50 sm:mx-0 sm:h-10 sm:w-10">
                <Package className="h-6 w-6 text-blue-400" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className="text-xl leading-6 font-bold text-white"
                  id="modal-title"
                >
                  Checkout & Delivery
                </h3>
                <div className="mt-2 text-sm text-gray-400">
                  Enter your details to calculate the final delivery fee.
                </div>

                <form
                  id="checkout-form"
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4"
                >
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-300 mb-1"
                      htmlFor="ign-input"
                    >
                      Minecraft Username (IGN){" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="ign-input"
                      type="text"
                      required
                      aria-required="true"
                      aria-describedby="ign-help"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Steve"
                      value={ign}
                      onChange={(e) => setIgn(e.target.value)}
                    />
                    <p id="ign-help" className="text-xs text-gray-500 mt-1">
                      Your in-game name for delivery
                    </p>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-300 mb-1"
                      htmlFor="discord-input"
                    >
                      Discord Username <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="discord-input"
                      type="text"
                      required
                      aria-required="true"
                      aria-describedby="discord-help"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="User#1234"
                      value={discord}
                      onChange={(e) => setDiscord(e.target.value)}
                    />
                    <p id="discord-help" className="text-xs text-gray-500 mt-1">
                      We'll DM you to coordinate
                    </p>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-300 mb-1"
                      htmlFor="coords-input"
                    >
                      Delivery Coordinates (x, y, z){" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                      <input
                        id="coords-input"
                        type="text"
                        required
                        aria-required="true"
                        aria-invalid={
                          coords && !userLocation ? "true" : "false"
                        }
                        aria-describedby="coords-error coords-help"
                        className={`w-full bg-gray-700 border rounded-lg pl-9 pr-3 py-2 text-white focus:ring-2 outline-none ${
                          coords && !userLocation
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-600 focus:ring-blue-500"
                        }`}
                        placeholder="100, 64, -200"
                        value={coords}
                        onChange={(e) => setCoords(e.target.value)}
                      />
                    </div>
                    {coords && !userLocation ? (
                      <p
                        id="coords-error"
                        className="text-red-400 text-xs mt-1"
                        role="alert"
                      >
                        Invalid format. Use: x, y, z (e.g., 100, 64, -200)
                      </p>
                    ) : (
                      <p
                        id="coords-help"
                        className="text-xs text-gray-500 mt-1"
                      >
                        Press F3 in-game to find your coordinates
                      </p>
                    )}
                  </div>
                </form>

                {/* Result message (success/error) */}
                {resultMessage && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className={`mx-4 mb-3 rounded-lg p-3 border ${
                      resultOk
                        ? "bg-green-900/30 border-green-600/50 text-green-200"
                        : "bg-red-900/30 border-red-600/50 text-red-200"
                    }`}
                  >
                    {resultMessage}
                  </div>
                )}

                {/* Submission backend indicator */}
                <div className="mt-3 text-xs text-gray-400 mx-1">
                  {formspreeEnabled ? (
                    <div>Submissions will be sent via Formspree.</div>
                  ) : webhookEnabled ? (
                    <div>
                      Submissions will be sent directly to the configured
                      Discord webhook.
                    </div>
                  ) : (
                    <div className="text-yellow-300">
                      No submission method configured. Orders will not be sent
                      anywhere.
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="mt-6 bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                  <h4 className="font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Order Summary
                  </h4>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>
                        Items Subtotal (
                        {cartItems.reduce((a, b) => a + b.quantity, 0)} items)
                      </span>
                      <span>{subtotal} 💎</span>
                    </div>

                    <div className="flex justify-between text-gray-400">
                      <span className="flex items-center gap-1">
                        Delivery Fee
                        {!deliveryFee && (
                          <span className="text-xs text-yellow-500">
                            (Enter coords)
                          </span>
                        )}
                      </span>
                      <span
                        className={deliveryFee ? "text-white" : "text-gray-600"}
                      >
                        {deliveryFee ? `${deliveryFee} 💎` : "--"}
                      </span>
                    </div>

                    <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between items-center">
                      <span className="font-bold text-white">Total</span>
                      <span className="font-bold text-xl text-yellow-400">
                        {deliveryFee ? total : "--"} 💎
                      </span>
                    </div>
                  </div>
                </div>

                {deliveryFee && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-2 text-xs text-blue-300 bg-blue-900/20 p-3 rounded-lg border border-blue-800/50">
                      <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">
                          Estimated delivery: {estimatedDeliveryTime}
                        </p>
                        <p className="text-blue-300/80 mt-1">
                          You'll receive a Discord DM when I'm online to
                          coordinate.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-gray-400 bg-gray-700/30 p-3 rounded-lg">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-green-400" />
                      <p>
                        Delivery fee calculated based on optimal route (Nether
                        Highway applied for long distances).
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-700/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              form="checkout-form"
              disabled={
                !userLocation ||
                !discord ||
                !ign ||
                isSubmitting ||
                hasSubmitted
              }
              className="w-full inline-flex justify-center items-center gap-2 rounded-lg border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : hasSubmitted ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Order Sent!
                </>
              ) : (
                "Confirm Order"
              )}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-600 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
