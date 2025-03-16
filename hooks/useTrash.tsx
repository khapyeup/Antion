import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useTrash() {
  const { data, error, isLoading } = useSWR(`/api/trash`, fetcher);
  return {
    data,
    error,
    isLoading,
  };
}
