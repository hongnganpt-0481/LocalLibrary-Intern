import { AppDataSource } from '../config/data-source';
import { Book } from '../entity/book.entity';
import { Author } from '../entity/author.entity';
import { Genre } from '../entity/genre.entity';

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

export const findBookByTitle = async (title: string) => {
    return await bookRepository.findOne({ where: { title } });
};

export const saveBook = async (book: Book) => {
    return await bookRepository.save(book);
};

export const getBookById = async (id: number): Promise<Book | null> => {
    return await bookRepository.findOneBy({ id });
};

export const updateBookById = async (
    id: number,
    title: string,
    authorId: number,
    summary: string,
    isbn: string,
    genreIds: number[]
  ): Promise<Book> => {
    const bookRepository = AppDataSource.getRepository(Book);
    const authorRepository = AppDataSource.getRepository(Author);
    const genreRepository = AppDataSource.getRepository(Genre);
  
    const book = await bookRepository.findOne({ where: { id } });
    if (!book) throw new Error('Book not found');
  
    const author = await authorRepository.findOne({ where: { id: authorId } });
    if (!author) throw new Error('Author not found');
  
    const genres = await genreRepository.findByIds(genreIds);
  
    book.title = title;
    book.author = author;
    book.summary = summary;
    book.isbn = isbn;
    book.genres = genres;
  
    return await bookRepository.save(book);
  };
