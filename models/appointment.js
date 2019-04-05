module.exports = (sequelize, Datatypes) => {

  const Appointment = sequelize.define(
    "Appointment",
    {
      date: Datatypes.DATEONLY,
      time: Datatypes.TIME,
      name: Datatypes.STRING,
      phone: Datatypes.STRING,
      booked: {
        type: Datatypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    }
    
  );
  //   Appointment.associate = models => {
  //     models.Appointment.hasOne(models.Auth);
  //   };


  return Appointment;
};
