import { join } from "path";
import { Author } from "../entity/author.entity";
import { Book } from "../entity/book.entity";
import { BookInstance } from "../entity/bookInstance.entity";
import { Genre } from "../entity/genre.entity";
import { DataSource } from 'typeorm';
require('dotenv').config();

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: host!,
    port: parseInt(port!),
    username: username!,
    password: password!,
    database: database!,
    migrations: [join(__dirname, '../migration/*.{ts,js}')],

    entities: [join(__dirname, '../entity/*.entity.{ts,js}')],
    synchronize: false, // Tắt tự động đồng bộ hóa schema
    logging: false,     // Tắt logging SQL queries
    subscribers: [],
});
