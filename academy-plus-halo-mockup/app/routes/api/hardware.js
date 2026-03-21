//? Handles API routes to the hardware information that is running the HALO - System
const express = require('express');
const router = express.Router();

const hardware = require('../../controllers/api/hardware');

router.get('/', hardware.getHardwareInfo); // Handles requests for static hardware information
router.get('/load', hardware.load); // Handles requests for dynamic system load information

module.exports = router;