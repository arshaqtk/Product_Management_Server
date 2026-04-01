import "./config/env";
import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

const PORT = env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
 
startServer(); 