import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'

interface ContextValue {
  currentStep: number
  stepsNumber: number
  nextStep: () => void
  previousStep: () => void
  resetStep: () => void
}

interface ProviderProps {
  children: ReactNode
  stepsNumber: number
  initialStep?: number
}

const StepContext = createContext<ContextValue | undefined>(undefined)

export const StepProvider = ({
  children,
  stepsNumber,
  initialStep = 1
}: ProviderProps) => {
  const [currentStep, setCurrentStep] = useState<number>(initialStep)

  const previousStep = useCallback(() => {
    setCurrentStep(prevState => Math.max(0, prevState - 1))
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep(prevState => Math.min(stepsNumber, prevState + 1))
  }, [stepsNumber])

  const resetStep = useCallback(() => {
    setCurrentStep(initialStep)
  }, [initialStep])

  return (
    <StepContext.Provider
      value={{ currentStep, nextStep, previousStep, resetStep, stepsNumber }}>
      {children}
    </StepContext.Provider>
  )
}

export const useStep = () => {
  const context = useContext(StepContext)
  if (!context) {
    throw new Error('useStep must be used within StepProvider')
  }
  return context
}
