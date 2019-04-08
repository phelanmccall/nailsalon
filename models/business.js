module.exports = (sequelize, Datatypes) => {

    const Business = sequelize.define(
      "Business",
      {
        address: Datatypes.STRING,
        phone: Datatypes.STRING,
        button1: Datatypes.STRING,
        button2: Datatypes.STRING,
        button3: Datatypes.STRING,
        api: Datatypes.STRING,
        authId: Datatypes.STRING   
      }
      
    );
 
  
    return Business;
  };
  