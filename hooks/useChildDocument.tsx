import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useChildDocument(parentDocument: string | null) {
  const { data, error, isLoading } = useSWR(`/api/documents/${parentDocument}`, fetcher);
  return {
    data,
    error,
    isLoading,
  };
}
