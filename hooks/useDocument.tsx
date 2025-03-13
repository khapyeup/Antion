import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useDocument() {
  const { data, error, isLoading } = useSWR(`/api/documents`, fetcher);
  return {
    data,
    error,
    isLoading,
  };
}
