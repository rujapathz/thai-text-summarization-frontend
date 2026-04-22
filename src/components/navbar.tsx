import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#DEDEDE', boxShadow: 'none' }}>
            <Toolbar>
                <Box component="img" src="/lizard.svg" sx={{ width: 40, height: 40, marginRight: '10px' }} />
                <Typography variant="h6" sx={{ color: '#333' }}>
                    Thai Lizard
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;