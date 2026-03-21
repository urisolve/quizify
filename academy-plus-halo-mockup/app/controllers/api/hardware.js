//? Handles communication with the hardware that is running the HALO - System

//* Modules required
const dotenv = require('dotenv');
const si = require('systeminformation');
const fetch = require('node-fetch');

//* Environmental variables
dotenv.config();
const gpuApiUrl = process.env.GPU_API_URL; //TODO: What is the GPU API URL?
const gpuApiPort = process.env.GPU_API_PORT; //TODO: What is the GPU API Port?

//* Variables
const gpuApi = `${gpuApiUrl}:${gpuApiPort}/gpu`;
let gpuInfo = null; // Variable to store GPU information
let cpuInfo = null; // Variable to store CPU information
let memoryInfo = null; // Variable to store Memory information
let cpuLoad = null; // Variable to store CPU load information
let gpuLoad = null; // Variable to store GPU load information

//* Function to fetch CPU, GPU and Memory information
async function fetchHardwareInfo() {
    try {
        // Fetch CPU information
        cpuInfo = await si.cpu();
        cpuLoad = await si.currentLoad();

        // Fetch GPU information
        //TODO: Replace with actual API call to fetch GPU information
        // const gpuResponse = await fetch(gpuApi);
        // gpuInfo = await gpuResponse.json();
        //TODO: -----------------------------------------------------
        //! --- Mock data for GPU information ---
        gpuInfo = [
            {
                name: "NVIDIA GeForce RTX 3080",
                memory_total: 1073741824 * 10, // 10 GB in bytes
                utilization: 75 // 75% utilization
            }
        ];
        //! ----------------------------------------
        gpuLoad = gpuInfo[0]; // Assuming single GPU for simplicity

        // Fetch Memory information
        memoryInfo = await si.mem();

    } catch (error) {
        console.error('Failed to fetch hardware information:', error);
        throw error;
    }
}

exports.getHardwareInfo = async (req, res) => {
  try {
    if (!cpuInfo || !gpuInfo || !memoryInfo) {
        await fetchHardwareInfo();
    }

    const hardwareInfo = {
      cpu: {
        manufacturer: cpuInfo.manufacturer,
        brand: cpuInfo.brand,
        speed: cpuInfo.speed,
        cores: cpuInfo.cores,
        physicalCores: cpuInfo.physicalCores,
        processors: cpuInfo.processors
      },
      gpu: gpuInfo.map(g => ({
        model: g.name,
        vram: (g.memory_total / 1073741824).toFixed(2) // Convert bytes to GB
      })),
      memory: {
        total: memoryInfo.total,
        free: memoryInfo.available
      }
    };

    res.json(hardwareInfo);
  } catch (error) {
    console.error('Failed to retrieve hardware information:', error);
    res.status(500).send('Failed to retrieve hardware information');
  }
}

exports.load = async (req, res) => {
    try {
        if (!cpuLoad || !gpuLoad || !memoryInfo) {
            await fetchHardwareInfo();
        }
    
        const systemLoad = {
            cpuLoad: cpuLoad.currentLoad || 0,
            gpuLoad: gpuLoad.utilization || 0,
            memoryUsage: ((memoryInfo.total - memoryInfo.available) / memoryInfo.total) * 100 || 0
        };
    
        res.json(systemLoad);
    } catch (error) {
        console.error('Failed to retrieve system load:', error);
        res.status(500).send('Failed to retrieve system load');
    }
}