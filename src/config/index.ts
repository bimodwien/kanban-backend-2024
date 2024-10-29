"use strict";

import { CorsOptions } from "cors";
import "dotenv/config";

export const corsOption: CorsOptions = {
  origin: "https://kanban-bimo.vercel.app",
  credentials: true,
};

export const SECRET_KEY = process.env.SECRET_KEY || "rahasia";
