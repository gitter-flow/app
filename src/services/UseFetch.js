import { useEffect, useRef, useCallback } from "react";

export default function useFetch() {
    const abortController = useRef(new AbortController());
    useEffect(() => () => abortController.current.abort(), []);
  
    return useCallback(
      (url, options) =>
        fetch(url, { signal: abortController.current.signal, ...options }),
      []
    );
  }