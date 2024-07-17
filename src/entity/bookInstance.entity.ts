import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity('bookinstance')
export class BookInstance {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    imprint!: string;

    @Column()
    status!: string;

    @Column({ nullable: true })
    due_back?: Date;

    @ManyToOne(() => Book, book => book.instances)
    @JoinColumn({ name: 'book_id' })
    book!: Book;
}
