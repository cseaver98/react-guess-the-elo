import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/">
                        <Button variant="outlined" style={{ color: 'white' }}>guess the elo</Button>
                    </Link>
                    <Link to="/about">
                        <Button variant="outlined" style={{ color: 'white' }}>about</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box >
    );
}