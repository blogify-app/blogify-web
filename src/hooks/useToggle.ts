import {useCallback, useState} from "react";

/**
 * @param initialValue coerced to boolean
 */
export const useToggle = (
  initialValue: any = false
): [boolean, (newValue: boolean) => void, () => void] => {
  const [value, setValue] = useState(Boolean(initialValue));

  const set = useCallback(
    (newValue: boolean) => {
      setValue(newValue);
    },
    [setValue]
  );

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, [setValue]);

  return [value, set, toggle];
};
