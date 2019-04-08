module.exports = (sequelize, Datatypes) => {

    const Business = sequelize.define(
      "Business",
      {
        name: Datatypes.STRING,
        address: Datatypes.STRING,
        phone: Datatypes.STRING,
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

  
  
    return Business;
  };
  