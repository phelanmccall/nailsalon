module.exports = (sequelize, Datatypes) => {

    const Services = sequelize.define(
      "Services",
      {
        service: Datatypes.STRING,
        price: Datatypes.STRING,
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

  
  
    return Services;
  };
  