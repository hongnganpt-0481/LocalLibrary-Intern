import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import * as authorService from '../services/author.service'

// Hiển thị danh sách tất cả các tác giả
export const authorList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authors = await authorService.getAuthors();
  res.render('authors/index', { authors });
});

// Hiển thị trang chi tiết của một tác giả cụ thể.
export const authorDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
});

// Hiển thị form tạo mới tác giả trong GET.
export const authorCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Author create GET');
});

// Xử lý tạo mới tác giả trong POST.
export const authorCreatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Author create POST');
});

// Hiển thị form xóa tác giả trong GET.
export const authorDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Author delete GET: ${req.params.id}`);
});

// Xử lý xóa tác giả trong POST.
export const authorDeletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Author delete POST');
});

// Hiển thị form cập nhật tác giả trong GET.
export const authorUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Author update GET: ${req.params.id}`);
});

// Xử lý cập nhật tác giả trong POST.
export const authorUpdatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Author update POST');
});
