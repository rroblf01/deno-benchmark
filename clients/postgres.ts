import { ORM, ORMClient } from "@justaos/orm";

const postgresOrm = new ORM({
    database: "example",
    username: "example",
    password: "example",
    hostname: "postgres",
    port: 5432,
});

class Client {
    postgresClient: ORMClient | undefined = undefined;

    async insert() {
        if (!this.postgresClient) {
            this.postgresClient = await postgresOrm.connect(true);
        }
        await this.postgresClient.defineTable({
            name: "preferences",
            columns: [
                {
                    name: "username",
                    type: "string",
                },
                {
                    name: "theme",
                    type: "string",
                },
                {
                    name: "language",
                    type: "string",
                },
            ],
        });
        const preferencesTable = this.postgresClient.table("preferences");
        const preferences = preferencesTable.createNewRecord();

        preferences.set("username", "ada");
        preferences.set("theme", "dark");
        preferences.set("language", "en-US");

        await preferences.insert();
    }

    async getPreferences() {
        if (!this.postgresClient) {
            this.postgresClient = await postgresOrm.connect(true);
        }

        const teacherTable = this.postgresClient.table("preferences");
        const records = await teacherTable.toArray();
        return records.map((t) => t.toJSON());
    }
}
export default new Client();
