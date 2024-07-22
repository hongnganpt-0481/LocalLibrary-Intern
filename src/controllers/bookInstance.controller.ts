import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import * as bookInstanceService from '../services/bookinstance.service';
import * as bookService from '../services/book.service';
import { getBookInstanceById } from '../services/bookinstance.service';
import i18next from 'i18next';
import { body, validationResult } from 'express-validator';
import { BookInstance } from '../entity/bookInstance.entity'

// Hiển thị danh sách tất cả các bản sao sách
export const bookInstanceList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const bookInstances = await bookInstanceService.getBookInstances();
  res.render('bookInstances/index', { bookInstances });
});

async function validateBookInstance(req: Request, res: Response): Promise<any | null> {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    const errorMessageId = i18next.t('errors.invalidId');
    res.status(404).send(errorMessageId);
    return null;
  }

  const bookInstance = await getBookInstanceById(id);
  if (bookInstance === null) {
    req.flash('error', i18next.t('errors.bookinstanceNotFound'));
    res.redirect('/error');
    return null;
  }

  return bookInstance;
}

// Hiển thị trang chi tiết của một bản sao sách cụ thể.
export const bookInstanceDetail = async (req: Request, res: Response, next: NextFunction) => {
  const bookInstance = await validateBookInstance(req, res);
  if (bookInstance === null) return;

  try {
    res.render('bookInstances/show', { bookInstance });
  } catch (error) {
    req.flash('error', i18next.t('errors.failedToRetrieveBookInstance'));
    res.redirect('/error');
  }
};

// Hiển thị form tạo mới bản sao sách trong GET.
export const bookinstanceCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const books = await bookService.getBooks();

  res.render('bookinstances/form', {
    title: i18next.t('bookInstance.createBookInstance'),
    books,
    errors: [],
    bookInstance: {}
  });
});

// Xử lý tạo mới bản sao sách trong POST.
export const bookInstanceCreatePost = [
  body('imprint')
    .trim()
    .isLength({ min: 1 })
    .withMessage(() => i18next.t('bookInstance.imprintError'))
    .escape(),

  body('status')
    .trim()
    .isLength({ min: 1 })
    .withMessage(() => i18next.t('bookInstance.statusError'))
    .escape(),

  body('due_back')
    .optional()
    .isISO8601()
    .withMessage(() => i18next.t('bookInstance.dueBackError'))
    .toDate(),

  body('book')
    .trim()
    .isLength({ min: 1 })
    .withMessage(() => i18next.t('bookInstance.bookError'))
    .escape(),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const books = await bookService.getBooks();
      return res.render('bookinstances/form', {
        title: i18next.t('bookInstance.createBookInstance'),
        books,
        bookInstance: req.body,
        errors: errors.array()
      });
    }

    const bookId = parseInt(req.body.book);
    const book = await bookService.getBookById(bookId);
    if (!book) {
      req.flash('error', i18next.t('bookInstance.bookNotFound'));
      return res.redirect('/bookinstances/form');
    }

    const bookInstance = new BookInstance();
    bookInstance.imprint = req.body.imprint;
    bookInstance.status = req.body.status;
    bookInstance.due_back = req.body.due_back;
    bookInstance.book = book;

    await bookInstanceService.saveBookInstance(bookInstance);

    res.redirect(`/bookinstances/${bookInstance.id}`);
  })
];

// Hiển thị form xóa bản sao sách trong GET.
export const bookinstanceDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: BookInstance delete GET: ${req.params.id}`);
});

// Xử lý xóa bản sao sách trong POST.
export const bookinstanceDeletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: BookInstance delete POST');
});

// Hiển thị form cập nhật bản sao sách trong GET.
export const bookinstanceUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: BookInstance update GET: ${req.params.id}`);
});

// Xử lý cập nhật bản sao sách trong POST.
export const bookinstanceUpdatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: BookInstance update POST');
});
