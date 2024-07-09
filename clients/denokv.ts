const denoKvclient = await Deno.openKv();

class Client {
    async insert() {
        const prefs = {
            username: "ada",
            theme: "dark",
            language: "en-US",
        };

        await denoKvclient.set(["preferences"], prefs);
    }

    async getPreferences() {
        const prefs = await denoKvclient.get(["preferences"]);

        return prefs.value || {};
    }
}
export default new Client();
