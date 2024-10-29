"use strict";

import { CorsOptions } from "cors";
import "dotenv/config";

export const corsOption: CorsOptions = {
  origin: process.env.URL_CORS || "http://localhost:3000",
  credentials: true,
};

export const SECRET_KEY = process.env.SECRET_KEY || "rahasia";
