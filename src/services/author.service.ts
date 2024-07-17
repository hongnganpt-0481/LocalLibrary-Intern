import { AppDataSource } from '../config/data-source';
import { Author } from '../entity/author.entity';
import { FindManyOptions } from 'typeorm';

export async function getAuthorCount(): Promise<number> {
  const authorRepository = AppDataSource.getRepository(Author);
  const count = await authorRepository.count();
  return count;
}

export const getAuthors = async () => {
  const authorRepository = AppDataSource.getRepository(Author);
  const options: FindManyOptions<Author> = {
    select: ['id', 'firstName', 'familyName', 'dateOfBirth', 'dateOfDeath'],
    order: {
      firstName: 'ASC',
    },
  };
  return await authorRepository.find(options);
};
