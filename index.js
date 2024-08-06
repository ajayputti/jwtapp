const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Your client ID and client secret
const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';

// Function to generate a JWT token
function generateToken() {
    const payload = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    };

    // Generate JWT token with a secret
    const token = jwt.sign(payload, CLIENT_SECRET, { expiresIn: '1h' });

    return token;
}

// Function to get token from the generating URL
async function getTokenFromUrl(token) {
    const url = 'https://example.com/generate-token'; // Replace with your token generation URL

    try {
        const response = await axios.post(url, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data.token;
    } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
}

// Endpoint to get the JWT token
app.get('/get-token', async (req, res) => {
    try {
        const jwtToken = generateToken();
        const token = await getTokenFromUrl(jwtToken);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get token' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
