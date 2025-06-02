require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const app = express();
app.use(cors());
app.use(express.json());
// 👇 This fixes the "Cannot GET /" issue
app.get('/', (req, res) => {
  res.send('API is running ✅');
});
app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
