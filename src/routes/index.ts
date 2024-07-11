import { Router, Request, Response } from 'express';
const router = Router();

/* GET users listing. */
router.get('/users', (req: Request, res: Response) => {
    res.send('respond with a resource');
});

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
    res.render('index', { title: 'Express' });
});

export default router;
