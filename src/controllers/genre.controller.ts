import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

// Hiển thị danh sách tất cả các thể loại.
export const genreList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Genre list');
});

// Hiển thị trang chi tiết của một thể loại cụ thể.
export const genreDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
});

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
