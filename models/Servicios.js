import Sequelize, {DataTypes} from "sequelize";
import db from "../config/db.js";


export const Servicio = db.define('servicios', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING,
    },
    ciudad: {
        type: Sequelize.STRING
    },
    zona: {
        type: Sequelize.STRING
    },
    codigo: {
        type: Sequelize.INTEGER
    },
    geocerca: {
        type: Sequelize.JSON
    }

})

await Servicio.sync();