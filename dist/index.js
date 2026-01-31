"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const graphql_yoga_1 = require("graphql-yoga");
const schema_1 = require("./schema");
const context_1 = require("./context");
// 🔹 IMPORTANT: ensure seed runs on startup
require("./seed/seed");
const PORT = Number(process.env.PORT) || 4000;
console.log("DATABASE_URL =", process.env.DATABASE_URL);
async function startServer() {
    const app = (0, express_1.default)();
    const yoga = (0, graphql_yoga_1.createYoga)({
        schema: schema_1.schema,
        graphqlEndpoint: "/graphql",
        context: context_1.createContext,
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
