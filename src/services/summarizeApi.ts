import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SummarizeResponse } from './types/summarizeType';

const BASE_URL = 'http://localhost:5000';

export type TextSummarizeApiRequest = {
    text: string;
    mode: 'teaser' | 'short' | 'normal';
    reference?: string;
};

export type UrlSummarizeApiRequest = {
    url: string;
    mode: 'teaser' | 'short' | 'normal';
    reference?: string;
};

export type PdfSummarizeApiRequest = {
    file: File;
    mode: 'teaser' | 'short' | 'normal';
    reference?: string;
};

export const summarizeApi = createApi({
    reducerPath: 'summarizeApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({

        summarizeText: builder.mutation<SummarizeResponse, TextSummarizeApiRequest>({
            query: (data) => ({
                url: '/summarize/text',
                method: 'POST',
                body: { text: data.text, mode: data.mode, reference: data.reference },
            }),
        }),

        summarizeUrl: builder.mutation<SummarizeResponse, UrlSummarizeApiRequest>({
            query: (data) => ({
                url: '/summarize/url',
                method: 'POST',
                body: { url: data.url, mode: data.mode, reference: data.reference },
            }),
        }),

        summarizePdf: builder.mutation<SummarizeResponse, PdfSummarizeApiRequest>({
            query: (data) => {
                const formData = new FormData();
                formData.append('file', data.file);
                formData.append('mode', data.mode);
                if (data.reference) formData.append('reference', data.reference);
                return {
                    url: '/summarize/pdf',
                    method: 'POST',
                    body: formData,
                };
            },
        }),

        evaluateText: builder.mutation<SummarizeResponse, TextSummarizeApiRequest>({
            query: (data) => ({
                url: '/summarize/evaluate',
                method: 'POST',
                body: { text: data.text, mode: data.mode, reference: data.reference },
            }),
        }),

        evaluateUrl: builder.mutation<SummarizeResponse, UrlSummarizeApiRequest>({
            query: (data) => ({
                url: '/summarize/evaluate-url',
                method: 'POST',
                body: { url: data.url, mode: data.mode, reference: data.reference },
            }),
        }),

        evaluatePdf: builder.mutation<SummarizeResponse, PdfSummarizeApiRequest>({
            query: (data) => {
                const formData = new FormData();
                formData.append('file', data.file);
                formData.append('mode', data.mode);
                if (data.reference) formData.append('reference', data.reference);
                return {
                    url: '/summarize/evaluate-pdf',
                    method: 'POST',
                    body: formData,
                };
            },
        }),

    }),
});

export const {
    useSummarizeTextMutation,
    useSummarizeUrlMutation,
    useSummarizePdfMutation,
    useEvaluateTextMutation,
    useEvaluateUrlMutation,
    useEvaluatePdfMutation,
} = summarizeApi;