import { useState, useMemo, useEffect } from "react";
import { Package, MapPin, MessageCircle, Clock, Sparkles, Zap } from "./icons";
import EnhancedServiceSelector, { ServiceType } from "./components/EnhancedServiceSelector";
import EnhancedEstimatorPanel, { EstimateResult } from "./components/EnhancedEstimatorPanel";
import PricingMatrix from "./components/PricingMatrix";
import EnhancedTrustSection from "./components/EnhancedTrustSection";
import EnhancedFAQ from "./components/EnhancedFAQ";
import PaymentPolicyCard from "./components/PaymentPolicyCard";
import EnhancedServiceCards from "./components/EnhancedServiceCards";
import ProcessVisualization from "./components/ProcessVisualization";
import LoadingSpinner from "./components/LoadingSpinner";
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
  
  // Enhanced state management
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
  
  // New enhanced state
  const [isCalculating, setIsCalculating] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    if (formTouched) {
      const draftData = {
        serviceType, pickupCoords, dropoffCoords, urgency, paymentOffer,
        dimension, hazardous, villagers, taskDesc, timeBlockMinutes, recoveryCoords
      };
      localStorage.setItem('serviceDraft', JSON.stringify(draftData));
    }
  }, [serviceType, pickupCoords, dropoffCoords, urgency, paymentOffer, dimension, hazardous, villagers, taskDesc, timeBlockMinutes, recoveryCoords, formTouched]);

  // Load draft on component mount
  useEffect(() => {
    const draft = localStorage.getItem('serviceDraft');
    if (draft) {
      try {
        const data = JSON.parse(draft);
        setServiceType(data.serviceType || "delivery");
        setPickupCoords(data.pickupCoords || "");
        setDropoffCoords(data.dropoffCoords || "");
        setUrgency(data.urgency || "soon");
        setPaymentOffer(data.paymentOffer || "");
        setDimension(data.dimension || "overworld");
        setHazardous(data.hazardous || false);
        setVillagers(data.villagers || "1");
        setTaskDesc(data.taskDesc || "");
        setTimeBlockMinutes(data.timeBlockMinutes || "20");
        setRecoveryCoords(data.recoveryCoords || "");
      } catch (e) {
        // Invalid draft, ignore
      }
    }
  }, []);

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

  // Enhanced estimate calculation with loading simulation
  const estimate: EstimateResult = useMemo(() => {
    // Simulate calculation delay for better UX
    if (formTouched && (pickupCoords || dropoffCoords || taskDesc || recoveryCoords)) {
      setIsCalculating(true);
      const timer = setTimeout(() => setIsCalculating(false), 800);
      return { diamonds: null, breakdown: [] };
    }

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
    formTouched,
    pickupCoords,
    dropoffCoords,
    taskDesc,
    recoveryCoords
  ]);

  const offerNumber = useMemo(() => {
    const n = Number(paymentOffer.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [paymentOffer]);

  // Enhanced form submission with animation
  const handleEnhancedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessAnimation(true);
    
    try {
      await handleSubmit(e);
      // Clear draft on successful submission
      localStorage.removeItem('serviceDraft');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const successBanner = state.succeeded && (
    <div
      className="mb-6 rounded-lg border border-green-600 bg-green-800/40 p-6 text-green-200 animate-slideIn"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 font-semibold text-lg mb-2">
        <div className="p-2 bg-green-600 rounded-full">
          <Package className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="text-white">Job Submitted Successfully! 🎉</div>
          <div className="text-sm font-normal text-green-300">
            I'll contact you on Discord when I'm online to confirm details.
          </div>
        </div>
      </div>
      
      <div className="bg-green-900/30 rounded-lg p-3 mt-4">
        <div className="text-sm font-medium mb-1">What happens next:</div>
        <ul className="text-sm space-y-1">
          <li>• Discord DM within 30 minutes (when online)</li>
          <li>• Final price confirmation and scheduling</li>
          <li>• Meet in-game at agreed time and location</li>
        </ul>
      </div>
      
      <button
        type="button"
        onClick={() => {
          window.location.reload();
          localStorage.removeItem('serviceDraft');
        }}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
      >
        Submit Another Job
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            {/* Main Title */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="relative">
                <Package className="h-16 w-16 text-blue-400 animate-bounce" />
                <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2 animate-ping" />
              </div>
              <div>
                <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  Because You Won't™
                </h1>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-yellow-400 font-medium">Professional Minecraft Services</span>
                  <Zap className="h-4 w-4 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Enhanced Subtitle */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-white leading-tight mb-2">
                I move stuff & rescue villagers.
              </p>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Professional delivery service for all your Minecraft logistics needs. 
                <span className="text-blue-400 font-medium"> Diamonds in → Problem gone.</span>
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2 text-green-400 bg-green-900/20 px-3 py-2 rounded-full">
                  <Package className="h-4 w-4" />
                  <span>2,547+ Deliveries</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400 bg-blue-900/20 px-3 py-2 rounded-full">
                  <Clock className="h-4 w-4" />
                  <span>99.1% Success Rate</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400 bg-purple-900/20 px-3 py-2 rounded-full">
                  <MessageCircle className="h-4 w-4" />
                  <span>Zero Loss Guarantee</span>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="#submit-job"
                className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 flex items-center gap-3"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('submit-job')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Package className="h-5 w-5 group-hover:animate-bounce" />
                Order Now
                <div className="bg-white/20 px-2 py-1 rounded text-xs">Popular</div>
              </a>
              
              <a
                href="#services"
                className="group bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-3"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <MapPin className="h-5 w-5 group-hover:text-blue-400" />
                View Services
              </a>
            </div>

            {/* Enhanced Key Points */}
            <div className="text-center">
              <div className="inline-flex items-center gap-6 text-xs uppercase tracking-wide text-gray-400 bg-gray-800/50 px-6 py-3 rounded-full border border-gray-700">
                <span>💎 Diamonds Only</span>
                <span>•</span>
                <span>📦 No Bulk Farming</span>
                <span>•</span>
                <span>📋 Clear Quotes</span>
              </div>
              <p className="text-gray-500 mt-4 text-sm">
                Professional service with transparent pricing • Discord: <span className="text-blue-400">NilsTG</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Main Form */}
          <div className="lg:col-span-2" id="submit-job">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-2xl">
              {successBanner}
              
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Submit Service Request</h2>
                  <p className="text-gray-400 text-sm">Fill out the details and get an instant price estimate</p>
                </div>
              </div>

              <form onSubmit={handleEnhancedSubmit} className="space-y-6" noValidate>
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
                
                <EnhancedServiceSelector
                  value={serviceType}
                  onChange={(type) => {
                    setServiceType(type);
                    setFormTouched(true);
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="discordUsername" className="block text-white font-medium mb-2">
                      Discord Username *
                    </label>
                    <input
                      type="text"
                      name="discordUsername"
                      id="discordUsername"
                      placeholder="yourname"
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      onChange={() => setFormTouched(true)}
                    />
                  </div>

                  <div>
                    <label htmlFor="ign" className="block text-white font-medium mb-2">
                      Minecraft Username *
                    </label>
                    <input
                      type="text"
                      name="ign"
                      id="ign"
                      placeholder="YourMinecraftName"
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      onChange={() => setFormTouched(true)}
                    />
                  </div>
                </div>

                {/* Service-specific fields */}
                {serviceType === "delivery" && (
                  <>
                    <div>
                      <label htmlFor="itemDescription" className="block text-white font-medium mb-2">
                        What needs delivered? *
                      </label>
                      <textarea
                        name="itemDescription"
                        id="itemDescription"
                        placeholder="e.g., 64 oak logs, diamond pickaxe, shulker boxes..."
                        required
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                        onChange={() => setFormTouched(true)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="pickupCoords" className="block text-white font-medium mb-2">
                          Pickup Location (x, y, z) *
                        </label>
                        <input
                          type="text"
                          name="pickupCoords"
                          id="pickupCoords"
                          placeholder="1234, 64, -5678"
                          value={pickupCoords}
                          onChange={(e) => {
                            setPickupCoords(e.target.value);
                            setFormTouched(true);
                          }}
                          required
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="dropoffCoords" className="block text-white font-medium mb-2">
                          Delivery Location (x, y, z) *
                        </label>
                        <input
                          type="text"
                          name="dropoffCoords"
                          id="dropoffCoords"
                          placeholder="5678, 70, -1234"
                          value={dropoffCoords}
                          onChange={(e) => {
                            setDropoffCoords(e.target.value);
                            setFormTouched(true);
                          }}
                          required
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                    {coordError && (
                      <div className="text-red-400 text-sm bg-red-900/20 rounded-lg p-3 border border-red-700/30">
                        ⚠️ {coordError}
                      </div>
                    )}
                  </>
                )}

                {serviceType === "villager" && (
                  <>
                    <div>
                      <label htmlFor="villagerCount" className="block text-white font-medium mb-2">
                        Number of Villagers *
                      </label>
                      <input
                        type="number"
                        name="villagerCount"
                        id="villagerCount"
                        min="1"
                        value={villagers}
                        onChange={(e) => {
                          setVillagers(e.target.value);
                          setFormTouched(true);
                        }}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="pickupCoords" className="block text-white font-medium mb-2">
                          Pickup Location (x, y, z) *
                        </label>
                        <input
                          type="text"
                          name="pickupCoords"
                          id="pickupCoords"
                          placeholder="1234, 64, -5678"
                          value={pickupCoords}
                          onChange={(e) => {
                            setPickupCoords(e.target.value);
                            setFormTouched(true);
                          }}
                          required
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="dropoffCoords" className="block text-white font-medium mb-2">
                          Delivery Location (x, y, z) *
                        </label>
                        <input
                          type="text"
                          name="dropoffCoords"
                          id="dropoffCoords"
                          placeholder="5678, 70, -1234"
                          value={dropoffCoords}
                          onChange={(e) => {
                            setDropoffCoords(e.target.value);
                            setFormTouched(true);
                          }}
                          required
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                    {coordError && (
                      <div className="text-red-400 text-sm bg-red-900/20 rounded-lg p-3 border border-red-700/30">
                        ⚠️ {coordError}
                      </div>
                    )}
                  </>
                )}

                {serviceType === "task" && (
                  <>
                    <div>
                      <label htmlFor="taskDescription" className="block text-white font-medium mb-2">
                        Task Description *
                      </label>
                      <textarea
                        name="taskDescription"
                        id="taskDescription"
                        placeholder="Describe what you need done..."
                        value={taskDesc}
                        onChange={(e) => {
                          setTaskDesc(e.target.value);
                          setFormTouched(true);
                        }}
                        required
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="timeBlockMinutes" className="block text-white font-medium mb-2">
                        Estimated Time (minutes)
                      </label>
                      <select
                        name="timeBlockMinutes"
                        id="timeBlockMinutes"
                        value={timeBlockMinutes}
                        onChange={(e) => {
                          setTimeBlockMinutes(e.target.value);
                          setFormTouched(true);
                        }}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="20">20 minutes</option>
                        <option value="40">40 minutes</option>
                        <option value="60">60 minutes</option>
                      </select>
                    </div>
                  </>
                )}

                {serviceType === "recovery" && (
                  <>
                    <div>
                      <label htmlFor="recoveryCoords" className="block text-white font-medium mb-2">
                        Recovery Location (x, y, z) *
                      </label>
                      <input
                        type="text"
                        name="recoveryCoords"
                        id="recoveryCoords"
                        placeholder="1234, 64, -5678"
                        value={recoveryCoords}
                        onChange={(e) => {
                          setRecoveryCoords(e.target.value);
                          setFormTouched(true);
                        }}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </>
                )}

                {serviceType === "timeblock" && (
                  <>
                    <div>
                      <label htmlFor="taskDescription" className="block text-white font-medium mb-2">
                        What do you need done? *
                      </label>
                      <textarea
                        name="taskDescription"
                        id="taskDescription"
                        placeholder="Describe the tasks you need help with..."
                        value={taskDesc}
                        onChange={(e) => {
                          setTaskDesc(e.target.value);
                          setFormTouched(true);
                        }}
                        required
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="timeBlockMinutes" className="block text-white font-medium mb-2">
                        Time Block Duration
                      </label>
                      <select
                        name="timeBlockMinutes"
                        id="timeBlockMinutes"
                        value={timeBlockMinutes}
                        onChange={(e) => {
                          setTimeBlockMinutes(e.target.value);
                          setFormTouched(true);
                        }}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="20">20 minutes</option>
                        <option value="40">40 minutes</option>
                        <option value="60">60 minutes</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Common fields for all service types */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dimension" className="block text-white font-medium mb-2">
                      Dimension
                    </label>
                    <select
                      name="dimension"
                      id="dimension"
                      value={dimension}
                      onChange={(e) => {
                        setDimension(e.target.value);
                        setFormTouched(true);
                      }}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="overworld">Overworld</option>
                      <option value="nether">Nether (+50%)</option>
                      <option value="end">End (+50%)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="urgency" className="block text-white font-medium mb-2">
                      Urgency Level
                    </label>
                    <select
                      name="urgency"
                      id="urgency"
                      value={urgency}
                      onChange={(e) => {
                        setUrgency(e.target.value);
                        setFormTouched(true);
                      }}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="whenever">Whenever (20% off)</option>
                      <option value="soon">Soon (normal price)</option>
                      <option value="urgent">Urgent (+50%)</option>
                      <option value="emergency">Emergency (+100%)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="hazardous"
                    id="hazardous"
                    checked={hazardous}
                    onChange={(e) => {
                      setHazardous(e.target.checked);
                      setFormTouched(true);
                    }}
                    className="w-5 h-5 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 text-blue-600"
                  />
                  <label htmlFor="hazardous" className="text-white font-medium">
                    Hazardous location (+25%)
                    <span className="text-gray-400 text-sm block">Dangerous biomes, heavy mobs, unstable terrain</span>
                  </label>
                </div>

                <div>
                  <label htmlFor="paymentOffer" className="block text-white font-medium mb-2">
                    Your Payment Offer
                  </label>
                  <input
                    type="text"
                    name="paymentOffer"
                    id="paymentOffer"
                    placeholder="15 diamonds"
                    value={paymentOffer}
                    onChange={(e) => {
                      setPaymentOffer(e.target.value);
                      setFormTouched(true);
                    }}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-white font-medium mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    placeholder="Any special requirements, timing preferences, or other details..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                    onChange={() => setFormTouched(true)}
                  />
                </div>

                <EnhancedEstimatorPanel 
                  estimate={estimate} 
                  serviceType={serviceType}
                  isCalculating={isCalculating}
                  paymentOffer={offerNumber}
                />

                <button
                  type="submit"
                  disabled={
                    state.submitting ||
                    !!coordError ||
                    (serviceType === "delivery" && !distanceInfo)
                  }
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {state.submitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <LoadingSpinner size="small" color="white" />
                      Submitting Request...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Package className="h-5 w-5" />
                      Submit Job Request
                    </div>
                  )}
                </button>

                {/* Form validation errors */}
                <div className="space-y-2">
                  <ValidationError prefix="Job" field="discordUsername" errors={state.errors} />
                  <ValidationError prefix="Job" field="ign" errors={state.errors} />
                  <ValidationError prefix="Job" field="itemDescription" errors={state.errors} />
                  <ValidationError prefix="Job" field="pickupCoords" errors={state.errors} />
                  <ValidationError prefix="Job" field="dropoffCoords" errors={state.errors} />
                  <ValidationError prefix="Job" field="paymentOffer" errors={state.errors} />
                </div>
              </form>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            <PricingMatrix />
            <PaymentPolicyCard />

            {/* Enhanced How It Works */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-400" />
                Quick Start Guide
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                {[
                  { step: 1, text: "Submit your service request above" },
                  { step: 2, text: "Get Discord DM for confirmation" },
                  { step: 3, text: "Meet in-game at pickup location" },
                  { step: 4, text: "Pay diamonds → Job completed!" }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Contact */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-400" />
                Contact & Support
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <span className="text-gray-300">Discord:</span>
                  <span className="text-blue-400 font-semibold">NilsTG</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <span className="text-gray-300">Response time:</span>
                  <span className="text-green-400 font-semibold">~18 mins avg</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <span className="text-gray-300">Payment:</span>
                  <span className="text-yellow-400 font-semibold">💎 Diamonds Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content Sections */}
      <EnhancedServiceCards />
      <ProcessVisualization />
      <EnhancedTrustSection />
      <EnhancedFAQ />

      {/* Enhanced Broke People Menu */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-600 to-orange-600 px-8 py-4 rounded-xl shadow-lg">
            <span className="text-3xl animate-bounce">🪙</span>
            <h2 className="text-2xl font-bold text-white">Broke People Menu™</h2>
          </div>
          <p className="text-gray-400 mt-6 italic text-lg max-w-2xl mx-auto">
            "Because even cheapskates deserve service. Just not fast service."
            <span className="text-xs block mt-2 text-gray-500">
              Humor aside, all services delivered with the same care and professionalism.
            </span>
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-8 py-4">
            <h3 className="text-white font-bold text-xl flex items-center gap-2">
              <span>💰</span>
              Budget Services
            </h3>
          </div>

          <div className="p-8 space-y-6">
            {[
              {
                service: "Basic Delivery (within 300 blocks)",
                description: "Includes sarcasm at no extra cost",
                price: "3 diamonds",
                popular: true
              },
              {
                service: "Multi-Shop Delivery",
                description: "Because you couldn't walk to two places",
                price: "5 diamonds"
              },
              {
                service: "Item Relocation (within your base)",
                description: "Literally carrying something 10 blocks",
                price: "2 diamonds"
              },
              {
                service: "Low Priority Queue Slot",
                description: "I'll get to it. Eventually. Maybe.",
                price: "1 diamond"
              }
            ].map((item, index) => (
              <div key={index} className={`flex justify-between items-center py-4 px-6 rounded-lg transition-all duration-300 hover:scale-102 ${
                item.popular ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/20 border border-yellow-500/30' : 'bg-gray-700/30 hover:bg-gray-700/50'
              } ${index < 3 ? 'border-b border-gray-600' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="text-white font-semibold text-lg">{item.service}</div>
                    {item.popular && (
                      <div className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                        Most Popular
                      </div>
                    )}
                  </div>
                  <div className="text-gray-400 mt-1">{item.description}</div>
                </div>
                <div className="text-yellow-400 font-bold text-xl ml-4">{item.price}</div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-900/20 border-t border-yellow-700/30 px-8 py-6">
            <div className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
              <span>⚠️</span>
              Broke People Menu™ Terms:
            </div>
            <ul className="text-yellow-200 text-sm space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">•</span>
                "Budget" doesn't mean "fast" or "with a smile"
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">•</span>
                Payment due upfront. No credit for broke people.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">•</span>
                Attitude adjustment not included in any package
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">•</span>
                Quality service guaranteed despite the humor
              </li>
            </ul>

            {/* Contact Section for Broke People Menu */}
            <div className="border-t border-yellow-700/30 pt-6">
              <div className="text-yellow-300 font-semibold mb-3 text-center">
                💬 How to Order Budget Services:
              </div>
              <div className="bg-yellow-800/30 rounded-lg p-4 text-center">
                <p className="text-yellow-200 text-sm mb-3">
                  For broke people menu services, contact me directly on Discord:
                </p>
                <div className="bg-yellow-700/50 rounded-lg px-4 py-2 inline-block">
                  <span className="text-white font-bold text-lg">NilsTG</span>
                </div>
                <p className="text-yellow-300 text-xs mt-3 italic">
                  Mention "Broke People Menu" for budget pricing • No fancy forms for cheap customers 😉
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;