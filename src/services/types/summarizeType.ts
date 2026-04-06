export type SummarizeOptions = {
    ratio: number;
    min_length: number;
    max_length: number;
}

export type TextSummarizeRequest = {
    text: string;
} & SummarizeOptions;

export type UrlSummarizeRequest = {
    url: string;
} & SummarizeOptions;

export type FileSummarizeRequest = {
    file: File;
} & SummarizeOptions;

export type SummarizeResponse = {
    summary: string;
    original_text?: string;
    metadata?: Record<string, any>;
}