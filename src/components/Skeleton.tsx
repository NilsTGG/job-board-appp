import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string | number;
  height?: string | number;
  count?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "text",
  width,
  height,
  count = 1,
}) => {
  const baseClasses = "bg-gray-700 animate-pulse";

  const variantClasses = {
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "rounded-lg",
    card: "rounded-xl",
  };

  const style: React.CSSProperties = {
    width: width || (variant === "text" ? "100%" : undefined),
    height: height || (variant === "text" ? "1rem" : undefined),
  };

  const elements = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  ));

  return count === 1 ? elements[0] : <>{elements}</>;
};

// Product Card Skeleton
export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
    <Skeleton variant="rectangular" className="h-48 w-full rounded-none" />
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-start">
        <Skeleton variant="text" width="60%" height="1.5rem" />
        <Skeleton variant="rectangular" width="50px" height="1.5rem" />
      </div>
      <Skeleton variant="text" count={2} className="mb-1" />
      <Skeleton variant="rectangular" height="2.5rem" className="mt-4" />
    </div>
  </div>
);

// Review Card Skeleton
export const ReviewCardSkeleton: React.FC = () => (
  <div className="flex-shrink-0 w-80 md:w-96 p-6 rounded-xl border border-gray-700 bg-gray-800">
    <div className="flex items-center gap-3 mb-4">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1">
        <Skeleton variant="text" width="70%" height="1rem" className="mb-2" />
        <Skeleton variant="text" width="40%" height="0.75rem" />
      </div>
    </div>
    <div className="space-y-3">
      <Skeleton variant="text" count={3} className="mb-1" />
    </div>
    <Skeleton variant="rectangular" height="60px" className="mt-4" />
  </div>
);

// Service Card Skeleton
export const ServiceCardSkeleton: React.FC = () => (
  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
    <div className="flex items-center gap-3 mb-3">
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" width="50%" height="1.25rem" />
    </div>
    <Skeleton variant="text" width="80%" className="mb-2" />
    <Skeleton variant="text" count={2} className="mb-1" />
  </div>
);

// Sidebar Skeleton
export const SidebarSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div>
      <Skeleton variant="text" width="40%" height="1.25rem" className="mb-4" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height="2.5rem" />
        ))}
      </div>
    </div>
    <div>
      <Skeleton variant="text" width="50%" height="1.25rem" className="mb-4" />
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height="2.5rem" />
        ))}
      </div>
    </div>
  </div>
);

export default Skeleton;
