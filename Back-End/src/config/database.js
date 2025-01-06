import mongoose from "mongoose";

const connection = async () => {
  await mongoose.connect("mongodb://localhost:27017", {
    user: "root",
    pass: "123456",
    dbName: "MFAdb",
  });
  console.log("dvq: Connect db state: " + mongoose.connection.readyState);
};

export default connection;
