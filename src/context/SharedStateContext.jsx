/* eslint-disable react/prop-types */
import { useSharedState, SharedStateContext } from './sharedStates';


export function SharedStateProvider({ children, initialValue = { cardIndex: undefined, isVisible: false } }) {
  const [visibleCardInfo, setVisibleCardInfo] = useSharedState(initialValue); 

  return (
    <SharedStateContext.Provider value={{ visibleCardInfo, setVisibleCardInfo }}>
      {children}
    </SharedStateContext.Provider>
  );
}
