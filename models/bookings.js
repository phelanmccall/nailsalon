module.exports = (sequelize, Datatypes) => {

    const Bookings = sequelize.define(
      "Bookings",
      {
        date: Datatypes.STRING,
        time: Datatypes.STRING,
        booked: {
          type: Datatypes.BOOLEAN,
          default: false
        },
      },
      {
        timestamps: true
      }
      
      
    );
    //   Bookings.associate = models => {
    //     models.Bookings.hasOne(models.Auth);
    //   };
  
  
    return Bookings;
  };
  