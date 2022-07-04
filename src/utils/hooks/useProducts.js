import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useProducts({ q, categories, paginationURL }) {
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

        const categoriesArray = `[any(my.product.category, [${categories.map(c => `"${c}"`)}])]`;
        const searchQuery = q ? `[fulltext(document, "${q}")]` : "";

        const urlToFetch = paginationURL
          || `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
          `[[at(document.type, "product")]${categoriesArray}${searchQuery}]`
        )}&lang=en-us&pageSize=12`;

        const response = await fetch(
          urlToFetch,
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
  }, [apiRef, isApiMetadataLoading, q, categories, paginationURL]);

  return callData;
}
