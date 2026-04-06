import React, { useState, useCallback } from 'react';
import {
  Button, TextField, RadioGroup, Radio, FormControlLabel,
  FormControl, Box, Typography, IconButton, Tooltip, Snackbar, Alert,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import { useSummarizeTextMutation } from '../../services/summarizeApi';

const tabs = ['ข้อความ (Text)', 'ลิงก์ URL (Link)', 'ไฟล์ PDF (File)'];

// แปลง lineLimit → ratio/max_length
const optionToParams = (lineLimit: string) => {
  switch (lineLimit) {
    case 'keyword': return { ratio: 0.15, min_length: 10, max_length: 80 };
    case '3':       return { ratio: 0.25, min_length: 20, max_length: 180 };
    case '8':       return { ratio: 0.4,  min_length: 50, max_length: 480 };
    default:        return { ratio: 0.3,  min_length: 30, max_length: 300 };
  }
};

const LandingPage = () => {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [lineLimit, setLineLimit] = useState('keyword');
  const [tab, setTab] = useState(0);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false, message: '', severity: 'success',
  });

  // RTK Query mutation hook
  const [summarizeText, { data, isLoading, error, reset }] = useSummarizeTextMutation();

  const summarizedText = data?.summary ?? '';

  const handleSummarization = async () => {
    if (!text.trim()) return;
    const params = optionToParams(lineLimit);
    await summarizeText({ text, ...params });
  };

  const handleClear = () => {
    setText('');
    reset();  // เคลียร์ result ด้วย
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(summarizedText).then(() => {
      setSnackbar({ open: true, message: 'คัดลอกแล้ว!', severity: 'success' });
    });
  }, [summarizedText]);

  const handleExport = useCallback(() => {
    const blob = new Blob([summarizedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary.txt';
    a.click();
    URL.revokeObjectURL(url);
    setSnackbar({ open: true, message: 'บันทึกไฟล์แล้ว!', severity: 'success' });
  }, [summarizedText]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#EEF0F8' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h5" sx={{ marginBottom: '24px', color: '#000', fontWeight: 'bold', fontSize: '26px' }}>
            Thai Text Summarization
          </Typography>
        </motion.div>

        {/* Card */}
        <motion.div
          style={{ width: '100%', maxWidth: '620px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box sx={{ borderRadius: '20px', border: '2px solid #000', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>

            {/* Tab Header */}
            <Box sx={{ display: 'flex' }}>
              {tabs.map((label, index) => (
                <Box key={index} onClick={() => setTab(index)} sx={{
                  flex: 1, padding: '12px 0', textAlign: 'center', cursor: 'pointer',
                  fontSize: '13px', fontWeight: tab === index ? 'bold' : 'normal', color: '#000',
                  backgroundColor: tab === index ? '#DEDEDE' : '#A8C7B3',
                  borderBottom: tab === index ? 'none' : '2px solid #000',
                  borderRight: index < tabs.length - 1 ? '2px solid #000' : 'none',
                  transition: 'background-color 0.3s ease', userSelect: 'none',
                }}>
                  {label}
                </Box>
              ))}
            </Box>

            {/* Tab Content */}
            <Box sx={{ backgroundColor: '#DEDEDE', padding: '16px' }}>
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                  {tab === 0 && (
                    <Box sx={{ position: 'relative' }}>
                      <TextField
                        placeholder="เขียนข้อความที่คุณต้องการสรุป . . . ."
                        multiline rows={6} value={text}
                        onChange={(e) => setText(e.target.value)}
                        fullWidth variant="outlined"
                        sx={{
                          backgroundColor: '#DEDEDE', borderRadius: '10px',
                          '& fieldset': { border: 'none' },
                          '& .MuiInputBase-input': { fontSize: '14px', color: '#000', paddingRight: '36px' },
                        }}
                      />
                      {/* Trash icon — แสดงเมื่อมีข้อความ */}
                      <AnimatePresence>
                        {text && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            style={{ position: 'absolute', top: 8, right: 8 }}
                          >
                            <Tooltip title="ล้างข้อความ">
                              <IconButton size="small" onClick={handleClear} sx={{ color: '#555', '&:hover': { color: '#c0392b' } }}>
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Box>
                  )}

                  {tab === 1 && (
                    <TextField
                      placeholder="วาง URL ที่คุณต้องการสรุป . . . ."
                      value={url} onChange={(e) => setUrl(e.target.value)}
                      fullWidth variant="outlined"
                      sx={{
                        backgroundColor: '#DEDEDE', borderRadius: '10px',
                        '& fieldset': { border: 'none' },
                        '& .MuiInputBase-input': { fontSize: '14px', color: '#000' },
                        marginBottom: '80px',
                      }}
                    />
                  )}

                  {tab === 2 && (
                    <Box sx={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'center', height: '150px',
                      border: '2px dashed #000', borderRadius: '10px', cursor: 'pointer', color: '#000',
                    }}>
                      <Typography fontSize="14px">คลิกหรือลากไฟล์ PDF มาวางที่นี่</Typography>
                    </Box>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Error */}
              {error && (
                <Typography sx={{ color: 'red', fontSize: '13px', mt: 1 }}>
                  เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง
                </Typography>
              )}

              {/* Submit Button */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Button
                    variant="contained"
                    onClick={handleSummarization}
                    disabled={isLoading || !text.trim()}
                    sx={{
                      backgroundColor: '#A8C7B3', borderRadius: '20px', color: '#000',
                      fontWeight: 'bold', textTransform: 'uppercase',
                      paddingX: '28px', paddingY: '10px',
                      border: '2px solid #000', boxShadow: '3px 3px 0px #000',
                      '&:hover': { backgroundColor: '#8fb39e', boxShadow: '5px 5px 0px #000' },
                      '&:disabled': { backgroundColor: '#c5d9cf', color: '#666' },
                    }}
                  >
                    {isLoading ? 'กำลังสรุป...' : 'Summarization'}
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Radio */}
        <motion.div style={{ width: '100%', maxWidth: '620px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <FormControl sx={{ marginTop: '16px', width: '100%' }}>
            <RadioGroup row value={lineLimit} onChange={(e) => setLineLimit(e.target.value)}>
              <FormControlLabel value="keyword" control={<Radio sx={{ color: '#000', '&.Mui-checked': { color: '#000' } }} />} label={<Typography sx={{ color: '#000', fontSize: '14px' }}>คำโปรย</Typography>} />
              <FormControlLabel value="3" control={<Radio sx={{ color: '#000', '&.Mui-checked': { color: '#000' } }} />} label={<Typography sx={{ color: '#000', fontSize: '14px' }}>สรุปสั้น (ไม่เกิน 3 บรรทัด)</Typography>} />
              <FormControlLabel value="8" control={<Radio sx={{ color: '#000', '&.Mui-checked': { color: '#000' } }} />} label={<Typography sx={{ color: '#000', fontSize: '14px' }}>สรุปปกติ (ไม่เกิน 8 บรรทัด)</Typography>} />
            </RadioGroup>
          </FormControl>
        </motion.div>

        {/* Result Box */}
        <AnimatePresence>
          {summarizedText && (
            <motion.div
              style={{ width: '100%', maxWidth: '620px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Box sx={{ marginTop: '20px' }}>
                <TextField
                  label="ข้อความที่สรุปแล้ว"
                  multiline rows={4} value={summarizedText}
                  fullWidth InputProps={{ readOnly: true }}
                  sx={{
                    backgroundColor: '#DEDEDE', borderRadius: '10px',
                    '& fieldset': { borderColor: '#000', borderWidth: '2px' },
                    '& .MuiInputLabel-root': { color: '#000' },
                    '& .MuiInputBase-input': { color: '#000' },
                  }}
                />
                {/* Copy + Export buttons */}
                <Box sx={{ display: 'flex', gap: 1, marginTop: '10px', justifyContent: 'flex-end' }}>
                  <Tooltip title="คัดลอก">
                    <IconButton onClick={handleCopy} sx={{
                      border: '2px solid #000', borderRadius: '12px', padding: '6px 12px',
                      backgroundColor: '#DEDEDE', boxShadow: '2px 2px 0px #000',
                      '&:hover': { backgroundColor: '#c5c5c5' },
                    }}>
                      <ContentCopyIcon fontSize="small" />
                      <Typography sx={{ fontSize: '12px', ml: 0.5 }}>คัดลอก</Typography>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="บันทึกเป็น .txt">
                    <IconButton onClick={handleExport} sx={{
                      border: '2px solid #000', borderRadius: '12px', padding: '6px 12px',
                      backgroundColor: '#A8C7B3', boxShadow: '2px 2px 0px #000',
                      '&:hover': { backgroundColor: '#8fb39e' },
                    }}>
                      <FileDownloadIcon fontSize="small" />
                      <Typography sx={{ fontSize: '12px', ml: 0.5 }}>บันทึก .txt</Typography>
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

      </Box>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={() => setSnackbar(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default LandingPage;