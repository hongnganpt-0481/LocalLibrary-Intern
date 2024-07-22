import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import * as authorService from '../services/author.service';
import { getAuthorDetails, saveAuthor, findAuthorByName } from '../services/author.service';
import i18next from 'i18next';
import { body, validationResult } from 'express-validator';
import { Author } from '../entity/author.entity';

// Hiển thị danh sách tất cả các tác giả
export const authorList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authors = await authorService.getAuthors();
  res.render('authors/index', { authors });
});

async function validateAuthor(req: Request, res: Response): Promise<any | null> {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    const errorMessageId = i18next.t('errors.invalidId');
    res.status(404).send(errorMessageId);
    return null;
  }

  const author = await getAuthorDetails(id);
  if (author === null) {
    req.flash('error', i18next.t('errors.authorNotFound'));
    res.redirect('/error');
    return null;
  }

  return author;
}

// Hiển thị trang chi tiết của một tác giả cụ thể.
export const authorDetail = async (req: Request, res: Response) => {
  const author = await validateAuthor(req, res);
  if (author === null) return;

  try {
    res.render('authors/show', { author });
  } catch (error) {
    req.flash('error', i18next.t('errors.failedToRetrieveAuthorDetails'));
    res.redirect('/error');
  }
};

// Hiển thị form tạo mới tác giả trong GET.
export const authorCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.render('authors/form', { title: req.t('createAuthor.title') });
});

// Xử lý tạo mới tác giả trong POST.
export const authorCreatePost = [
  body('firstName',  i18next.t('createAuthor.author_firstName_length')).trim().isLength({ min: 3 }).escape(),
  body('familyName', i18next.t('createAuthor.author_familyName_length')).trim().isLength({ min: 3 }).escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const author = new Author();
    author.firstName = req.body.firstName;
    author.familyName = req.body.familyName;
    author.dateOfBirth = req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : undefined;
    author.dateOfDeath = req.body.dateOfDeath ? new Date(req.body.dateOfDeath) : undefined;

    if (!errors.isEmpty()) {
      res.render('authors/form', {
        title: 'Tạo Tác Giả',
        author: author,
        errors: errors.array()
      });
      return;
    } else {
      const authorExists = await findAuthorByName(req.body.firstName, req.body.familyName);
      if (authorExists) {
        res.redirect(`/authors/${authorExists.id}`);
      } else {
        await saveAuthor(author);
        res.redirect(`/authors/${author.id}`);
      }
    }
  })
];

// Hiển thị form xóa tác giả trong GET.
export const authorDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const author = await validateAuthor(req, res);
  if (author) {
    const authorBooks = author?.books;
    res.render('authors/delete', {
      title: i18next.t('delete_author_title'),
      author,
      authorBooks
    });
  }
});

// Xử lý xóa tác giả trong POST.
export const authorDeletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const author = await validateAuthor(req, res);
  if (author) {
    const authorBooks = author?.books;
    if (authorBooks.length > 0) {
      res.render('authors/delete', {
        title: i18next.t('delete_author_title'),
        author,
        authorBooks
      });
      return;
    } else {
      await authorService.deleteAuthorById(author.id);
      res.redirect('/authors');
    }
  }
});

// Hiển thị form cập nhật tác giả trong GET.
export const authorUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Author update GET: ${req.params.id}`);
});

// Xử lý cập nhật tác giả trong POST.
export const authorUpdatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Author update POST');
});
