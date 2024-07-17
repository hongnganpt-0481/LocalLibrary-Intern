import { AppDataSource } from '../config/data-source';
import { Book } from '../entity/book.entity';

export async function getBookCount(): Promise<number> {
    const bookRepository = AppDataSource.getRepository(Book);
    const count = await bookRepository.count();
    return count;
}

export const getBooks = async () => {
    const bookRepository = AppDataSource.getRepository(Book);
    return await bookRepository.find({
        order: { title: 'ASC' },
        relations: ['author']
    });
};
