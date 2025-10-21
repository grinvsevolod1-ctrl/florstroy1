import { createContext, useContext, useState } from 'react';

interface FeedbackModalContextType {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  selectedService: string;
  setSelectedService: (v: string) => void;
}

const FeedbackModalContext = createContext<FeedbackModalContextType>({
  isOpen: false,
  setIsOpen: () => {},
  selectedService: '',
  setSelectedService: () => {},
});

export function FeedbackModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  return (
    <FeedbackModalContext.Provider value={{ isOpen, setIsOpen, selectedService, setSelectedService }}>
      {children}
    </FeedbackModalContext.Provider>
  );
}

export const useFeedbackModalContext = () => useContext(FeedbackModalContext);
