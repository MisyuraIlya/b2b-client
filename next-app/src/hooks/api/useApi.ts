'use client'

import useSWR from 'swr';
import { useStore } from "@/context/StoreContext";
import { fetcher } from "@/utils/fetcher";

type ApiParams<T> = {
	entrypoint: string;
	params?: Record<string, any>;
	skip?: boolean;
	searchParams?: Record<string, any>,
	fallbackData?: T | undefined,
	token?: string;
	keepPreviousData?: boolean;
}

export function useApi<T>({
	skip,
	entrypoint,
	params,
	searchParams,
	fallbackData,
	token,
	keepPreviousData
}: ApiParams<T>) {
	const { client } = useStore();
	return useSWR<T>(skip ? null : JSON.stringify({ url: entrypoint, client, token, params, searchParams }), fetcher, { fallbackData, revalidateOnMount: fallbackData ? false : true, revalidateOnFocus: false, keepPreviousData });
}