import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import * as libraryService from '../services/service';
import * as bookService from '../services/book.service';
import { BookInstance } from '../entity/bookInstance.entity';
import { getBookDetails } from '../services/book.service';
import i18next from 'i18next';
import { body, validationResult } from 'express-validator';
import { Book } from '../entity/book.entity';
import * as authorService from '../services/author.service';
import * as genreService from '../services/genre.service';


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

// Hàm validate cho các trường sách
export const validateBookFields = () => [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage(i18next.t('book.titleError'))
    .escape(),

  body('author')
    .trim()
    .isLength({ min: 1 })
    .withMessage(i18next.t('book.authorError'))
    .escape(),

  body('summary')
    .trim()
    .isLength({ min: 1 })
    .withMessage(i18next.t('book.summaryError'))
    .escape(),

  body('isbn')
    .trim()
    .isLength({ min: 1 })
    .withMessage(i18next.t('book.isbnError'))
    .escape(),

  body('genre.*')  // Validate các giá trị của genre
    .optional()
    .escape(),
];

// Hiển thị form tạo mới sách trong GET.
export const bookCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const [allAuthors, allGenres] = await Promise.all([
    authorService.getAuthors(),
    genreService.getGenres()
  ]);
  res.render('books/form', {
    title: req.t('book.createBook'),
    authors: allAuthors,
    genres: allGenres
  });
});

// Xử lý tạo mới sách trong POST.
export const bookCreatePost = [
  ...validateBookFields(), 
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre = typeof req.body.genre === 'undefined' ? [] : [req.body.genre];
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const allAuthors = await authorService.getAuthors();
      const allGenres = await genreService.getGenres();

      return res.render('books/form', {
        title: i18next.t('book.createBook'),
        authors: allAuthors,
        genres: allGenres,
        book: req.body,
        errors: errors.array()
      });
    }

    const authorId = parseInt(req.body.author);
    const author = await authorService.getAuthorById(authorId);
    if (!author) {
      req.flash('error', i18next.t('book.authorNotFound'));
      return res.redirect('/books/form');
    }

    const genreIds = req.body.genre.map((id: string) => parseInt(id));
    const genres = await genreService.getGenreByIds(genreIds);
    if (genres.length !== genreIds.length) {
      req.flash('error', i18next.t('book.genresNotFound'));
      return res.redirect('/books/form');
    }

    const book = new Book();
    book.title = req.body.title;
    book.author = author;
    book.summary = req.body.summary;
    book.isbn = req.body.isbn;
    book.genres = genres;

    await bookService.saveBook(book);
    res.redirect(`/books/${book.id}`);
  })
];

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
  const id = parseInt(req.params.id);
  const [book, allAuthors, allGenres] = await Promise.all([
    bookService.getBookById(id),
    authorService.getAuthors(),
    genreService.getGenres()
  ]);

  if (!book) {
    return res.redirect('/books');
  }

  res.render('books/update', {
    title: i18next.t('updateBook'),
    action: `/books/${id}/update`, 
    authors: allAuthors,
    genres: allGenres,
    book: book,
    errors: []
  });
});

// Xử lý cập nhật sách trong POST.
export const bookUpdatePost = [
  (req: Request, res: Response, next: NextFunction) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre = typeof req.body.genre === 'undefined' ? [] : [req.body.genre];
    }
    next();
  },

  ...validateBookFields(), 
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const [allAuthors, allGenres] = await Promise.all([
        authorService.getAuthors(),
        genreService.getGenres()
      ]);

      res.render('books/update', {
        title: i18next.t('updateBook'),
        action: `/books/${id}/update`, 
        authors: allAuthors,
        genres: allGenres,
        book: req.body,
        errors: errors.array()
      });
      return;
    }

    try {
      const updatedBook = await bookService.updateBookById(
        id,
        req.body.title,
        parseInt(req.body.author, 10),
        req.body.summary,
        req.body.isbn,
        req.body.genre.map((genreId: string) => parseInt(genreId, 10))
      );

      res.redirect(`/books/${updatedBook.id}`);
    } catch (error) {
      next(error);
    }
  })
];
