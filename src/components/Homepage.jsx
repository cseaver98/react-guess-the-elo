import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Homepage = () => {
    return (
        <div>
            <h1 style={{ margin: 'auto', width: '50%', padding: '50px' }}>Welcome!</h1>
            <Link to="/play">
                <Button variant="contained">Play!</Button>
            </Link>
        </div>

    );
}

export default Homepage;