import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useDocument(parentId: string | null) {
  const { data, error, isLoading } = useSWR(
    `/api/documents${parentId ? `/${parentId}` : ``}`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
  };
}
