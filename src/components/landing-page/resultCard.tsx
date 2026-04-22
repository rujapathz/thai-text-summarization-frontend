import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { ResultCardProps } from '../../services/types/summarizeType';

const ResultCard: React.FC<ResultCardProps> = ({ summarizedText, handleCopy, handleExport }) => {
    const wordCount = summarizedText
        ? summarizedText.split(/\s+/).filter(Boolean).length
        : 0;

    return (
        <motion.div
            style={{ width: '100%' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <Box sx={{
                backgroundColor: '#DEDEDE',
                borderRadius: '24px',
                border: '1px solid #000',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '280px',
            }}>
                <Typography sx={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: '#333',
                    textAlign: 'center',
                    marginBottom: '12px',
                }}>
                    ผลลัพธ์การสรุป
                </Typography>

                <Box sx={{
                    flex: 1,
                    overflowY: 'auto',
                    paddingRight: '4px',
                    minHeight: '170px',
                    maxHeight: '220px',
                    '&::-webkit-scrollbar': { width: '6px' },
                    '&::-webkit-scrollbar-track': { background: 'transparent' },
                    '&::-webkit-scrollbar-thumb': { background: '#888', borderRadius: '10px' },
                    '&::-webkit-scrollbar-thumb:hover': { background: '#555' },
                }}>
                    {summarizedText ? (
                        <Typography sx={{
                            color: '#000',
                            fontSize: '14px',
                            lineHeight: 1.7,
                            textAlign: 'left',
                        }}>
                            {summarizedText}
                        </Typography>
                    ) : (
                        <Typography sx={{
                            color: '#aaa',
                            fontSize: '14px',
                            textAlign: 'center',
                            marginTop: '60px',
                        }}>
                            ผลการสรุปจะแสดงที่นี่
                        </Typography>
                    )}
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '14px',
                    flexWrap: 'wrap',
                    gap: 1,
                }}>
                    {/* Word count */}
                    {/* <Typography sx={{ fontSize: '13px', color: '#555' }}>
                        // {summarizedText ? `จำนวน: ${wordCount} คำ` : ''}
                    </Typography> */}

                    {summarizedText && (
                        <Box sx={{ display: 'flex', gap: '8px' }}>
                            <Button
                                size="small"
                                onClick={handleCopy}
                                startIcon={<ContentCopyIcon sx={{ fontSize: '16px !important' }} />}
                                sx={{
                                    color: '#000',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    backgroundColor: '#D9D9D9',
                                    borderRadius: '20px',
                                    border: '1px solid #000',
                                    paddingX: '16px',
                                    paddingY: '6px',
                                    boxShadow: 'none',
                                    '&:hover': { backgroundColor: '#c5c5c5' },
                                }}
                            >
                                คัดลอก
                            </Button>

                            <Button
                                size="small"
                                onClick={handleExport}
                                startIcon={<FileDownloadIcon sx={{ fontSize: '16px !important' }} />}
                                sx={{
                                    color: '#000',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    backgroundColor: '#D9D9D9',
                                    borderRadius: '20px',
                                    border: '1px solid #000',
                                    paddingX: '16px',
                                    paddingY: '6px',
                                    boxShadow: 'none',
                                    '&:hover': { backgroundColor: '#c5c5c5' },
                                }}
                            >
                                ส่งออก
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </motion.div>
    );
};

export default ResultCard;
