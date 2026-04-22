export type SummarizeResponse = {
    summary: string;
    original_text?: string;
    frontend_metric?: {
        score: number;
        min: number;
        max: number;
    };
    bertscore?: {
        precision: number;
        recall: number;
        f1: number;
    } | null;
    metadata?: Record<string, any>;
}

export type SummaryLength = 'keyword' | '3' | '8';

export type SummarizationTab = 0 | 1 | 2;

export interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
}

export interface InputCardProps {
    tabs: string[];
    tab: SummarizationTab;
    setTab: (index: SummarizationTab) => void;
    text: string;
    setText: (val: string) => void;
    url: string;
    setUrl: (val: string) => void;
    file: File | null;
    setFile: (file: File | null) => void;
    handleClear: () => void;
    handleSummarization: () => void;
    isLoading: boolean;
    error: any;
}

export interface SummaryOptionsProps {
    lineLimit: SummaryLength;
    setLineLimit: (val: SummaryLength) => void;
}

export interface ResultCardProps {
    summarizedText: string;
    handleCopy: () => void;
    handleExport: () => void;
}

export interface SummarizationHookReturn {
    tab: SummarizationTab;
    setTab: (index: SummarizationTab) => void;
    text: string;
    setText: (val: string) => void;
    url: string;
    setUrl: (val: string) => void;
    file: File | null;
    setFile: (file: File | null) => void;
    lineLimit: SummaryLength;
    setLineLimit: (val: SummaryLength) => void;
    summarizedText: string;
    frontendMetric: { score: number; min: number; max: number } | null;
    bertScore: { precision: number; recall: number; f1: number } | null;
    isLoading: boolean;
    error: any;
    handleSummarize: () => Promise<void>;
    handleClear: () => void;
    tabs: string[];
}