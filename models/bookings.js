module.exports = (sequelize, Datatypes) => {

    const Bookings = sequelize.define(
      "Bookings",
      {
        date: Datatypes.DATEONLY,
        time: Datatypes.TIME,
        booked: {
          type: Datatypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        createdAt: {
          type: Datatypes.DATE,
          defaultValue: Datatypes.NOW
        },
        updatedAt: {
          type: Datatypes.DATE,
          defaultValue: Datatypes.NOW
        }
      }
      
      
      
    );
    //   Bookings.associate = models => {
    //     models.Bookings.hasOne(models.Auth);
    //   };
  
  
    return Bookings;
  };
  