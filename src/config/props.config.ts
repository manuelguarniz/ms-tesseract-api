import dotenv from "dotenv";

dotenv.config();

export const PROPS: {
  PORT?: number;
  NODE_ENV?: string;
} = { ...process.env };
