import { getBookCount } from './book.service';
import { getAuthorCount } from './author.service';
import { getGenreCount } from './genre.service';
import { getBookInstanceCount, getAvailableBookInstancesCount } from './bookinstance.service';

export const getCounts = async () => {
    const [
        numBooks,
        numAuthors,
        numGenres,
        numBookInstances,
        availableBookInstances
    ] = await Promise.all([
        getBookCount(),
        getAuthorCount(),
        getGenreCount(),
        getBookInstanceCount(),
        getAvailableBookInstancesCount()
    ]);

    return {
        numBooks,
        numAuthors,
        numGenres,
        numBookInstances,
        numAvailableBookInstances: availableBookInstances
    };
};
