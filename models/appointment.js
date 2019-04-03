module.exports = (sequelize, Datatypes) => {

  const Appointment = sequelize.define(
    "Appointment",
    {
      date: Datatypes.STRING,
      time: Datatypes.STRING,
      name: Datatypes.STRING,
      phone: Datatypes.STRING,
      booked: {
        type: Datatypes.BOOLEAN,
        default: false
      }
    }
    
  );
  //   Appointment.associate = models => {
  //     models.Appointment.hasOne(models.Auth);
  //   };


  return Appointment;
};
