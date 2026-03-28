const dotenv = require('dotenv');

dotenv.config();

const HALO_URL = process.env.HALO_URL || 'http://cloud.microlumin.com';
const HALO_PORT = process.env.HALO_PORT || 2020;

const HALO_HARDWARE_URL = `${HALO_URL}:${HALO_PORT}/hardware`;
const HALO_SYSTEM_LOAD_URL = `${HALO_URL}:${HALO_PORT}/hardware/load`;

exports.handleHardwareInfo = async (req, res) => {
  try {
    const response = await fetch(HALO_HARDWARE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: errorText || 'Failed to get hardware information.'
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('[systemControllerAPI] Hardware request failed:', error);
    return res.status(500).json({
      error: 'Failed to get hardware information.'
    });
  }
};

exports.handleSystemLoad = async (req, res) => {
  try {
    const response = await fetch(HALO_SYSTEM_LOAD_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: errorText || 'Failed to get system load.'
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('[systemControllerAPI] System load request failed:', error);
    return res.status(500).json({
      error: 'Failed to get system load.'
    });
  }
};