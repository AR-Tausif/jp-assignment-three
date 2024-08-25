import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    // await mongoose.connect(config.local_database_url as string);

    app.listen(config.port, () => {
      console.log(
        `Meeting-room-booking-system server is running on port http://localhost:${config.port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}
main();
