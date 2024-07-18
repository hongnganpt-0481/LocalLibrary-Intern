import { AppDataSource } from '../config/data-source';
import { Genre } from '../entity/genre.entity';

const genreRepository = AppDataSource.getRepository(Genre);

export async function getGenreCount(): Promise<number> {
    const count = await genreRepository.count();
    return count;
}

export const getGenres = async () => {
    return await genreRepository.find({
        select: ['id', 'name'],
    });
};

export async function getGenreById(genreId: number): Promise<Genre | undefined> {
    return await genreRepository.findOne({
        where: { id: genreId }
    }) || undefined;
};
