const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const analyzeWebsite = require('../services/analyzer');

router.post('/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    
    const performanceData = await analyzeWebsite(url);
    
    const report = new Report(performanceData);
    await report.save();

    res.json(report);
  } catch (error) {
    console.error('Error analyzing website:', error);
    res.status(500).json({ error: 'An error occurred while analyzing the website' });
  }
});

module.exports = router;