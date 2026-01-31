import express from "express";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import { createContext } from "./context";

// 🔹 IMPORTANT: ensure seed runs on startup
import "./seed/seed";

const PORT = Number(process.env.PORT) || 4000;

console.log("DATABASE_URL =", process.env.DATABASE_URL);

async function startServer() {
  const app = express();

  const yoga = createYoga({
    schema,
    graphqlEndpoint: "/graphql",
    context: createContext,
  });

  app.use("/graphql", yoga);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("❌ Failed to start server", err);
  process.exit(1);
});
