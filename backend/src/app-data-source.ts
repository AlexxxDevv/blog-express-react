import { DataSource } from "typeorm";
import path from "path";

export const myDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(String(process.env.POSTGRES_PORT)),
    username: process.env.POSTGRES_USER ,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [path.join(__dirname, 'entity/*.*')],
    logging: true,
    synchronize: true,
})
