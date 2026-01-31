import express from "express";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";

const PORT = process.env.PORT || 4000;

const app = express();

const yoga = createYoga({
  schema,
});

app.use("/graphql", yoga);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
