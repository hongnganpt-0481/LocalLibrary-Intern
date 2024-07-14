// routes/book.route.ts
import { Router } from 'express';
import * as bookController from '../controllers/book.controller';

const router: Router = Router();

// GET yêu cầu tạo mới sách. CHÚ Ý: Cái này phải đến trước route cho id (hiển thị sách).
router.get('/create', bookController.bookCreateGet);

// POST yêu cầu tạo mới sách.
router.post('/create', bookController.bookCreatePost);

// GET yêu cầu xóa sách.
router.get('/:id/delete', bookController.bookDeleteGet);

// POST yêu cầu xóa sách.
router.post('/:id/delete', bookController.bookDeletePost);

// GET yêu cầu cập nhật sách.
router.get('/:id/update', bookController.bookUpdateGet);

// POST yêu cầu cập nhật sách.
router.post('/:id/update', bookController.bookUpdatePost);

// GET yêu cầu hiển thị sách cụ thể.
router.get('/:id', bookController.bookDetail);

// GET yêu cầu danh sách sách.
router.get('/', bookController.bookList);

export default router;
