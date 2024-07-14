import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

// Hiển thị danh sách tất cả các sách.
export const bookList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Book list');
});

// Hiển thị trang chi tiết của một sách cụ thể.
export const bookDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
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
