import { createClient } from "redis";

const client = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
});

client.on("error", (err) => {
    console.error("Redis Client Error", err)
})

const connectRedisClient = async() => {
    if (client.isOpen) {
        console.log("Redis client is already connected");
        return client;
    }
    try {
        await client.connect();
        console.log("Redis client connected successfully");
        return client;
    } catch (error) {
        console.error("Error connecting to Redis:", error);
    }
}

export {connectRedisClient, client as redisClient};