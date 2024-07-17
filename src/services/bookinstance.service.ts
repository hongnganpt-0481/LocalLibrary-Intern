import { AppDataSource } from '../config/data-source';
import { BookInstance } from '../entity/bookInstance.entity';
import { BookStatus } from '../enum';

export async function getBookInstanceCount(): Promise<number> {
    const bookInstanceRepository = AppDataSource.getRepository(BookInstance);
    const count = await bookInstanceRepository.count();
    return count;
}

export async function getAvailableBookInstancesCount(): Promise<number> {
    const bookInstanceRepository = AppDataSource.getRepository(BookInstance);
    const [, availableCount] = await bookInstanceRepository.findAndCount({ where: { status: BookStatus.AVAILABLE } });
    return availableCount;
}
