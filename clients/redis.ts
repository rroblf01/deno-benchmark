import { RedisClient } from "@iuioiua/r2d2";

const redisConn = await Deno.connect({ port: 6379, hostname: "redis" });
const redisClient = new RedisClient(redisConn);

class Client {
    async insert() {
        const prefs = {
            username: "ada",
            theme: "dark",
            language: "en-US",
        };

        await redisClient.sendCommand([
            "SET",
            "ada",
            JSON.stringify(prefs),
        ]);
    }

    async getPreferences() {
        const prefs = await redisClient.sendCommand([
            "GET",
            "ada",
        ]) as string;

        return prefs;
    }
}
export default new Client();
