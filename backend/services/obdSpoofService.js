const EventEmitter = require('events');
const OBD = require('../models/OBD');

class OBDSpoofService extends EventEmitter {
  constructor() {
    super();
    this.isConnected = false;
    this.obdData = null;
    this.intervalId = null;
  }

  connect() {
    if (this.isConnected) return;

    this.isConnected = true;
    this.intervalId = setInterval(() => {
      this.obdData = this.generateOBDData();
      this.emit('dataReceived', this.obdData);
    }, 1000);
    console.log('OBD-II Spoof Connected');
  }

  disconnect() {
    if (!this.isConnected) return;

    clearInterval(this.intervalId);
    this.isConnected = false;
    this.obdData = null;
    console.log('OBD-II Spoof Disconnected');
  }

  getStatus() {
    return this.isConnected;
  }

  getCurrentData() {
    return this.obdData;
  }

  async saveSnapshot(vehicleId, data) {
    return OBD.create({
      data,
      vehicle_id: vehicleId,
    });
  }

  generateOBDData() {
    return {
      rpm: Math.floor(Math.random() * 6000) + 800, // Random RPM between 800 and 6800
      speed: Math.floor(Math.random() * 120), // Random speed between 0 and 120 mph
      coolantTemp: Math.floor(Math.random() * 100) + 70, // Random coolant temp between 70 and 170 °F
    };
  }
}

module.exports = new OBDSpoofService();
