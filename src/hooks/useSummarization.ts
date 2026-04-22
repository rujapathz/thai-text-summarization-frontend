import { useState } from 'react';
import { useEffect } from 'react';
import {
  useSummarizeTextMutation,
  useSummarizeUrlMutation,
  useSummarizePdfMutation,
} from '../services/summarizeApi';
import {
  SummarizationTab,
  SummaryLength,
  SummarizationHookReturn,
} from '../services/types/summarizeType';

export const tabs = ['ข้อความ (Text)', 'ลิงก์ URL (Link)', 'ไฟล์ PDF (File)'];

// Map SummaryLength → backend mode
const toMode = (lineLimit: SummaryLength): 'teaser' | 'short' | 'normal' => {
  switch (lineLimit) {
    case 'keyword': return 'teaser';
    case '3': return 'short';
    case '8': return 'normal';
    default: return 'teaser';
  }
};

export const useSummarization = (): SummarizationHookReturn => {
  const [tab, setTab] = useState<SummarizationTab>(0);
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [lineLimit, setLineLimit] = useState<SummaryLength>('keyword');

  const [summarizeText, textStatus] = useSummarizeTextMutation();
  const [summarizeUrl, urlStatus] = useSummarizeUrlMutation();
  const [summarizePdf, pdfStatus] = useSummarizePdfMutation();

  useEffect(() => {
    // reset RTK Query
    textStatus.reset();
    urlStatus.reset();
    pdfStatus.reset();

    // reset input
    if (tab === 0) {
      setUrl('');
      setFile(null);
    } else if (tab === 1) {
      setText('');
      setFile(null);
    } else if (tab === 2) {
      setText('');
      setUrl('');
    }
  }, [tab]);

  const isLoading = textStatus.isLoading || urlStatus.isLoading || pdfStatus.isLoading;
  const error = textStatus.error || urlStatus.error || pdfStatus.error;

  const lastData = textStatus.data || urlStatus.data || pdfStatus.data;

  const summarizedText = lastData?.summary ?? '';
  const frontendMetric = lastData?.frontend_metric ?? null;
  const bertScore = lastData?.bertscore ?? null;

  const handleSummarize = async () => {
    const mode = toMode(lineLimit);

    try {
      if (tab === 0) {
        if (!text.trim()) return;
        await summarizeText({ text, mode }).unwrap();
      } else if (tab === 1) {
        if (!url.trim()) return;
        await summarizeUrl({ url, mode }).unwrap();
      } else if (tab === 2) {
        if (!file) return;
        await summarizePdf({ file, mode }).unwrap();
      }
    } catch (err) {
      console.error('Summarization failed:', err);
    }
  };

  const handleClear = () => {
    setText('');
    setUrl('');
    setFile(null);
    textStatus.reset();
    urlStatus.reset();
    pdfStatus.reset();
  };

  return {
    tab,
    setTab,
    text,
    setText,
    url,
    setUrl,
    file,
    setFile,
    lineLimit,
    setLineLimit,
    summarizedText,
    frontendMetric,
    bertScore,
    isLoading,
    error,
    handleSummarize,
    handleClear,
    tabs,
  };
};
