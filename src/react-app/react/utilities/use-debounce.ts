import { useCallback, useEffect, useState } from "react";

export const useDebounce = <T>(
  value: T,
  delay: number,
): [T, (newValue: T) => void] => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  const setValueImmediately = useCallback((newValue: T) => {
    setDebouncedValue(newValue);
  }, []);

  return [debouncedValue, setValueImmediately];
};
