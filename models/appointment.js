module.exports = (sequelize, Datatypes) => {

  const Appointment = sequelize.define(
    "Appointment",
    {
      date: Datatypes.STRING,
      timeslot: Datatypes.STRING,
      name: Datatypes.STRING,
      phone: Datatypes.STRING
    }
    
  );
  //   Appointment.associate = models => {
  //     models.Appointment.hasOne(models.Auth);
  //   };


  return Appointment;
};
