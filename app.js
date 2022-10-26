import express from 'express'
import cors from 'cors'
import { conectarDB } from './config/db.js';
import serviciosRoutes from './routes/serviciosRoutes.js';

const app = express();
const PORT = 4000;

const dominiosPermitidos = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            // El origen del request esta permitido
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'))
        } 
    }
}
app.use(cors(corsOptions))


// Leer query params
app.use(express.urlencoded({ extended: true }))

conectarDB();


app.use(express.json());

// Utilizar la ruta /api/...
app.use('/api', serviciosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puero http://localhost:${PORT}`)
})