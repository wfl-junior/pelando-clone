import { useCallback, useEffect, useRef, useState } from "react";

type StateCallbackFunction<T> = ((state: T) => any | Promise<any>) | null;

export type SetStateCallback<T> = (
  state: T | ((state: T) => T),
  cb?: StateCallbackFunction<T>,
) => void;

export function useStateCallback<T>(initialState: T): [T, SetStateCallback<T>] {
  const [state, setState] = useState(initialState);
  const callbackRef = useRef<StateCallbackFunction<T>>(null);

  const setStateCallback: SetStateCallback<T> = useCallback(
    (state, cb = null) => {
      callbackRef.current = cb;
      setState(state);
    },
    [],
  );

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null;
    }
  }, [state]);

  return [state, setStateCallback];
}
