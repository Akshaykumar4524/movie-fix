import { useEffect, useRef } from 'react';

function useThrottle(func, delay) {
  const callbackRef = useRef(null);

  useEffect(() => {
    callbackRef.current = func;
  }, [func]);

  const throttledFunc = useRef((...args) => {
    if (callbackRef.current) {
      clearTimeout(callbackRef.current.timeoutId);
      callbackRef.current.timeoutId = setTimeout(() => {
        callbackRef.current.apply(this, args);
      }, delay);
    }
  }).current;

  return throttledFunc;
}

export default useThrottle;