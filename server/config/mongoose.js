const mongoose = require("mongoose");

const connectDB = async () => {
   try {
      mongoose.set("strictQuery", false); // just solved mongoose warning here
      const conn = await mongoose.connect(process.env.MONGO_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log("\n\t\t\t\tMongoDB Connection Established");
   } catch (error) {
      console.log(error);
      process.exit(1);
   }
};
module.exports = connectDB;
