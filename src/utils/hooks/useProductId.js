import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useProductsId(id) {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [callData, setCallData] = useState(() => ({
    data: {},
    isLoading: true,
  }));

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getCallData() {
      try {
        setCallData({ data: {}, isLoading: true });

        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            `[[:d=at(document.id,"${id}")]]`
          )}`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();

        setCallData({ data, isLoading: false });
      } catch (err) {
        setCallData({ data: {}, isLoading: false });
        console.error(err);
      }
    }

    getCallData();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading, id]);

  return callData;
}
