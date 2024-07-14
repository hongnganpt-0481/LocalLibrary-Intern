import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

// Hiển thị danh sách tất cả các bản sao của sách.
export const bookinstanceList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: BookInstance list');
});

// Hiển thị trang chi tiết của một bản sao sách cụ thể.
export const bookinstanceDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
});

// Hiển thị form tạo mới bản sao sách trong GET.
export const bookinstanceCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: BookInstance create GET');
});

// Xử lý tạo mới bản sao sách trong POST.
export const bookinstanceCreatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: BookInstance create POST');
});

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
