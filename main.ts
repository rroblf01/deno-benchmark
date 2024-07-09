import { Hono } from "@hono/hono";
import { default as postgres_client } from "./clients/postgres.ts";
import { default as denokv_client } from "./clients/denokv.ts";
import { default as redis_client } from "./clients/redis.ts";

const app = new Hono();

app.get("/", (c) => c.text("Hello Deno!"));

app.get("/init", async (c) => {
  // DenoKV
  await denokv_client.insert();

  // Redis
  await redis_client.insert();

  // Postgres
  await postgres_client.insert();

  return c.text("seeded");
});

app.get("/denokv", async (c) => {
  return c.json(await denokv_client.getPreferences());
});

app.get("/postgres", async (c) => {
  return c.json(await postgres_client.getPreferences());
});

app.get("/redis", async (c) => {
  return c.text(await redis_client.getPreferences());
});

Deno.serve({ port: 8787 }, app.fetch);
