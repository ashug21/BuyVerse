// import { createClient } from "redis";

// const redis = createClient({
//   url: process.env.REDIS_URL || "redis://localhost:6379"
// });

// redis.on("error", err => console.error("Redis error", err));

// if (!redis.isOpen) {
//   await redis.connect();
// }

// export default redis;


import { createClient } from "redis";

let redis;

if (!global.redis) {
  const client = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
  });

  client.on("error", (err) => console.error("Redis error", err));

  global.redis = client;
}

redis = global.redis;

if (!redis.isOpen) {
  await redis.connect();
}

export default redis;
