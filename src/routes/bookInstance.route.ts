// routes/bookinstance.route.ts
import { Router } from 'express';
import * as bookinstanceController from '../controllers/bookInstance.controller';

const router: Router = Router();

// GET yêu cầu tạo mới bản sao sách. CHÚ Ý: Cái này phải đến trước route cho id (hiển thị bản sao sách).
router.get('/create', bookinstanceController.bookinstanceCreateGet);

// POST yêu cầu tạo mới bản sao sách.
router.post('/create', bookinstanceController.bookinstanceCreatePost);

// GET yêu cầu xóa bản sao sách.
router.get('/:id/delete', bookinstanceController.bookinstanceDeleteGet);

// POST yêu cầu xóa bản sao sách.
router.post('/:id/delete', bookinstanceController.bookinstanceDeletePost);

// GET yêu cầu cập nhật bản sao sách.
router.get('/:id/update', bookinstanceController.bookinstanceUpdateGet);

// POST yêu cầu cập nhật bản sao sách.
router.post('/:id/update', bookinstanceController.bookinstanceUpdatePost);

// GET yêu cầu hiển thị bản sao sách cụ thể.
router.get('/:id', bookinstanceController.bookInstanceDetail);

// GET yêu cầu danh sách bản sao sách.
router.get('/', bookinstanceController.bookInstanceList);

export default router;
