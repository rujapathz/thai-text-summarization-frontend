import React, { useCallback } from 'react';
import { Box, Typography, Snackbar, Alert, LinearProgress, Grid, Divider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/navbar';
import InputCard from '../../components/landing-page/inputCard';
import SummaryOptions from '../../components/landing-page/summaryOptions';
import ResultCard from '../../components/landing-page/resultCard';
import { useSummarization } from '../../hooks/useSummarization';
import { SnackbarState } from '../../services/types/summarizeType';

const LandingPage = () => {
  const [snackbar, setSnackbar] = React.useState<SnackbarState>({
    open: false, message: '', severity: 'success',
  });

  const {
    tab, setTab,
    text, setText,
    url, setUrl,
    file, setFile,
    lineLimit, setLineLimit,
    summarizedText,
    frontendMetric,
    bertScore,
    isLoading,
    error,
    handleSummarize,
    handleClear,
    tabs,
  } = useSummarization();

  const handleCopy = useCallback(() => {
    if (!summarizedText) return;
    navigator.clipboard.writeText(summarizedText).then(() => {
      setSnackbar({ open: true, message: 'คัดลอกแล้ว!', severity: 'success' });
    });
  }, [summarizedText]);

  const handleExport = useCallback(() => {
    if (!summarizedText) return;
    const blob = new Blob([summarizedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary.txt';
    a.click();
    URL.revokeObjectURL(url);
    setSnackbar({ open: true, message: 'บันทึกไฟล์แล้ว!', severity: 'success' });
  }, [summarizedText]);

  const qualityScore = React.useMemo(() => {
    if (frontendMetric) return frontendMetric.score;
    if (!summarizedText) return null;
    const wordCount = summarizedText.split(/\s+/).filter(Boolean).length;
    const score = Math.min(95, Math.max(50, 60 + wordCount * 0.5));
    return Math.round(score * 100) / 100;
  }, [summarizedText, frontendMetric]);

  const qualityLabel = React.useMemo(() => {
    if (qualityScore === null) return '';
    if (qualityScore >= 80) return 'สรุปนี้ครอบคลุมประเด็นสำคัญได้อย่างครบถ้วน สามารถใช้งานได้ทันที';
    if (qualityScore >= 60) return 'สรุปนี้ครอบคลุมประเด็นหลักได้ดี อาจต้องการการตรวจสอบเพิ่มเติม';
    return 'สรุปนี้อาจไม่ครบถ้วน ควรตรวจสอบข้อมูลต้นฉบับ';
  }, [qualityScore]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#EEF0F8' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h5" sx={{ marginBottom: '24px', color: '#000', fontWeight: 'bold', fontSize: '26px' }}>
            Thai Text Summarization
          </Typography>
        </motion.div>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: '24px',
          width: '100%',
          maxWidth: '1200px',
          alignItems: 'flex-start',
        }}>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <InputCard
              tabs={tabs}
              tab={tab}
              setTab={setTab}
              text={text}
              setText={setText}
              url={url}
              setUrl={setUrl}
              file={file}
              setFile={setFile}
              handleClear={handleClear}
              handleSummarization={handleSummarize}
              isLoading={isLoading}
              error={error}
            />
            <SummaryOptions
              lineLimit={lineLimit}
              setLineLimit={setLineLimit}
            />
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <ResultCard
              summarizedText={summarizedText}
              handleCopy={handleCopy}
              handleExport={handleExport}
            />
          </Box>
        </Box>

        <AnimatePresence>
          {summarizedText && (
            <motion.div
              style={{ width: '100%', maxWidth: '1200px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{
                marginTop: '24px',
                backgroundColor: '#EEF0F8',
                borderRadius: '20px',
                padding: '20px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>

                  <Box
                    component="img"
                    src="/lizardlizard.png"
                    alt="lizard mascot"
                    sx={{ width: 100, height: 'auto', flexShrink: 0, objectFit: 'contain' }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '16px', color: '#333', marginBottom: '10px' }}>
                      คุณภาพการสรุป (Frontend Metric)
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: '8px' }}>
                      <LinearProgress
                        variant="determinate"
                        value={qualityScore || 0}
                        sx={{
                          flex: 1,
                          height: '14px',
                          borderRadius: '8px',
                          backgroundColor: '#D6D6D6',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: (qualityScore || 0) > 70 ? '#A8C7B3' : (qualityScore || 0) > 50 ? '#F3CA52' : '#E8736A',
                            borderRadius: '8px',
                          }
                        }}
                      />
                      <Typography sx={{ fontWeight: 'bold', fontSize: '15px', color: '#333', minWidth: '56px' }}>
                        {(qualityScore || 0).toFixed(1)}%
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '14px', color: '#555' }}>
                      {qualityLabel}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={() => setSnackbar(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default LandingPage;
