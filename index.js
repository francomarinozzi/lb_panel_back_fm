const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const { connectDB } = require('./config/db');
const router = require('./routes');

// Agregamos la URL de ngrok a la whitelist
const whitelist = [
  'https://tu-proyecto.netlify.app', 
  'http://localhost:5173', 
  'https://luetta-protonemal-scarcely.ngrok-free.dev',
  '*' // <--- Agregada
];

app.use(express.json());

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origen (como Postman) o que estén en la whitelist
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("Origen bloqueado por CORS:", origin);
      callback(new Error('Bloqueado por CORS'));
    }
  }
}));

app.use(router);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.error('💀 ERROR CRÍTICO: No se pudo conectar a la DB');
    console.error(error);
    process.exit(1); 
  }
};

startServer();

module.exports = app;