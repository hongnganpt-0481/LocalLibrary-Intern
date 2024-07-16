import { AppDataSource } from '../config/data-source';
import { Author } from '../entity/author.entity';

export async function getAuthorCount(): Promise<number> {
  const authorRepository = AppDataSource.getRepository(Author);
  const count = await authorRepository.count();
  return count;
}
