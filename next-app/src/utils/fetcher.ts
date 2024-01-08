'use client'

import queryString from 'query-string';
import { Fetcher } from "swr";
type FetchKey = {
	url: string;
	client: string;
	token?: string;
	params: any;
	searchParams: any;
};

export const fetcher: Fetcher<any, string> = async (data) => {
	const { url, client, token, params, searchParams } = JSON.parse(data) as FetchKey
	const getQueryString = (): string => {
		const prefix = `?client=${client}`
		if (searchParams) {
			return `${prefix}&${queryString.stringify(searchParams, { arrayFormat: 'bracket' })}`
		}
		return prefix
	}

	const slug = params?.join(',')
	const path = `${url}${slug ? `/${slug}` : ''}${getQueryString()}`
	const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}`;
	const headers = new Headers({
		'Content-Type': 'application/json',
	})
	if (token) {
		headers.set('Authorization', `Bearer ${token}`);
	}
	const response = await fetch(endpoint, {
		method: 'GET',
		headers,
	});

	if (!response.ok) {
		throw new Error("Network error");
	}

	return response.json();
};