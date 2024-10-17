"use strict";

import { CorsOptions } from "cors";
import "dotenv/config";

export const corsOption: CorsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

export const SECRET_KEY = process.env.SECRET_KEY || "rahasia";
