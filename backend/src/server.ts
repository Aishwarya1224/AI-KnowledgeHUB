// import express, { NextFunction, Request, Response } from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import healthRoutes from "./routes/health.routes";
// import documentRoutes from "./routes/documents.routes";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// app.use(cors());
// app.use(express.json());

// app.use("/api/health", healthRoutes);
// app.use("/api/documents", documentRoutes);

// app.use(
//   (error: Error, _req: Request, res: Response, _next: NextFunction) => {
//     console.error("Global server error:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// );

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRoutes from "./routes/health.routes";
import documentRoutes from "./routes/documents.routes";
import askRoutes from "./routes/ask.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/ask", askRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});