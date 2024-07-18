import { AppDataSource } from '../config/data-source';
import { Book } from '../entity/book.entity';

const bookRepository = AppDataSource.getRepository(Book);

export async function getBookCount(): Promise<number> {
    const count = await bookRepository.count();
    return count;
}

export const getBooks = async () => {
    return await bookRepository.find({
        order: { title: 'ASC' },
        relations: ['author']
    });
};

export const getBookDetails = async (id: number) => {
    return await bookRepository.findOne({
        relations: ['author', 'genres', 'instances'],
        where: { id: id }
    });
};

export async function getBooksByGenreId(genreId: number) {
    const books = await AppDataSource.getRepository(Book)
        .createQueryBuilder('book')
        .innerJoin('book.genres', 'genre')
        .where('genre.id = :genreId', { genreId })
        .getMany();
    return books;
}
