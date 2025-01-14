const mongoose = require("mongoose");
const dotenv = require("dotenv");

async function main() {
  const envFile =
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : process.env.NODE_ENV === "test"
        ? ".env.test"
        : ".env.development";

  dotenv.config({ path: envFile });

  const dbenv = process.env.MONGODB_ACCESS;

  await mongoose

    .connect(dbenv)
    .then(() => {
      console.log("Connected to MongoDB");
    })

    .catch((error) => {
      console.error("Connection error:", error);
    });
}

console.log("Mode:", process.env.NODE_ENV);

main().catch((err) => console.log(err));
