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

// Minecraft Y limits: -64 to 320 (1.18+)
const MC_Y_MIN = -64;
const MC_Y_MAX = 320;

// Parse coordinates flexibly - handles various formats
const parseCoords = (
  input: string
): { x: number; y: number; z: number } | null => {
  // Remove extra spaces, handle various separators
  const cleaned = input.trim().replace(/\s+/g, " ");

  // Try to extract 3 numbers (supports "x, y, z" or "x y z" or "x,y,z")
  const numbers = cleaned.match(/-?\d+\.?\d*/g);
  if (!numbers || numbers.length < 3) return null;

  const x = Math.round(parseFloat(numbers[0]));
  const y = Math.round(parseFloat(numbers[1]));
  const z = Math.round(parseFloat(numbers[2]));

  if (isNaN(x) || isNaN(y) || isNaN(z)) return null;

  // Clamp Y to Minecraft limits
  const clampedY = Math.max(MC_Y_MIN, Math.min(MC_Y_MAX, y));

  return { x, y: clampedY, z };
};

// Format coords nicely
const formatCoords = (loc: { x: number; y: number; z: number }): string => {
  return `${loc.x}, ${loc.y}, ${loc.z}`;
};

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onConfirmOrder,
}) => {
  const [coords, setCoords] = useState("");
  const [coordsError, setCoordsError] = useState<string | null>(null);
  const [discord, setDiscord] = useState("");
  const [ign, setIgn] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Parse user coords with smart validation
  const userLocation = useMemo(() => {
    if (!coords.trim()) {
      return null;
    }

    const parsed = parseCoords(coords);
    if (!parsed) {
      return null;
    }

    return parsed;
  }, [coords]);

  // Update coordsError based on coords (separate from useMemo to avoid React warnings)
  useEffect(() => {
    if (!coords.trim()) {
      setCoordsError(null);
      return;
    }

    const parsed = parseCoords(coords);
    if (!parsed) {
      setCoordsError("Invalid format. Use: x, y, z (e.g., 100, 64, -200)");
      return;
    }

    // Check if Y was clamped (user entered invalid Y)
    const originalY = parseInt(coords.match(/-?\d+\.?\d*/g)?.[1] || "0");
    if (originalY < MC_Y_MIN || originalY > MC_Y_MAX) {
      setCoordsError(
        `Y adjusted to ${parsed.y} (Minecraft limit: ${MC_Y_MIN} to ${MC_Y_MAX})`
      );
    } else {
      setCoordsError(null);
    }
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

    // Flat delivery fee of 4 diamonds
    return 4;
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
          className="inline-block align-bottom bg-brand-surface rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-brand-border"
        >
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10 sm:mx-0 sm:h-10 sm:w-10">
                <Package className="h-6 w-6 text-brand-primary" />
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
                      className="block text-sm font-bold text-gray-200 mb-1.5"
                      htmlFor="ign-input"
                    >
                      Minecraft Username (IGN){" "}
                      <span className="text-red-400" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="ign-input"
                      type="text"
                      required
                      aria-required="true"
                      aria-describedby="ign-help"
                      className="w-full bg-brand-black border border-brand-border rounded-lg px-4 py-2.5 text-white text-base focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all placeholder:text-gray-500"
                      placeholder="Steve"
                      value={ign}
                      onChange={(e) => setIgn(e.target.value)}
                    />
                    <p id="ign-help" className="text-sm text-gray-400 mt-1.5">
                      Your in-game name for delivery
                    </p>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-bold text-gray-200 mb-1.5"
                      htmlFor="discord-input"
                    >
                      Discord Username{" "}
                      <span className="text-red-400" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="discord-input"
                      type="text"
                      required
                      aria-required="true"
                      aria-describedby="discord-help"
                      className="w-full bg-brand-black border border-brand-border rounded-lg px-4 py-2.5 text-white text-base focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all placeholder:text-gray-500"
                      placeholder="username or User#1234"
                      value={discord}
                      onChange={(e) => setDiscord(e.target.value)}
                    />
                    <p
                      id="discord-help"
                      className="text-sm text-gray-400 mt-1.5"
                    >
                      We'll DM you to coordinate delivery
                    </p>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-bold text-gray-200 mb-1.5"
                      htmlFor="coords-input"
                    >
                      Delivery Coordinates (x, y, z){" "}
                      <span className="text-red-400" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <input
                        id="coords-input"
                        type="text"
                        required
                        aria-required="true"
                        aria-invalid={
                          coords && !userLocation ? "true" : "false"
                        }
                        aria-describedby="coords-error coords-help"
                        className={`w-full bg-brand-black border rounded-lg pl-10 pr-4 py-2.5 text-white text-base focus:ring-2 outline-none transition-all placeholder:text-gray-500 ${
                          coords && !userLocation
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : coordsError
                            ? "border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500"
                            : "border-brand-border focus:ring-brand-primary focus:border-brand-primary"
                        }`}
                        placeholder="100, 64, -200"
                        value={coords}
                        onChange={(e) => setCoords(e.target.value)}
                        onBlur={() => {
                          // Auto-format coords on blur if valid
                          if (userLocation) {
                            setCoords(formatCoords(userLocation));
                          }
                        }}
                      />
                    </div>
                    {coords && !userLocation ? (
                      <p
                        id="coords-error"
                        className="text-red-400 text-sm mt-1.5 flex items-center gap-1"
                        role="alert"
                      >
                        <span aria-hidden="true">✗</span> Invalid format. Use:
                        x, y, z (e.g., 100, 64, -200)
                      </p>
                    ) : coordsError ? (
                      <p
                        id="coords-error"
                        className="text-yellow-400 text-sm mt-1.5"
                        role="alert"
                      >
                        ⚠️ {coordsError}
                      </p>
                    ) : userLocation ? (
                      <p
                        id="coords-help"
                        className="text-brand-success text-sm mt-1.5 flex items-center gap-1"
                      >
                        <span aria-hidden="true">✓</span> Coordinates valid:{" "}
                        {formatCoords(userLocation)}
                      </p>
                    ) : (
                      <p
                        id="coords-help"
                        className="text-sm text-gray-400 mt-1.5"
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
                        ? "bg-brand-success/10 border-brand-success/20 text-brand-success"
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
                <div className="mt-6 bg-brand-black rounded-xl p-4 border border-brand-border">
                  <h4 className="font-bold text-gray-300 mb-3 flex items-center gap-2">
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

                    <div className="border-t border-brand-border pt-2 mt-2 flex justify-between items-center">
                      <span className="font-bold text-white">Total</span>
                      <span className="font-bold text-xl text-yellow-400">
                        {deliveryFee ? total : "--"} 💎
                      </span>
                    </div>
                  </div>
                </div>

                {deliveryFee && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-2 text-xs text-brand-primary bg-brand-primary/10 p-3 rounded-lg border border-brand-primary/20">
                      <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">
                          Estimated delivery: {estimatedDeliveryTime}
                        </p>
                        <p className="text-brand-primary/80 mt-1">
                          You'll receive a Discord DM when I'm online to
                          coordinate.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-gray-400 bg-brand-black p-3 rounded-lg border border-brand-border">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-brand-success" />
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
          <div className="bg-brand-black/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-brand-border">
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
              className="w-full inline-flex justify-center items-center gap-2 rounded-lg border border-transparent shadow-sm px-4 py-2 bg-brand-primary text-base font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
              className="mt-3 w-full inline-flex justify-center rounded-lg border border-brand-border shadow-sm px-4 py-2 bg-transparent text-base font-bold text-gray-300 hover:text-white hover:bg-brand-border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-border sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all"
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
