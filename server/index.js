// 1. setting the liberaries here
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

// 4. importing the CONTROLLERS here
const clientRoutes = require("./routes/client");
const generalRoutes = require("./routes/general");
const managementRoutes = require("./routes/management");
const salesRoutes = require("./routes/sales");
const connectDB = require("./config/mongoose");

// importing the data
const User = require("./models/User");
const Product = require("./models/Product");
const ProductStat = require("./models/ProductStat");
const OverallStat = require("./models/OverallStat");
const AffiliateStat = require("./models/AffiliateStat");
const Transaction = require("./models/Transaction");

const {
   dataUser,
   dataProduct,
   dataProductStat,
   dataTransaction,
   dataOverallStat,
   dataAffiliateStat,
} = require("./data/index");

// 2. Configuration is here
dotenv.config();

// connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 3. Routes is here
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP and Server setUp*/
const PORT = process.env.PORT || 9000;

mongoose.set("strictQuery", false);
mongoose
   .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log("\n\n\t\t\t\t Mongoose Connection Established Hua hai");
   })
   .then(() => {
      app.listen(PORT, () =>
         console.log(`\n\n\t\t\t\t SERVER IS RUNNING on Port: ${PORT}`)
      );
      /* ONLY ADD DATA ONE TIME */
      // User.insertMany(dataUser);
      // Product.insertMany(dataProduct);
      // ProductStat.insertMany(dataProductStat);

      // AffiliateStat.insertMany(dataAffiliateStat);
      // OverallStat.insertMany(dataOverallStat);
      // Transaction.insertMany(dataTransaction);
   })
   .catch((error) => console.log(`${error} did not connect`));

// app.listen(8000, () => {
//     console.log("\n\n\t\t\t\tSERVER IS RUNNING!");
//  });
