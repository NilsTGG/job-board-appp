import React from "react";
import {
  CheckCircle,
  Circle,
  User,
  MapPin,
  Clock,
  CreditCard,
} from "lucide-react";

interface FormProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: { label: string; completed: boolean }[];
}

const stepIcons = [User, MapPin, Clock, CreditCard];

const FormProgressIndicator: React.FC<FormProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  steps,
}) => {
  const progressPercentage = Math.round(
    (steps.filter((s) => s.completed).length / totalSteps) * 100
  );

  return (
    <div className="mb-8 bg-gray-900/50 rounded-xl p-4 border border-gray-700">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-300">Form Progress</span>
        <span className="text-sm font-bold text-blue-400">
          {progressPercentage}% Complete
        </span>
      </div>

      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const Icon = stepIcons[index] || Circle;
          const isCompleted = step.completed;
          const isCurrent = index === currentStep;

          return (
            <div
              key={index}
              className={`flex flex-col items-center transition-all duration-300 ${
                isCompleted ? "opacity-100" : "opacity-50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-600 text-white"
                    : isCurrent
                    ? "bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-800"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              <span
                className={`text-xs mt-1 text-center max-w-[60px] ${
                  isCompleted
                    ? "text-green-400"
                    : isCurrent
                    ? "text-blue-400"
                    : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormProgressIndicator;
