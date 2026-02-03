import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // For Prisma 7, use your DIRECT connection here for migrations
    url: env("POSTGRES_URL_NON_POOLING"),
  },
});
