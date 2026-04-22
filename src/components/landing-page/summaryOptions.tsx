import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { SummaryLength, SummaryOptionsProps } from '../../services/types/summarizeType';

const SummaryOptions: React.FC<SummaryOptionsProps> = ({ lineLimit, setLineLimit }) => {
    return (
        <motion.div
            style={{ width: '100%', maxWidth: '620px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <FormControl sx={{ marginTop: '16px', width: '100%' }}>
                <RadioGroup row value={lineLimit} onChange={(e) => setLineLimit(e.target.value as SummaryLength)}>
                    <FormControlLabel
                        value="keyword"
                        control={<Radio sx={{ color: '#000', '&.Mui-checked': { color: '#000' } }} />}
                        label={<Typography sx={{ color: '#000', fontSize: '14px' }}>คำโปรย</Typography>}
                    />
                    <FormControlLabel
                        value="3"
                        control={<Radio sx={{ color: '#000', '&.Mui-checked': { color: '#000' } }} />}
                        label={<Typography sx={{ color: '#000', fontSize: '14px' }}>สรุปสั้น (ไม่เกิน 3 บรรทัด)</Typography>}
                    />
                    <FormControlLabel
                        value="8"
                        control={<Radio sx={{ color: '#000', '&.Mui-checked': { color: '#000' } }} />}
                        label={<Typography sx={{ color: '#000', fontSize: '14px' }}>สรุปปกติ (ไม่เกิน 8 บรรทัด)</Typography>}
                    />
                </RadioGroup>
            </FormControl>
        </motion.div>
    );
};

export default SummaryOptions;
