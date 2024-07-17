import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import route from './routes';
import i18next from './i18n';
import i18nextMiddleware from 'i18next-http-middleware';

const app = express();

// Cấu hình view engine là 'pug'
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Cấu hình middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Sử dụng i18next middleware
app.use(i18nextMiddleware.handle(i18next));

// Cấu hình middleware để gán hàm t vào biến cục bộ
app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.t = req.t;
    next();
});

// Khai báo các routes
app.use('/', route);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new Error('Not Found');
    res.status(404);
    next(err);
});

// Middleware xử lý lỗi
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(500);
    res.render("error");
});

// Khởi tạo DataSource
AppDataSource.initialize()
    .then(() => {
        console.log('DataSource đã được khởi tạo');
    }).catch((err) => {
        console.error('Lỗi trong quá trình khởi tạo DataSource:', err);
    });

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
