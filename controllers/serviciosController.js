import { Op } from 'sequelize'
import { Servicio } from "../models/Servicios.js"

// Post
const crearServicio = async (req, res) => {
    const { nombre, ciudad, zona, codigo, geocerca } = req.body;
    const errores = [];

    if (nombre.trim() === '') {
        errores.push({ mensaje: 'El campo nombre está vacío' });
    }
    if (ciudad.trim() === '') {
        errores.push({ mensaje: 'El campo ciudad está vacío' });
    }
    if (zona.trim() === '') {
        errores.push({ mensaje: 'El campo zona está vacío' });
    }
    if (codigo === null) {
        errores.push({ mensaje: 'El campo codigo está vacío' });
    }
    if (geocerca === undefined || geocerca.length <= 0) {
        errores.push({ mensaje: 'El campo geocerca está vacío' });
    }

    if (errores.length > 0) {
        res.json({
            error: errores, status: 403
        })
        return;
    }

    try {
        const servicio = await Servicio.create({
            nombre, ciudad, zona, codigo, geocerca
        });


        res.json({
            data: servicio.dataValues,
            mensaje: "Añadido correctamente",
            status: 200
        })


    } catch (error) {
        res.json.json({ error, status: 400 });
        console.log(error);
    }
}

//Get
const obtenerTodosLosServicios = async (req, res) => {
    try {
        const servicios = await Servicio.findAll();
        res.json({
            data: servicios,
            status: 200
        });
    } catch (error) {
        res.json({ error, status: 404 });
        console.log(error);
    }
}


// Get One
const obtenerServicioPorID = async (req, res) => {
    const { id } = req.params;


    if (id < 0 || id === undefined) {
        res.json({
            error: "Error: El ID tiene que ser valido"
        })
        return;
    }


    try {

        const servicio = await Servicio.findByPk(id);

        if (servicio === null) {
            res.json({
                data: {},
                error: "El ID no existe, intente con otro"
            });
            return;
        }

        res.json(servicio)


    } catch (error) {
        res.json({
            error: "Error: " + error
        })
    }

}

// Actualizar (patch)

const actualizarServicio = async (req, res) => {
    const { id } = req.params;


    if (id < 0 || id === undefined) {
        res.json({
            error: "Error: El ID tiene que ser valido"
        })
        return;
    }


    try {

        const servicio = await Servicio.findByPk(id);

        if (servicio === null) {
            res.json({
                data: {},
                error: "El ID no existe, intente con otro"
            });
            return;
        }

        servicio.set({
            nombre: req.body.nombre || servicio.nombre,
            ciudad: req.body.ciudad || servicio.ciudad,
            zona: req.body.zona || servicio.zona,
            codigo: req.body.codigo || servicio.codigo,
            geocerca: req.body.geocerca || servicio.geocerca
        });

        const servicioActualizado = await servicio.save();

        res.json(servicioActualizado);

    } catch (error) {
        res.err({
            error: "Error: " + error
        })
    }
}

const eliminarServicio = async (req, res) => {
    const { id } = req.params;


    if (id < 0 || id === undefined) {
        res.json({
            error: "Error: El ID tiene que ser valido"
        })
        return;
    }

    try {
        const cuenta = await Servicio.destroy({ where: { id: id } });
        console.log(cuenta)

        if (cuenta <= 0) {
            res.json({
                mensaje: 'El registro no existe',
                status: 404
            })
            return;
        }

        res.json({
            mensaje: 'Registro elminado con exito',
            status: 200
        });

    } catch (error) {
        res.json({
            error: 'Error: ' + error
        });
    }

}

const filtrarPorParametros = async (req, res) => {
    const nombre = req.query.nombre;

    try {
        const servicios = await Servicio.findAll({
            where: {
                nombre: {
                    [Op.like]: `%${nombre}%`
                }
            }
        });

        if (servicios.length <= 0) {
            res.json({ error: "No se encontraron resultados" })
            return;
        }

        res.json({
            data: servicios,
            status: 200
        });

    } catch (error) {
        res.json({ error: error })
        console.log(error)
    }



}


export {
    obtenerTodosLosServicios,
    crearServicio,
    obtenerServicioPorID,
    actualizarServicio,
    eliminarServicio,
    filtrarPorParametros
}