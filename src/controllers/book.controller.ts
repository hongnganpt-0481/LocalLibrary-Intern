import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import * as libraryService from '../services/service';
import * as bookService from '../services/book.service';
import { BookInstance } from '../entity/bookInstance.entity';
import { getBookDetails } from '../services/book.service';
import i18next from 'i18next';

export const index = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const {
    numBooks,
    numAuthors,
    numGenres,
    numBookInstances,
    numAvailableBookInstances
  } = await libraryService.getCounts();

  res.render('index', {
    title: 'Sun Asterisk',
    book_count: numBooks,
    author_count: numAuthors,
    genre_count: numGenres,
    book_instance_count: numBookInstances,
    book_instance_available_count: numAvailableBookInstances
  });
});

// Hiển thị danh sách tất cả các sách.
export const bookList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const books = await bookService.getBooks();
  res.render('books/index', { books });
});

async function validateBook(req: Request, res: Response): Promise<any | null> {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    const errorMessageId = i18next.t('errors.invalidId');
    res.status(404).send(errorMessageId);
    return null;
  }

  const book = await getBookDetails(id);
  if (book === null) {
    req.flash('error', i18next.t('errors.bookNotFound'));
    res.redirect('/error');
    return null;
  }

  return book;
}

// Hiển thị trang chi tiết của một sách cụ thể.
export const bookDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const book = await validateBook(req, res);
  if (book === null) return;

  try {
    res.render('books/show', {
      book,
      bookInstances: book.instances,
      bookGenres: book.genres,
      bookInstanceStatuses: BookInstance 
    });
  } catch (error) {
    req.flash('error', i18next.t('errors.failedToRetrieveBookDetails'));
    res.redirect('/error');
  }
});

// Hiển thị form tạo mới sách trong GET.
export const bookCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Book create GET');
});

// Xử lý tạo mới sách trong POST.
export const bookCreatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Book create POST');
});

// Hiển thị form xóa sách trong GET.
export const bookDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Book delete GET: ${req.params.id}`);
});

// Xử lý xóa sách trong POST.
export const bookDeletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Book delete POST');
});

// Hiển thị form cập nhật sách trong GET.
export const bookUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Book update GET: ${req.params.id}`);
});

// Xử lý cập nhật sách trong POST.
export const bookUpdatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Book update POST');
});
