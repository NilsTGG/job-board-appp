import { useState, useMemo } from "react";
import { Package, MapPin, MessageCircle, Clock } from "./icons";
import ServiceSelector, { ServiceType } from "./components/ServiceSelector";
import EstimatorPanel, { EstimateResult } from "./components/EstimatorPanel";
import PricingMatrix from "./components/PricingMatrix";
import TrustSection from "./components/TrustSection";
import FAQ from "./components/FAQ";
import PaymentPolicyCard from "./components/PaymentPolicyCard";
import ServiceCardsExpanded from "./components/ServiceCardsExpanded";
import { useForm, ValidationError } from "@formspree/react";
import Footer from "./components/Footer";

// Extended pricing configuration (approximate, illustrative only)
const PRICING = {
  base: 3,
  per100: 2,
  villagerBase: 3,
  villagerExtra: 1,
  timeBlockPer10: 1,
  recovery: { overworld: 5, nether: 7, end: 8 },
  urgencyMultiplier: {
    whenever: 0.8,
    soon: 1,
    urgent: 1.5,
    emergency: 2,
  } as Record<string, number>,
  dimensionMultiplier: { overworld: 1, nether: 1.5, end: 1.5 },
  hazardAdd: 1.25, // +25%
};

const COORD_REGEX = /^-?\d{1,6}\s*,\s*-?\d{1,3}\s*,\s*-?\d{1,6}$/; // x, y, z basic check

function App() {
  const [state, handleSubmit] = useForm("xqabvypp");

  // In‑game signage ideas (not rendered):
  // 1. Barrel labeled: "Deposit Problems" (book & quill inside for orders)
  // 2. Sign stack:
  //    [Line1] Because You Won't™
  //    [Line2] Delivery & Villager Rescue
  //    [Line3] Drop book in barrel
  //    [Line4] Diamonds In → Stuff Out
  // 3. Lectern with template order book: pages for: Discord / What / From / To / Urgency

  // Minimal local state for estimation & inline validation (still submits via Formspree)
  const [serviceType, setServiceType] = useState<ServiceType>("delivery");
  const [pickupCoords, setPickupCoords] = useState("");
  const [dropoffCoords, setDropoffCoords] = useState("");
  const [urgency, setUrgency] = useState("soon");
  const [paymentOffer, setPaymentOffer] = useState("");
  const [showCoordHelp, setShowCoordHelp] = useState(false);
  const [dimension, setDimension] = useState("overworld");
  const [hazardous, setHazardous] = useState(false);
  const [villagers, setVillagers] = useState("1");
  const [taskDesc, setTaskDesc] = useState("");
  const [timeBlockMinutes, setTimeBlockMinutes] = useState("20");
  const [recoveryCoords, setRecoveryCoords] = useState("");

  const coordError = useMemo(() => {
    if (!pickupCoords && !dropoffCoords) return "";
    if (pickupCoords && !COORD_REGEX.test(pickupCoords))
      return "Pickup coords format: x, y, z";
    if (dropoffCoords && !COORD_REGEX.test(dropoffCoords))
      return "Delivery coords format: x, y, z";
    return "";
  }, [pickupCoords, dropoffCoords]);

  function parseCoordTriple(str: string): [number, number, number] | null {
    if (!COORD_REGEX.test(str)) return null;
    const parts = str.split(",").map((s) => Number(s.trim()));
    if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
    return parts as [number, number, number];
  }

  const distanceInfo = useMemo(() => {
    const a = parseCoordTriple(pickupCoords);
    const b = parseCoordTriple(dropoffCoords);
    if (!a || !b) return null;
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const dz = b[2] - a[2];
    const flatDist = Math.sqrt(dx * dx + dz * dz);
    const segments = Math.ceil(flatDist / 100);
    return {
      flatDist: Math.round(flatDist),
      verticalDelta: Math.abs(dy),
      segments,
    };
  }, [pickupCoords, dropoffCoords]);

  const estimate: EstimateResult = useMemo(() => {
    const urgencyMult = PRICING.urgencyMultiplier[urgency] ?? 1;
    const dimMult = (PRICING.dimensionMultiplier as any)[dimension] ?? 1;
    const hazardMult = hazardous ? PRICING.hazardAdd : 1;
    const breakdown: string[] = [];
    let total: number | null = null;

    switch (serviceType) {
      case "delivery": {
        if (!distanceInfo) break;
        const base = PRICING.base + distanceInfo.segments * PRICING.per100;
        total = Math.round(base * urgencyMult * dimMult * hazardMult);
        breakdown.push(
          `Distance segments: ${distanceInfo.segments} (≈${distanceInfo.flatDist} blocks)`,
          `Base calc: ${PRICING.base} + ${distanceInfo.segments}×${PRICING.per100}`,
          `Urgency ×${urgencyMult} • Dim ×${dimMult}${
            hazardous ? ` • Hazard ×${hazardMult}` : ""
          }`
        );
        break;
      }
      case "villager": {
        if (!distanceInfo) break;
        const vill = Math.max(1, Number(villagers) || 1);
        const base =
          PRICING.base +
          distanceInfo.segments * PRICING.per100 +
          PRICING.villagerBase +
          (vill - 1) * PRICING.villagerExtra;
        total = Math.round(base * urgencyMult * dimMult * hazardMult);
        breakdown.push(
          `${vill} villager(s): base ${PRICING.villagerBase} + ${
            (vill - 1) * PRICING.villagerExtra
          }`,
          `Distance segments ${distanceInfo.segments}`,
          `Modifiers urgency ×${urgencyMult} dim ×${dimMult}${
            hazardous ? ` hazard ×${hazardMult}` : ""
          }`
        );
        break;
      }
      case "task": {
        const minutes = Number(timeBlockMinutes) || 20;
        const units = Math.ceil(minutes / 10);
        total = Math.round(
          units * PRICING.timeBlockPer10 * urgencyMult * hazardMult
        );
        breakdown.push(
          `${minutes} min (${units}×10m units)`,
          `Base per 10m: ${PRICING.timeBlockPer10}`,
          `Urgency ×${urgencyMult}${hazardous ? ` hazard ×${hazardMult}` : ""}`
        );
        break;
      }
      case "recovery": {
        const base =
          (PRICING.recovery as any)[dimension] || PRICING.recovery.overworld;
        total = Math.round(base * urgencyMult);
        breakdown.push(`Base ${dimension}: ${base}`, `Urgency ×${urgencyMult}`);
        break;
      }
      case "timeblock": {
        const minutes = Number(timeBlockMinutes) || 20;
        const units = Math.ceil(minutes / 10);
        total = Math.round(units * PRICING.timeBlockPer10 * urgencyMult);
        breakdown.push(
          `${minutes} min (${units}×10m units)`,
          `Urgency ×${urgencyMult}`
        );
        break;
      }
    }

    return { diamonds: total, breakdown };
  }, [
    serviceType,
    urgency,
    dimension,
    hazardous,
    villagers,
    timeBlockMinutes,
    distanceInfo,
  ]);

  const offerNumber = useMemo(() => {
    const n = Number(paymentOffer.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [paymentOffer]);

  const successBanner = state.succeeded && (
    <div
      className="mb-6 rounded-lg border border-green-600 bg-green-800/40 p-4 text-green-200"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 font-semibold">
        <Package className="h-5 w-5" /> Job submitted! I'll DM you on Discord
        when I'm online.
      </div>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-2 text-xs underline hover:text-white"
      >
        Submit another (reset)
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Package className="h-10 w-10 text-blue-400" />
            <h1 className="text-3xl font-extrabold tracking-tight">
              Because You Won't™
            </h1>
          </div>
          <p className="text-2xl font-semibold text-white leading-tight">
            I move stuff & rescue villagers.
          </p>
          <p className="text-gray-300 mt-2 text-sm">
            Core lane: Delivery & Villager Recovery. Odd jobs are bonus.
          </p>
          <p className="mt-3 text-amber-300 text-sm font-medium">
            Diamonds in → Problem gone.{" "}
            <span className="text-gray-400">
              (Ping on Discord if I'm online)
            </span>
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <a
              href="#submit-job"
              className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-sm font-semibold"
            >
              Order Now
            </a>
            <a
              href="#services"
              className="px-5 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-sm font-semibold"
            >
              What I Do
            </a>
          </div>
          <p className="text-gray-500 mt-4 text-xs uppercase tracking-wide">
            Diamonds only • No bulk farming • Clear quotes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2" id="submit-job">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              {successBanner}
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-blue-400" />
                Submit Request
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot field */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <input type="hidden" name="serviceType" value={serviceType} />
                <ServiceSelector
                  value={serviceType}
                  onChange={setServiceType}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="discordUsername"
                      className="block text-white font-medium mb-2"
                    >
                      Discord Username
                    </label>
                    <input
                      type="text"
                      name="discordUsername"
                      id="discordUsername"
                      placeholder="yourname"
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ign"
                      className="block text-white font-medium mb-2"
                    >
                      Minecraft Username
                    </label>
                    <input
                      type="text"
                      name="ign"
                      id="ign"
                      placeholder="YourMinecraftName"
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Conditional service-specific fields */}
                {serviceType === "delivery" && (
                  <div>
                    <label
                      htmlFor="itemDescription"
                      className="block text-white font-medium mb-2"
                    >
                      What needs delivered?
                    </label>
                    <textarea
                      name="itemDescription"
                      id="itemDescription"
                      placeholder="e.g., 64 oak logs, diamond pickaxe, etc."
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                )}
                {serviceType === "villager" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-white font-medium mb-2"
                        htmlFor="villagers"
                      >
                        Number of Villagers
                      </label>
                      <input
                        id="villagers"
                        name="villagers"
                        type="number"
                        min={1}
                        value={villagers}
                        onChange={(e) => setVillagers(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-white font-medium mb-2"
                        htmlFor="villagerNotes"
                      >
                        Notes
                      </label>
                      <input
                        id="villagerNotes"
                        name="villagerNotes"
                        placeholder="Boats supplied? Portal?"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
                {serviceType === "task" && (
                  <div>
                    <label
                      htmlFor="taskDesc"
                      className="block text-white font-medium mb-2"
                    >
                      Describe the annoying task
                    </label>
                    <textarea
                      id="taskDesc"
                      name="taskDesc"
                      value={taskDesc}
                      onChange={(e) => setTaskDesc(e.target.value)}
                      rows={3}
                      placeholder="Sort 8 double chests & label / setup beacon & clear area, etc"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      required
                    />
                  </div>
                )}
                {serviceType === "recovery" && (
                  <div>
                    <label
                      htmlFor="recoveryCoords"
                      className="block text-white font-medium mb-2"
                    >
                      Death / Rescue Coordinates
                    </label>
                    <input
                      id="recoveryCoords"
                      name="recoveryCoords"
                      value={recoveryCoords}
                      onChange={(e) => setRecoveryCoords(e.target.value)}
                      placeholder="123, 64, -456"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}
                {serviceType === "timeblock" && (
                  <div>
                    <label
                      htmlFor="timeBlockMinutes"
                      className="block text-white font-medium mb-2"
                    >
                      Minutes
                    </label>
                    <select
                      id="timeBlockMinutes"
                      name="timeBlockMinutes"
                      value={timeBlockMinutes}
                      onChange={(e) => setTimeBlockMinutes(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="20">20 (minimum)</option>
                      <option value="40">40</option>
                      <option value="60">60</option>
                      <option value="90">90</option>
                    </select>
                  </div>
                )}

                {(serviceType === "delivery" || serviceType === "villager") && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="pickupCoords"
                        className="block text-white font-medium mb-2"
                      >
                        Pickup Location
                      </label>
                      <input
                        type="text"
                        name="pickupCoords"
                        id="pickupCoords"
                        placeholder="100, 64, -200"
                        required
                        value={pickupCoords}
                        onChange={(e) => setPickupCoords(e.target.value)}
                        className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          pickupCoords && !COORD_REGEX.test(pickupCoords)
                            ? "border-red-500"
                            : "border-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dropoffCoords"
                        className="block text-white font-medium mb-2"
                      >
                        Delivery Location
                      </label>
                      <input
                        type="text"
                        name="dropoffCoords"
                        id="dropoffCoords"
                        placeholder="300, 64, 150"
                        required
                        value={dropoffCoords}
                        onChange={(e) => setDropoffCoords(e.target.value)}
                        className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          dropoffCoords && !COORD_REGEX.test(dropoffCoords)
                            ? "border-red-500"
                            : "border-gray-600"
                        }`}
                      />
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500 -mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCoordHelp((v) => !v)}
                    className="underline hover:text-gray-300"
                  >
                    {showCoordHelp ? "Hide coord help" : "How to format coords"}
                  </button>
                  {coordError && (
                    <span className="text-red-400">{coordError}</span>
                  )}
                </div>
                {showCoordHelp && (
                  <div className="text-xs text-gray-400 bg-gray-800/60 border border-gray-700 rounded p-2">
                    Overworld by default unless dimension changed. Format: x, y,
                    z (commas). Horizontal distance used for delivery & villager
                    pricing.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="dimension"
                      className="block text-white font-medium mb-2"
                    >
                      Dimension
                    </label>
                    <select
                      id="dimension"
                      name="dimension"
                      value={dimension}
                      onChange={(e) => setDimension(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="overworld">Overworld</option>
                      <option value="nether">Nether</option>
                      <option value="end">End</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="hazardous"
                      className="block text-white font-medium mb-2"
                    >
                      Hazardous?
                    </label>
                    <div className="flex items-center h-full mt-1">
                      <input
                        id="hazardous"
                        name="hazardous"
                        type="checkbox"
                        checked={hazardous}
                        onChange={(e) => setHazardous(e.target.checked)}
                        className="h-5 w-5 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="hazardous"
                        className="ml-2 text-sm text-gray-300"
                      >
                        Dangerous biome / mobs / terrain
                      </label>
                    </div>
                  </div>
                  {(serviceType === "task" || serviceType === "timeblock") && (
                    <div>
                      <label
                        htmlFor="timeBlockMinutes2"
                        className="block text-white font-medium mb-2"
                      >
                        Time Block (override)
                      </label>
                      <select
                        id="timeBlockMinutes2"
                        value={timeBlockMinutes}
                        onChange={(e) => setTimeBlockMinutes(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="60">60</option>
                        <option value="90">90</option>
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="paymentOffer"
                    className="block text-white font-medium mb-2"
                  >
                    Payment Offer
                  </label>
                  <input
                    type="text"
                    name="paymentOffer"
                    id="paymentOffer"
                    placeholder="5 diamonds"
                    required
                    value={paymentOffer}
                    onChange={(e) => setPaymentOffer(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {offerNumber && offerNumber > 64 && (
                    <p className="mt-1 text-xs text-gray-400">
                      ≈ {Math.floor(offerNumber / 64)} stacks +{" "}
                      {offerNumber % 64} diamonds
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="urgency"
                    className="block text-white font-medium mb-2"
                  >
                    Urgency
                  </label>
                  <select
                    name="urgency"
                    id="urgency"
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="whenever">Whenever (20% discount)</option>
                    <option value="soon">Soon-ish (standard rate)</option>
                    <option value="urgent">ASAP (+50% fee)</option>
                    <option value="emergency">Emergency (+100% fee)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-white font-medium mb-2"
                  >
                    Notes (optional)
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    placeholder="Any special instructions..."
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {serviceType === "delivery" && distanceInfo && !coordError && (
                  <div className="text-xs text-gray-400 -mt-2">
                    Distance preview: {distanceInfo.flatDist} blocks (segments{" "}
                    {distanceInfo.segments})
                  </div>
                )}

                <EstimatorPanel estimate={estimate} serviceType={serviceType} />

                <button
                  type="submit"
                  disabled={
                    state.submitting ||
                    !!coordError ||
                    (serviceType === "delivery" && !distanceInfo)
                  }
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? "Submitting..." : "Submit Job"}
                </button>

                <ValidationError
                  prefix="Job"
                  field="discordUsername"
                  errors={state.errors}
                />
                <ValidationError
                  prefix="Job"
                  field="ign"
                  errors={state.errors}
                />
                <ValidationError
                  prefix="Job"
                  field="itemDescription"
                  errors={state.errors}
                />
                <ValidationError
                  prefix="Job"
                  field="pickupCoords"
                  errors={state.errors}
                />
                <ValidationError
                  prefix="Job"
                  field="dropoffCoords"
                  errors={state.errors}
                />
                <ValidationError
                  prefix="Job"
                  field="paymentOffer"
                  errors={state.errors}
                />
              </form>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <PricingMatrix />
            <PaymentPolicyCard />

            {/* How It Works */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-400" />
                How It Works
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                    1
                  </span>
                  <span>Submit your delivery request</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                    2
                  </span>
                  <span>I'll contact you on Discord</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                    3
                  </span>
                  <span>Meet at pickup location</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                    4
                  </span>
                  <span>Pay diamonds, I deliver</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-400" />
                Contact
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div>
                  <strong>Discord:</strong> NilsTG
                </div>
                <div>
                  <strong>Response time:</strong> When I'm online
                </div>
                <div>
                  <strong>Payment:</strong> Diamonds only
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ServiceCardsExpanded />
      <TrustSection />
      <FAQ />

      {/* Broke People Menu */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-3 rounded-lg">
            <span className="text-2xl">🪙</span>
            <h2 className="text-xl font-bold text-white">Broke People Menu™</h2>
          </div>
          <p className="text-gray-400 mt-4 italic">
            "Because even cheapskates deserve service. Just not fast service."{" "}
            <span className="text-xs block mt-1 text-gray-500">
              Humor aside, services still delivered with care.
            </span>
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-3">
            <h3 className="text-white font-bold">Budget Services</h3>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <div>
                <div className="text-white font-medium">
                  Basic Delivery (within 300 blocks)
                </div>
                <div className="text-gray-400 text-sm">
                  Includes sarcasm at no extra cost
                </div>
              </div>
              <div className="text-yellow-400 font-bold">3 diamonds</div>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <div>
                <div className="text-white font-medium">
                  Multi-Shop Delivery
                </div>
                <div className="text-gray-400 text-sm">
                  Because you couldn't walk to two places
                </div>
              </div>
              <div className="text-yellow-400 font-bold">5 diamonds</div>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <div>
                <div className="text-white font-medium">
                  Item Relocation (within your base)
                </div>
                <div className="text-gray-400 text-sm">
                  Literally carrying something 10 blocks
                </div>
              </div>
              <div className="text-yellow-400 font-bold">2 diamonds</div>
            </div>

            <div className="flex justify-between items-center py-2">
              <div>
                <div className="text-white font-medium">
                  Low Priority Queue Slot
                </div>
                <div className="text-gray-400 text-sm">
                  I'll get to it. Eventually. Maybe.
                </div>
              </div>
              <div className="text-yellow-400 font-bold">1 diamond</div>
            </div>
          </div>

          <div className="bg-yellow-900/20 border-t border-yellow-700/30 px-6 py-4">
            <div className="text-yellow-400 text-sm font-medium mb-2">
              ⚠️ Broke People Menu™ Terms:
            </div>
            <ul className="text-yellow-200 text-xs space-y-1">
              <li>• "Budget" doesn't mean "fast" or "with a smile"</li>
              <li>• Payment due upfront. No credit for broke people.</li>
              <li>• Attitude adjustment not included in any package</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
