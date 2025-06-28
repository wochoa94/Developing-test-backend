const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configuración Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Guardar punto (X, Y)
app.post('/puntos', async (req, res) => {
  const { x, y } = req.body;
  const { data, error } = await supabase.from('puntos').insert([{ x, y }]);
  if (error) return res.status(500).json({ error });
  res.status(201).json(data);
});

// Obtener todos los puntos
app.get('/puntos', async (req, res) => {
  const { data, error } = await supabase.from('puntos').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.listen(port, () => {
  console.log(API running on port ${port});
});
