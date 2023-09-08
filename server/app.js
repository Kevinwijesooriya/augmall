const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const pathRoutes = require('./routes/pathRoutes');
const sampleProductRoute = require("./routes/recommendedProductRoute");

const uri =
  "mongodb+srv://newuser123:newuser@cluster0.rj8n5m0.mongodb.net/?retryWrites=true&w=majority";
// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(cors());

app.use(express.json());
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
  
    next();
  });
  
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/path', pathRoutes);
app.use(sampleProductRoute);
// Import and use your routes here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
