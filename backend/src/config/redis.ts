import { createClient } from "redis";
import { CacheKeys } from "../types/cacheKeys";

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

const deleteMoviesCache = async () => {
    try {
        await client.del(CacheKeys.ALL_MOVIES);
        await client.del(CacheKeys.TOP_MOVIES);
        await client.del(CacheKeys.RANDOM_MOVIES);
        await client.del(CacheKeys.NEW_MOVIES);
    } catch (error) {
        console.error("Error deleting movie cache:", error);
    }
}

export {connectRedisClient, deleteMoviesCache, client as redisClient};