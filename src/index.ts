import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import indexRouter from './routes/index';

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

// Khai báo các routes
app.use("/", indexRouter);
// app.use("/users", usersRouter);

// Middleware xử lý lỗi
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(500);
    res.render("error");
});

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});