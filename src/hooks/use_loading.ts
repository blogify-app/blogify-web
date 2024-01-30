import {useCallback, useState} from "react";

type QueueTask = <T>(cb: () => Promise<T>) => Promise<T>;

export const useLoading = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const queue: QueueTask = useCallback(
    async (fn) => {
      setIsLoading(true);
      try {
        const ret = await fn();
        setIsLoading(false);
        return ret;
      } catch (e) {
        setIsLoading(false);
        throw e;
      }
    },
    [setIsLoading]
  );

  return {
    id,
    queue,
    isLoading,
  };
};
