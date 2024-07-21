import { AppDataSource } from '../config/data-source';
import { BookInstance } from '../entity/bookInstance.entity';
import { BookStatus } from '../enum';

const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

export async function getBookInstanceCount(): Promise<number> {
    const count = await bookInstanceRepository.count();
    return count;
}

export async function getAvailableBookInstancesCount(): Promise<number> {
    const [, availableCount] = await bookInstanceRepository.findAndCount({ where: { status: BookStatus.AVAILABLE } });
    return availableCount;
}

export const getBookInstances = async () => {
    return await bookInstanceRepository.find({
        select: ['id', 'imprint', 'status', 'due_back'],
        relations: ['book'],
    });
};

export const getBookInstanceById = async (id: number): Promise<BookInstance | undefined> => {
    return await bookInstanceRepository.findOne({
        where: { id: id },
        relations: ['book']
    }) || undefined;
};

export const saveBookInstance = async (bookInstance: BookInstance) => {
    await bookInstanceRepository.save(bookInstance);
};
