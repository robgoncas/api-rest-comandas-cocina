import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './src/config/db.js';
import auth_routes from './src/routes/auth_routes.js';
import comanda_routes from './src/routes/comanda_routes.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', auth_routes);
app.use('/api/comandas', comanda_routes);

// Ruta de prueba para verificar que la API funciona
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' });
});

// Conectar a la base de datos (sin iniciar el servidor)
const iniciar = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Base de datos conectada - ok');
  } catch (e) {
    console.error('Error de conexión a la base de datos:', e);
  }
};

// Solo ejecutar si no estamos en Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.SERVER_PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}

// Iniciar conexión a DB
iniciar();

// Exportar para Vercel
export default app;