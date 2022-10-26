import { Router } from "express";
import { obtenerTodosLosServicios, crearServicio, obtenerServicioPorID, actualizarServicio, eliminarServicio, filtrarPorParametros } from "../controllers/serviciosController.js";


const router = Router();


// CRUD
router.route('/').get(obtenerTodosLosServicios).post(crearServicio);

//Filtrar por parametros
router.get('/filtrar', filtrarPorParametros)

// Obtener por id - Actualizar - Eliminar
router.route('/:id').get(obtenerServicioPorID).patch(actualizarServicio).delete(eliminarServicio);







export default router;

