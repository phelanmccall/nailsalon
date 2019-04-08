module.exports = (sequelize, Datatypes) => {

    const Business = sequelize.define(
      "Business",
      {
<<<<<<< HEAD
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

  
=======
        address: Datatypes.STRING,
        phone: Datatypes.STRING,
        button1: Datatypes.STRING,
        button2: Datatypes.STRING,
        button3: Datatypes.STRING,
        api: Datatypes.STRING,
        authId: Datatypes.STRING   
      }
      
    );
 
>>>>>>> 4d1567c56fd929cca6d8bce901e938a9a3fa34bf
  
    return Business;
  };
  