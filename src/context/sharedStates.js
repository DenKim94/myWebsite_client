import { createContext, useState } from 'react';
import { useContext } from 'react';


const SharedStateContext = createContext();

// Custom Hook, die den Zustand verwaltet und Setter-Funktion zurückgibt
export function useSharedState(initialValue = {}) {
    const [state, setState] = useState(initialValue);
  
    // Funktion zum gezielten Aktualisieren des Zustandsobjekts
    const updateState = (newValues) => {
      setState((prevState) => ({
        ...prevState,
        ...newValues,
      }));
    };
  
    return [state, updateState];
  }

export function useSharedContext() {
    return useContext(SharedStateContext);
  }

export { SharedStateContext };