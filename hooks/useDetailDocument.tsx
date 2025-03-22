import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useDetailDocument(id: string) {
  const { data, error, isLoading } = useSWR(
    `/api/documents/details/${id}`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
  };
}