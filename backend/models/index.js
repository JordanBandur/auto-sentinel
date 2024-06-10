const sequelize = require('../config/database');
const User = require('./User');
const Vehicle = require('./Vehicle');
const MaintenanceTask = require('./MaintenanceTask');
const Notification = require('./Notification');
const OBD = require('./OBD');
const ServiceReminder = require('./ServiceReminder');

// Associations
User.hasMany(Vehicle, { foreignKey: 'userId' });
Vehicle.belongsTo(User, { foreignKey: 'userId' });

Vehicle.hasMany(MaintenanceTask, { foreignKey: 'vehicleId' });
MaintenanceTask.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });

Vehicle.hasMany(OBD, { foreignKey: 'vehicleId' });
OBD.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

Vehicle.hasMany(ServiceReminder, { foreignKey: 'vehicleId' });
ServiceReminder.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

module.exports = {
  sequelize,
  User,
  Vehicle,
  MaintenanceTask,
  Notification,
  OBD,
  ServiceReminder,
};