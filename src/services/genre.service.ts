import { AppDataSource } from '../config/data-source';
import { Genre } from '../entity/genre.entity';

export async function getGenreCount(): Promise<number> {
    const genreRepository = AppDataSource.getRepository(Genre);
    const count = await genreRepository.count();
    return count;
}
