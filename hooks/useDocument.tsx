import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useDocument(parentDocument: string | null) {
  const { data, error, isLoading, mutate} = useSWR(
    `/api/documents${
      parentDocument ? `?parentDocument=${parentDocument}` : ""
    }`,
    fetcher
  );
  return {
    data, error, isLoading, mutate
  };
}
