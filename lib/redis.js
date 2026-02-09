// This one is for railway setup

// import { createClient } from "redis";

// let redis;

// if (!global.redis) {
//   const client = createClient({
//     url: process.env.REDIS_URL || "redis://localhost:6379",
//   });

//   client.on("error", (err) => console.error("Redis error", err));

//   global.redis = client;
// }

// redis = global.redis;

// if (!redis.isOpen) {
//   await redis.connect();
// }

// export default redis;


import { Redis } from "@upstash/redis";

if (!process.env.UPSTASH_REDIS_REST_URL) {
  throw new Error("UPSTASH_REDIS_REST_URL is missing");
}

if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error("UPSTASH_REDIS_REST_TOKEN is missing");
}

let redis;

if (!global.upstashRedis) {
  try {
    global.upstashRedis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } catch (error) {
    console.error("Failed to initialize Upstash Redis:", error);
    throw error;
  }
}

redis = global.upstashRedis;

export default redis;
