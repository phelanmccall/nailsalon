module.exports = function(sequelize, DataTypes) {
  var Auths = sequelize.define("Auths", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 240]
      }
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 240]
      }
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    
    authMode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    authModeID: {
      type: DataTypes.STRING,
      allowNull: true
    },

    password: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true
      }
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
