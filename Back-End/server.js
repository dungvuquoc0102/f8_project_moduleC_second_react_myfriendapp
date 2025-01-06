import express, { urlencoded } from "express";
import cors from "cors";
import APIrouter from "./src/routes/api.js";
import connection from "./src/config/database.js";

const app = express();

//middleware
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(APIrouter);

// Start the server
(async () => {
  try {
    await connection();
    app.listen(3000, () => {
      console.log("dvq: Server state: running on http://localhost:3000");
    });
  } catch (error) {
    console.log("dvq: " + error);
  }
})();
