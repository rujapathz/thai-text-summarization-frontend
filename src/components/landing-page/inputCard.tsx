import React from 'react';
import { Box, TextField, Typography, IconButton, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { InputCardProps, SummarizationTab } from '../../services/types/summarizeType';

const InputCard: React.FC<InputCardProps> = ({
    tabs, tab, setTab, text, setText, url, setUrl, file, setFile, handleClear, handleSummarization, isLoading, error
}) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const isDisableButton = () => {
        if (tab === 0) return !text.trim();
        if (tab === 1) return !url.trim();
        if (tab === 2) return !file;
        return true;
    };

    const handleDeleteClick = () => setShowDeleteModal(true);
    const handleConfirmDelete = () => { handleClear(); setShowDeleteModal(false); };
    const handleCancelDelete = () => setShowDeleteModal(false);

    return (
        <motion.div
            style={{ width: '100%' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Box sx={{ width: '100%' }}>

                <Box sx={{
                    backgroundColor: '#DEDEDE',
                    borderRadius: '24px',
                    border: '1px solid #000',
                    overflow: 'hidden',
                }}>

                    <Box sx={{ display: 'flex', gap: '8px', padding: '12px 16px 0 16px', justifyContent: 'center' }}>
                        {tabs.map((label, index) => (
                            <Box
                                key={index}
                                onClick={() => setTab(index as SummarizationTab)}
                                sx={{
                                    padding: '7px 18px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    fontWeight: tab === index ? 'bold' : 'normal',
                                    color: '#000',
                                    backgroundColor: tab === index ? '#A8C7B3' : '#C8C8C8',
                                    borderRadius: '10px',
                                    border: '1px solid #000',
                                    transition: 'all 0.2s ease',
                                    userSelect: 'none',
                                    whiteSpace: 'nowrap',
                                    '&:hover': {
                                        backgroundColor: tab === index ? '#95b9a4' : '#b8b8b8',
                                    },
                                }}
                            >
                                {label}
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ padding: '12px 16px 16px 16px' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={tab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.25 }}
                                style={{ height: '160px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                            >
                                {tab === 0 && (
                                    <Box sx={{ position: 'relative', flexGrow: 1, display: 'flex' }}>
                                        <TextField
                                            placeholder="เขียนข้อความที่คุณต้องการสรุป . . . ."
                                            multiline
                                            rows={5}
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                backgroundColor: '#DEDEDE',
                                                borderRadius: '10px',
                                                flexGrow: 1,
                                                '& fieldset': { border: 'none' },
                                                '& .MuiInputBase-root': { height: '100%', alignItems: 'flex-start' },
                                                '& .MuiInputBase-input': { fontSize: '14px', color: '#000' },
                                            }}
                                        />
                                    </Box>
                                )}

                                {tab === 1 && (
                                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', pt: 2 }}>
                                        <TextField
                                            placeholder="วางลิ้งค์ของคุณ . . ."
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                backgroundColor: '#DEDEDE',
                                                borderRadius: '12px',
                                                '& fieldset': { border: '1.5px solid #888', borderRadius: '12px' },
                                                '& .MuiInputBase-input': { fontSize: '14px', color: '#000', padding: '10px 20px' },
                                                maxWidth: '96%',
                                            }}
                                        />
                                    </Box>
                                )}

                                {tab === 2 && (
                                    <Box
                                        onClick={() => fileInputRef.current?.click()}
                                        sx={{
                                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                                            justifyContent: 'center', flexGrow: 1, height: '160px',
                                            border: '2px dashed #888', borderRadius: '10px', cursor: 'pointer', color: '#000',
                                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                                        }}
                                    >
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            hidden
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />
                                        <Typography fontSize="14px">
                                            {file ? `ไฟล์ที่เลือก: ${file.name}` : 'คลิกหรือลากไฟล์ PDF มาวางที่นี่'}
                                        </Typography>
                                        {file && (
                                            <Button
                                                size="small"
                                                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                                sx={{ mt: 1, color: '#c0392b' }}
                                            >
                                                ลบไฟล์
                                            </Button>
                                        )}
                                    </Box>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {error && (
                            <Typography sx={{ color: 'red', fontSize: '13px', mt: 1 }}>
                                เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง
                            </Typography>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '12px', gap: 1 }}>
                            <AnimatePresence>
                                {((tab === 0 && text) || (tab === 1 && url) || (tab === 2 && file)) && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                        <IconButton
                                            onClick={handleDeleteClick}
                                            sx={{ color: '#555', '&:hover': { color: '#c0392b' } }}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div
                                whileHover={!isDisableButton() && !isLoading ? { scale: 1.03 } : {}}
                                whileTap={!isDisableButton() && !isLoading ? { scale: 0.97 } : {}}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={!isDisableButton() && !isLoading ? handleSummarization : undefined}
                                    sx={{
                                        backgroundColor: '#A8C7B3',
                                        borderRadius: '20px',
                                        color: '#000',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        paddingX: '24px',
                                        paddingY: '8px',
                                        fontSize: '14px',
                                        border: '1px solid #000',
                                        boxShadow: 'none',
                                        cursor: isDisableButton() || isLoading ? 'default' : 'pointer',
                                        '&:hover': {
                                            backgroundColor: !isDisableButton() && !isLoading ? '#95b9a4' : '#A8C7B3',
                                            boxShadow: 'none',
                                        },
                                    }}
                                >
                                    {isLoading ? 'กำลังสรุป...' : 'สรุปข้อความ'}
                                </Button>
                            </motion.div>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <AnimatePresence>
                {showDeleteModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.45)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999,
                        }}
                        onClick={handleCancelDelete}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85, y: 20 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: '16px',
                                padding: '28px 32px',
                                maxWidth: '340px',
                                width: '90%',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
                                textAlign: 'center',
                            }}
                        >
                            <Typography sx={{ fontWeight: 'bold', fontSize: '17px', color: '#222', marginBottom: '10px' }}>
                                ลบข้อความทั้งหมด
                            </Typography>
                            <Typography sx={{ fontSize: '14px', color: '#444', marginBottom: '24px', lineHeight: 1.6 }}>
                                คุณกำลังจะลบข้อความต้นฉบับและข้อความสรุป
                            </Typography>
                            <Box sx={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                <Button
                                    onClick={handleCancelDelete}
                                    sx={{
                                        backgroundColor: '#E8736A',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        borderRadius: '10px',
                                        paddingX: '24px',
                                        paddingY: '8px',
                                        textTransform: 'none',
                                        boxShadow: 'none',
                                        '&:hover': { backgroundColor: '#d45f56', boxShadow: 'none' },
                                    }}
                                >
                                    ยกเลิก
                                </Button>
                                <Button
                                    onClick={handleConfirmDelete}
                                    sx={{
                                        backgroundColor: '#A8C7B3',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        borderRadius: '10px',
                                        paddingX: '24px',
                                        paddingY: '8px',
                                        textTransform: 'none',
                                        boxShadow: 'none',
                                        '&:hover': { backgroundColor: '#8fb39e', boxShadow: 'none' },
                                    }}
                                >
                                    ยืนยัน
                                </Button>
                            </Box>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default InputCard;