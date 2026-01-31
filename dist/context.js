"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = createContext;
const prisma_1 = require("./prisma");
function createContext({ request }) {
    const roleHeader = request.headers.get("x-role");
    const role = roleHeader === "ADMIN" || roleHeader === "EMPLOYEE"
        ? roleHeader
        : "EMPLOYEE"; // safe default
    return {
        prisma: prisma_1.prisma,
        role,
    };
}
