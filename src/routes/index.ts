import { Router, Request, Response, NextFunction } from 'express';
import authorRouter from './author.route';
import bookRouter from './book.route';
import genreRouter from './genre.route';
import bookinstanceRouter from './bookInstance.route';
import { index } from '../controllers/book.controller';

const router: Router = Router();

router.get('/', index);

router.use('/authors', authorRouter);
router.use('/books', bookRouter);
router.use('/genres', genreRouter);
router.use('/bookinstances', bookinstanceRouter);

export default router;

