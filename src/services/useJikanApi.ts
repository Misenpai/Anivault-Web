import { useState, useEffect } from "react";
import JIKAN_API_BASE_URL from "../config/configjikan";

interface CacheEntry {
  data: any;
  timestamp: number;
}

const cache: Map<string, CacheEntry> = new Map();
const CACHE_TIMEOUT = 5 * 60 * 1000;

const useJikanApi = <T>(
  endpoint: string,
  params: Record<string, string | number> = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = `${endpoint}_${JSON.stringify(params)}`;
      const cached = cache.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < CACHE_TIMEOUT) {
        setData(cached.data);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const query = new URLSearchParams(params as any).toString();
        const url = `${JIKAN_API_BASE_URL.API_URL}/${endpoint}${
          query ? `?${query}` : ""
        }`;
        const response = await fetch(url);

        if (response.status === 429) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          return fetchData();
        }

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        cache.set(cacheKey, { data: result.data, timestamp: Date.now() });
        setData(result.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error };
};

export default useJikanApi;
