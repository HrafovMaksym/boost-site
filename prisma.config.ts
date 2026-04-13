import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "src/shared/lib/prisma/schema.prisma",
  migrations: {
    path: "src/shared/lib/prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
