import { useState, useEffect, useMemo } from "react";

export const useDebounce = (
  value: string,
  delay: number = 500,
): [string, boolean] => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const loading = useMemo(
    () => value.length > 0 && value !== debouncedValue,
    [value, debouncedValue],
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, loading];
};
