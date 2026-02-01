import { useEffect, useMemo, useState } from "react";

type DebounceHook = [string, boolean];

export const useDebounce = (
  value: string,
  delay: number = 500,
): DebounceHook => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const loading = useMemo(
    () => value.length > 0 && value !== debouncedValue,
    [value, debouncedValue],
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value.toLowerCase());
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, loading];
};
