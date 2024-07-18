import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import * as genreService from '../services/genre.service';
import { getBooksByGenreId } from '../services/book.service';
import { getGenreById } from '../services/genre.service';
import i18next from 'i18next';

// Hiển thị danh sách tất cả các thể loại sách
export const genreList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const genres = await genreService.getGenres();
  res.render('genres/index', { genres });
});

async function validateGenreId(req: Request, res: Response): Promise<any | null> {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    const errorMessageId = i18next.t('errors.invalidId');
    res.status(404).send(errorMessageId);
    return null;
  }

  const genre = await getGenreById(id);
  if (genre === null) {
    req.flash('error', i18next.t('errors.genreNotFound'));
    res.redirect('/error');
    return null;
  }

  return genre;
}

// Hiển thị trang chi tiết của một thể loại cụ thể.
export const booksByGenre = async (req: Request, res: Response): Promise<void> => {
  const genre = await validateGenreId(req, res);
  if (genre === null) return;

  try {
    const books = await getBooksByGenreId(genre.id);
    res.render('genres/show', { genre, books });
  } catch (error) {
    req.flash('error', i18next.t('errors.failedToRetrieveGenreDetails'));
    res.redirect('/error');
  }
};

// Hiển thị form tạo mới thể loại trong GET.
export const genreCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Genre create GET');
});

// Xử lý tạo mới thể loại trong POST.
export const genreCreatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Genre create POST');
});

// Hiển thị form xóa thể loại trong GET.
export const genreDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Genre delete GET: ${req.params.id}`);
});

// Xử lý xóa thể loại trong POST.
export const genreDeletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Genre delete POST');
});

// Hiển thị form cập nhật thể loại trong GET.
export const genreUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Genre update GET: ${req.params.id}`);
});

// Xử lý cập nhật thể loại trong POST.
export const genreUpdatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Genre update POST');
});
