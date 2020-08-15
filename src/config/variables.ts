import dotenv from "dotenv";

dotenv.config();

type NodeEnv = "development" | "testing" | "production";
const nodeEnv = process.env.NODE_ENV as NodeEnv;

export const env = {
  port: process.env.PORT,
  nodeEnv,
  database: {
    url: process.env.DB_URL as string,
  },
};
