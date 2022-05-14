import { isBrowser } from "@/utils/isBrowser";
import { Dispatch, SetStateAction, useState } from "react";
import { useUpdateEffect } from "./useUpdateEffect";

export const useLocalStorageState = <T>(
  key: string,
  initialState: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    // se não tiver no browser não vai ter localStorage
    if (!isBrowser()) {
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
