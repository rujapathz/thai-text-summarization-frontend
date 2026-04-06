import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { 
    TextSummarizeRequest, 
    UrlSummarizeRequest, 
    FileSummarizeRequest, 
    SummarizeResponse 
} from "./types/summarizeType";

const BASE_URL = "http://localhost:5000";

export const summarizeApi = createApi({
    reducerPath: "summarizeApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        summarizeText: builder.mutation<SummarizeResponse, TextSummarizeRequest>({
            query: (data: TextSummarizeRequest) => ({
                url: "/summarize/text",
                method: "POST",
                body: data,
            }),
        }),
       summarizeUrl: builder.mutation<SummarizeResponse, UrlSummarizeRequest>({
  query: (data: UrlSummarizeRequest) => ({
    url: "/summarize/url",
    method: "POST",
    body: data,
  }),
}),
        summarizePdf: builder.mutation<SummarizeResponse, FileSummarizeRequest>({
            query: (data: FileSummarizeRequest) => {
                const formData = new FormData();
                formData.append("file", data.file);
                formData.append("ratio", data.ratio.toString());
                formData.append("min_length", data.min_length.toString());
                formData.append("max_length", data.max_length.toString());
                
                return {
                    url: "/summarize/pdf",
                    method: "POST",
                    body: formData,
                };
            },
        }),
    }),
});

export const { 
    useSummarizeTextMutation, 
    useSummarizeUrlMutation, 
    useSummarizePdfMutation 
} = summarizeApi;