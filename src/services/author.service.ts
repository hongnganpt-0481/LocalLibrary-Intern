import { AppDataSource } from '../config/data-source';
import { Author } from '../entity/author.entity';
import { FindManyOptions } from 'typeorm';

const authorRepository = AppDataSource.getRepository(Author);

export async function getAuthorCount(): Promise<number> {
  const count = await authorRepository.count();
  return count;
}

export const getAuthors = async () => {
  const options: FindManyOptions<Author> = {
    select: ['id', 'firstName', 'familyName', 'dateOfBirth', 'dateOfDeath'],
    order: {
      firstName: 'ASC',
    },
  };
  return await authorRepository.find(options);
};

export const getAuthorDetails = async (id: number) => {
  return await authorRepository.findOne({
    where: { id: id },
    relations: ['books']
  });
};
