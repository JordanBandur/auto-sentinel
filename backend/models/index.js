const sequelize = require('../config/database');
const User = require('./User');
const Vehicle = require('./Vehicle');
const MaintenanceTask = require('./MaintenanceTask');
const Notification = require('./Notification');
const OBD = require('./OBD');
const ServiceReminder = require('./ServiceReminder');
const DTC = require('./DTC');

// Associations
User.hasMany(Vehicle, { foreignKey: 'user_id' });
Vehicle.belongsTo(User, { foreignKey: 'user_id' });

Vehicle.hasMany(MaintenanceTask, { foreignKey: 'vehicle_id' });
MaintenanceTask.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });

User.hasMany(Notification, { foreignKey: 'user_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

Vehicle.hasMany(OBD, { foreignKey: 'vehicle_id', onDelete: 'CASCADE' });
OBD.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });

Vehicle.hasMany(ServiceReminder, { foreignKey: 'vehicle_id' });
ServiceReminder.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });

module.exports = {
  sequelize,
  User,
  Vehicle,
  MaintenanceTask,
  Notification,
  OBD,
  ServiceReminder,
  DTC,
};
