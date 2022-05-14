import { Dispatch, SetStateAction, useState } from "react";
import { useUpdateEffect } from "./useUpdateEffect";

export const useLocalStorageState = <T>(
  key: string,
  initialState: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    // se tiver no servidor não vai ter localStorage
    if (typeof window === "undefined") {
      return initialState;
    }

    const localStorageItem = localStorage.getItem(key);
    return localStorageItem ? JSON.parse(localStorageItem) : initialState;
  });

  useUpdateEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
