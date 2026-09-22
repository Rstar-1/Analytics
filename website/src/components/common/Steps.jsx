import React, { memo, useCallback } from "react";
import Icon from "./Icon";

const Steps = memo(
  ({
    currentStep = 1,
    steps = [],
    version = "v1",
    className = "",
    showPercent,
    showPercentage,
    percentage,
    onChange,
    onStepClick,
  }) => {
    if (!steps?.length) return null;

    const numSteps = steps.length;
    const activeStep = Math.min(numSteps, Math.max(1, Number(currentStep) || 1));
    const isV2 = version === "v2" || version === 2 || version === "2";
    const shouldShowPercent = showPercentage ?? showPercent;

    const percent =
      typeof percentage === "number"
        ? Math.min(100, Math.max(0, Math.round(percentage)))
        : Math.round((activeStep / numSteps) * 100);

    const handleStepClick = useCallback(
      (stepNumber) => {
        onChange?.(stepNumber);
        onStepClick?.(stepNumber);
      },
      [onChange, onStepClick]
    );

    // Version 2: Only visual percentage line (not steps UI)
    if (isV2) {
      return (
        <div className={`w-full ${className}`}>
          <div className="flex items-center justify-between mb-8 px-2">
            <p className="mini-text text-gray font-500">
              Step <span className="text-dark font-600">{activeStep}</span> of {numSteps}
            </p>
            <span className="mini-text font-600 text-primary bg-light-primary px-8 py-2 rounded-20">
              {percent}% Completed
            </span>
          </div>
          {/* Visual Percentage Line */}
          <div
            className="w-full overflow-hidden"
            style={{ height: 2, backgroundColor: "#e2e8f0" }}
          >
            <div
              className="h-full"
              style={{
                width: `${percent}%`,
                backgroundColor: "var(--primary)",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={`w-full ${className}`}>
        {shouldShowPercent && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8 px-2">
              <p className="mini-text text-gray font-500">
                Step <span className="text-dark font-600">{activeStep}</span> of {numSteps}
              </p>
              <span className="mini-text font-600 text-primary bg-light-primary px-8 py-2 rounded-20">
                {percent}% Completed
              </span>
            </div>
            {/* Visual Percentage Line */}
            <div
              className="w-full overflow-hidden"
              style={{ height: 2, backgroundColor: "#e2e8f0" }}
            >
              <div
                className="h-full"
                style={{
                  width: `${percent}%`,
                  backgroundColor: "var(--primary)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        )}

        <div
          className={`grid-cols-${numSteps <= 12 ? numSteps : 4} items-center w-full relative`}
          style={{ gridTemplateColumns: `repeat(${numSteps}, minmax(0, 1fr))` }}
        >
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < activeStep;
            const isCurrent = stepNumber === activeStep;
            const isClickable = Boolean(onChange || onStepClick);
            const label = typeof step === "object" ? step.title || step.label : step;

            return (
              <div
                key={typeof step === "object" ? step.title || index : step}
                onClick={() => isClickable && handleStepClick(stepNumber)}
                className={`relative ${isClickable ? "cursor-pointer" : ""}`}
              >
                {index < numSteps - 1 && (
                  <div
                    className="absolute"
                    style={{
                      top: "31%",
                      left: "45%",
                      width: "100%",
                      height: 3,
                      backgroundColor: "#e2e8f0",
                      transform: "translateY(-50%)",
                      zIndex: 0,
                    }}
                  >
                    <div
                      className="h-full"
                      style={{
                        width: stepNumber < activeStep ? "100%" : "0%",
                        backgroundColor: "var(--primary)",
                      }}
                    />
                  </div>
                )}

                <div
                  className={`rounded-full icon-lg mx-auto font-600 relative ${isCompleted || isCurrent ? "bg-primary text-white" : "bg-white text-gray"
                    }`}
                  style={{
                    border: isCompleted || isCurrent ? "none" : "2px solid #cbd5e1",
                    transition: "all 0.25s ease",
                  }}
                >
                  {isCompleted ? (
                    <Icon name="Check" width="14" height="14" stroke="#ffffff" strokeWidth="3" />
                  ) : (
                    stepNumber
                  )}
                </div>

                <p
                  className={`mini-text text-center mt-10 line-clamp1 ${isCurrent
                      ? "text-primary font-500"
                      : isCompleted
                        ? "text-dark font-500"
                        : "text-gray font-400"
                    }`}
                >
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

Steps.displayName = "Steps";

export default Steps;
