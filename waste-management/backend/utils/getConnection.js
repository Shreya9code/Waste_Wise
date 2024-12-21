const mongoose = require("mongoose");

const getConnection = () => {
    try {
      mongoose
        .connect(process.env.MONGO_URI)
        .then((connection) => {
          console.log("DB is connected");
        })
        .catch((error) => {
          console.log("Failed to connect to DB");
        });
    } catch (error) {
      console.log(error);
    }
  };

  module.exports=getConnection;