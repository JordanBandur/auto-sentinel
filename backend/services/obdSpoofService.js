const EventEmitter = require('events');
const OBD = require('../models/OBD');

class OBDSpoofService extends EventEmitter {
  constructor() {
    super();
    this.isConnected = false;
    this.obdData = this.initializeOBDData();
    this.intervalId = null;
  }

  initializeOBDData() {
    return {
      rpm: 1500,
      speed: 0,
      fuelLevel: 75,
      throttlePosition: 10,
      intakeAirTemperature: 25,
      coolantTemp: 90,
      batteryVoltage: 13.5,
      engineLoad: 20,
      fuelPressure: 35,
      shortTermFuelTrim: 0,
      longTermFuelTrim: 0,
      massAirFlowRate: 10,
      o2SensorVoltage: 0.5,
      timingAdvance: 10,
      manifoldAbsolutePressure: 100,
      absoluteThrottlePosition: 10,
      controlModuleVoltage: 13.5,
      fuelRailPressure: 35,
      egrCommanded: 0,
      egrError: 0,
      evaporativePurge: 0,
      warmupsSinceDtcCleared: 0,
      distanceTraveledSinceDtcCleared: 0,
      ambientAirTemperature: 25,
      engineOilTemperature: 90,
      fuelInjectionTiming: 0,
      engineFuelRate: 1.0
    };
  }

  connect() {
    if (this.isConnected) return;

    this.isConnected = true;
    this.intervalId = setInterval(() => {
      this.updateOBDData();
      this.emit('dataReceived', this.obdData);
    }, 1000);
    console.log('OBD-II Spoof Connected');
  }

  disconnect() {
    if (!this.isConnected) return;

    clearInterval(this.intervalId);
    this.isConnected = false;
    this.obdData = this.initializeOBDData();
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

  updateOBDData() {
    this.obdData.rpm = parseFloat(this.getNextValue(this.obdData.rpm, 600, 100, 800, 6800).toFixed(0));
    this.obdData.speed = parseFloat(this.getNextValue(this.obdData.speed, 5, 5, 0, 120).toFixed(0));
    this.obdData.fuelLevel = parseFloat(this.getNextValue(this.obdData.fuelLevel, 0.1, 0.1, 0, 100).toFixed(1));
    this.obdData.throttlePosition = parseFloat(this.getNextValue(this.obdData.throttlePosition, 2, 1, 0, 100).toFixed(1));
    this.obdData.intakeAirTemperature = parseFloat(this.getNextValue(this.obdData.intakeAirTemperature, 1, 0.5, -40, 125).toFixed(1));
    this.obdData.coolantTemp = parseFloat(this.getNextValue(this.obdData.coolantTemp, 1, 0.5, -40, 135).toFixed(1));
    this.obdData.batteryVoltage = parseFloat(this.getNextValue(this.obdData.batteryVoltage, 0.1, 0.05, 11, 15).toFixed(2));
    this.obdData.engineLoad = parseFloat(this.getNextValue(this.obdData.engineLoad, 2, 1, 0, 100).toFixed(1));
    this.obdData.fuelPressure = parseFloat(this.getNextValue(this.obdData.fuelPressure, 1, 0.5, 30, 100).toFixed(1));
    this.obdData.shortTermFuelTrim = parseFloat(this.getNextValue(this.obdData.shortTermFuelTrim, 1, 0.5, -20, 20).toFixed(2));
    this.obdData.longTermFuelTrim = parseFloat(this.getNextValue(this.obdData.longTermFuelTrim, 1, 0.5, -20, 20).toFixed(2));
    this.obdData.massAirFlowRate = parseFloat(this.getNextValue(this.obdData.massAirFlowRate, 1, 0.5, 0, 255).toFixed(2));
    this.obdData.o2SensorVoltage = parseFloat(this.getNextValue(this.obdData.o2SensorVoltage, 0.1, 0.05, 0, 1.275).toFixed(2));
    this.obdData.timingAdvance = parseFloat(this.getNextValue(this.obdData.timingAdvance, 1, 0.5, -10, 40).toFixed(2));
    this.obdData.manifoldAbsolutePressure = parseFloat(this.getNextValue(this.obdData.manifoldAbsolutePressure, 5, 2, 10, 250).toFixed(1));
    this.obdData.absoluteThrottlePosition = parseFloat(this.getNextValue(this.obdData.absoluteThrottlePosition, 2, 1, 0, 100).toFixed(1));
    this.obdData.controlModuleVoltage = parseFloat(this.getNextValue(this.obdData.controlModuleVoltage, 0.1, 0.05, 11, 15).toFixed(2));
    this.obdData.fuelRailPressure = parseFloat(this.getNextValue(this.obdData.fuelRailPressure, 1, 0.5, 30, 100).toFixed(1));
    this.obdData.egrCommanded = parseFloat(this.getNextValue(this.obdData.egrCommanded, 2, 1, 0, 100).toFixed(1));
    this.obdData.egrError = parseFloat(this.getNextValue(this.obdData.egrError, 1, 0.5, -100, 100).toFixed(2));
    this.obdData.evaporativePurge = parseFloat(this.getNextValue(this.obdData.evaporativePurge, 2, 1, 0, 100).toFixed(1));
    this.obdData.warmupsSinceDtcCleared = parseFloat(this.getNextValue(this.obdData.warmupsSinceDtcCleared, 1, 0.5, 0, 255).toFixed(0));
    this.obdData.distanceTraveledSinceDtcCleared = parseFloat(this.getNextValue(this.obdData.distanceTraveledSinceDtcCleared, 50, 20, 0, 65535).toFixed(0));
    this.obdData.ambientAirTemperature = parseFloat(this.getNextValue(this.obdData.ambientAirTemperature, 1, 0.5, -40, 50).toFixed(1));
    this.obdData.engineOilTemperature = parseFloat(this.getNextValue(this.obdData.engineOilTemperature, 1, 0.5, -40, 150).toFixed(1));
    this.obdData.fuelInjectionTiming = parseFloat(this.getNextValue(this.obdData.fuelInjectionTiming, 5, 2, -360, 360).toFixed(2));
    this.obdData.engineFuelRate = parseFloat(this.getNextValue(this.obdData.engineFuelRate, 0.5, 0.2, 0, 30).toFixed(2));
  }

  getNextValue(currentValue, maxChange, minChange, minValue, maxValue) {
    const change = Math.random() * (maxChange - minChange) + minChange;
    const direction = Math.random() > 0.5 ? 1 : -1;
    let newValue = currentValue + change * direction;
    if (newValue < minValue) newValue = minValue;
    if (newValue > maxValue) newValue = maxValue;
    return parseFloat(newValue);
  }

  // Performance spoofing
  generateAccelerationData() {
    const accelerationData = [];
    let speed = 0;
    let time = 0;
    const interval = 0.1; // Time interval in seconds

    while (speed < 60) {
      speed += Math.random() * 3; // Random acceleration
      time += interval;
      accelerationData.push({ time: time.toFixed(1), speed: speed.toFixed(1) });
    }

    return accelerationData;
  }

  generateQuarterMileData() {
    const quarterMileData = [];
    let speed = 0;
    let time = 0;
    let distance = 0;
    const interval = 0.1; // Time interval in seconds
    const quarterMile = 402.336; // meters

    while (distance < quarterMile) {
      speed += Math.random() * 3;
      distance += (speed * interval) / 3.6; // Convert speed to m/s and multiply by interval
      time += interval;
      quarterMileData.push({ time: time.toFixed(1), speed: speed.toFixed(1), distance: distance.toFixed(1) });
    }

    return quarterMileData;
  }

  generateBrakingData() {
    const brakingData = [];
    let speed = 100; // Assume starting speed
    let time = 0;
    const interval = 0.1; // time interval in seconds
    let distance = 0;

    while (speed > 0) {
      speed -= Math.random() * 5; // Random deceleration
      if (speed < 0) speed = 0;
      distance += (speed * interval) / 3.6; // Convert speed to m/s and multiply by interval
      time += interval;
      brakingData.push({ time: time.toFixed(1), speed: speed.toFixed(1), distance: distance.toFixed(1) });
    }

    return brakingData;
  }
}

// Ensure initial state is disconnected
const obdSpoofService = new OBDSpoofService();
obdSpoofService.disconnect();

module.exports = obdSpoofService;

