import { Router } from 'express';
import * as authorController from '../controllers/author.controller';

const router: Router = Router();

// GET yêu cầu tạo mới tác giả. CHÚ Ý: Cái này phải đến trước route cho id (hiển thị tác giả).
router.get('/create', authorController.authorCreateGet);

// POST yêu cầu tạo mới tác giả.
router.post('/create', authorController.authorCreatePost);

// GET yêu cầu xóa tác giả.
router.get('/:id/delete', authorController.authorDeleteGet);

// POST yêu cầu xóa tác giả.
router.post('/:id/delete', authorController.authorDeletePost);

// GET yêu cầu cập nhật tác giả.
router.get('/:id/update', authorController.authorUpdateGet);

// POST yêu cầu cập nhật tác giả.
router.post('/:id/update', authorController.authorUpdatePost);

// GET yêu cầu hiển thị tác giả cụ thể.
router.get('/:id', authorController.authorDetail);

// GET yêu cầu danh sách tác giả.
router.get('/', authorController.authorList);

export default router;
