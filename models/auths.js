module.exports = function(sequelize, Datatypes) {
  var Auths = sequelize.define("Auths", {
    firstName: {
      type: Datatypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 240]
      }
    },

    lastName: {
      type: Datatypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 240]
      }
    },

    email: {
      type: Datatypes.STRING,
      validate: {
        isEmail: true
      }
    },
    
    authMode: {
      type: Datatypes.STRING,
      allowNull: true
    },
    authModeID: {
      type: Datatypes.STRING,
      allowNull: true
    },

    password: {
      type: Datatypes.STRING,
      validate: {
        isAlphanumeric: true
      }
    },
    createdAt: {
      type: Datatypes.DATE,
      defaultValue: Datatypes.NOW
    },
    updatedAt: {
      type: Datatypes.DATE,
      defaultValue: Datatypes.NOW
    }
    // }
    // hooks: {
    //   beforeCreate: auths => {
    //     auths.full_name = `${auths.first} ${auths.last}`;
    //   }
    // }
  });
  Auths.associate = model => {
    model.Auths.belongsToMany(model.Appointment, {
      as: "HasAppointment",
      through: "UserAppointment"
    });
    // Foreign key of authId will be made in Favorite table
    model.Auths.hasOne(model.Appointment);
  };

  return Auths;
};
