module.exports = (sequelize, Datatypes) => {

    const Bookings = sequelize.define(
      "Bookings",
      {
        date: Datatypes.STRING,
        time: Datatypes.STRING,
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
  