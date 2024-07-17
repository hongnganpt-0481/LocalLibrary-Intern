import { AppDataSource } from '../config/data-source';
import { Book } from '../entity/book.entity';

export async function getBookCount(): Promise<number> {
    const bookRepository = AppDataSource.getRepository(Book);
    const count = await bookRepository.count();
    return count;
}
