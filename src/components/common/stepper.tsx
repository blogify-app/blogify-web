import React, {
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface StepperContextValue {
  activeStep: number;
  setActiveStep(step: number): void;
  addStep(step: string): void;
  steps: string[];
  isLastStep(): boolean;
  isFirstStep(): boolean;
  nextStep(): void;
  prevStep(): void;
}

const StepperContext = React.createContext<StepperContextValue>({} as any);

// eslint-disable-next-line react-refresh/only-export-components
export const useStepperContext = () => useContext(StepperContext);

export const Stepper: FC<PropsWithChildren> = ({children}) => {
  const [steps, setSteps] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const addStep = useCallback(
    (step: string) => {
      setSteps((prev) => Array.from(new Set(prev.concat(step))));
      setActiveStep(0);
    },
    [setActiveStep, setSteps]
  );

  const nextStep = useCallback(() => {
    setActiveStep((prev) => prev + 1);
  }, [setActiveStep]);

  const prevStep = useCallback(() => {
    setActiveStep((prev) => prev - 1);
  }, [setActiveStep]);

  return (
    <StepperContext.Provider
      value={useMemo(
        () => ({
          steps,
          activeStep,
          setActiveStep,
          addStep,
          nextStep,
          prevStep,
          isLastStep: () => activeStep === steps.length - 1,
          isFirstStep: () => activeStep === 0,
        }),
        [activeStep, setActiveStep, steps, addStep, nextStep, prevStep]
      )}
    >
      {children}
    </StepperContext.Provider>
  );
};

export type StepperViewProps = PropsWithChildren<{
  step: string;
}>;

export const StepperView: FC<StepperViewProps> = ({step, children}) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {activeStep, steps, addStep} = useStepperContext();

  useEffect(() => {
    addStep(step);
  }, [addStep, step]);

  if (steps[activeStep] !== step) return;
  return children;
};

export interface StepperRenderProps {
  render(ctx: StepperContextValue): ReactNode;
}

export const StepperRender: FC<StepperRenderProps> = ({render}) => {
  const ctx = useStepperContext();
  return render(ctx);
};
