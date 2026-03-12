interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  onStepClick?: (step: number) => void;
}

export function StepIndicator({
  currentStep,
  totalSteps,
  stepLabels,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span className="font-medium">
          Step {currentStep} of {totalSteps}
        </span>
        <span>{stepLabels[currentStep - 1]}</span>
      </div>
      <div className="flex gap-2">
        {stepLabels.map((label, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isComplete = step < currentStep;
          const clickable = !!onStepClick && step <= currentStep;
          return (
            <button
              key={label}
              type="button"
              disabled={!clickable}
              onClick={clickable ? () => onStepClick(step) : undefined}
              className={[
                'flex-1 h-2 rounded-full transition-colors',
                isActive
                  ? 'bg-emerald-600'
                  : isComplete
                  ? 'bg-emerald-200'
                  : 'bg-slate-200',
                clickable ? 'cursor-pointer' : 'cursor-default',
              ].join(' ')}
              aria-label={label}
            />
          );
        })}
      </div>
    </div>
  );
}

