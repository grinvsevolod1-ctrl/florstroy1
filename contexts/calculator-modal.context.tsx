import { createContext, useContext, useState } from 'react';

type CalculatorModalContextType = {
  isCalculatorOpened: boolean;
  setIsCalculatorOpened: (value: boolean) => void;
};

const CalculatorModalContext = createContext<CalculatorModalContextType>({
  isCalculatorOpened: false,
  setIsCalculatorOpened: () => {},
});

export function CalculatorModalProvider({ children }: { children: React.ReactNode }) {
  const [isCalculatorOpened, setIsCalculatorOpened] = useState(false);

  return (
    <CalculatorModalContext.Provider value={{ isCalculatorOpened, setIsCalculatorOpened }}>
      {children}
    </CalculatorModalContext.Provider>
  );
}

export function useCalculatorModalContext() {
  return useContext(CalculatorModalContext);
}
