const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/deces', async (req, res) => {
    try {
        const response = await axios.get('https://api-v2.franceconnect.gouv.fr/v2/deceased?departement=35');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des données de décès.' });
    }
});

module.exports = router;
