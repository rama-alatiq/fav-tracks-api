import { DataTypes } from "sequelize";

const trackModel = (sequelize) => {
  const Track = sequelize.define("Track", {
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        singer:{
            type:DataTypes.STRING,
            allowNull:false
        },
        genre:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });
    return Track;
}

export default trackModel;