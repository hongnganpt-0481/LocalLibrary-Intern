// routes/genre.route.ts
import { Router } from 'express';
import * as genreController from '../controllers/genre.controller';

const router: Router = Router();

// GET yêu cầu tạo mới thể loại. CHÚ Ý: Cái này phải đến trước route cho id (hiển thị thể loại).
router.get('/create', genreController.genreCreateGet);

// POST yêu cầu tạo mới thể loại.
router.post('/create', genreController.genreCreatePost);

// GET yêu cầu xóa thể loại.
router.get('/:id/delete', genreController.genreDeleteGet);

// POST yêu cầu xóa thể loại.
router.post('/:id/delete', genreController.genreDeletePost);

// GET yêu cầu cập nhật thể loại.
router.get('/:id/update', genreController.genreUpdateGet);

// POST yêu cầu cập nhật thể loại.
router.post('/:id/update', genreController.genreUpdatePost);

// GET yêu cầu hiển thị thể loại cụ thể.
router.get('/:id', genreController.genreDetail);

// GET yêu cầu danh sách thể loại.
router.get('/', genreController.genreList);

export default router;
