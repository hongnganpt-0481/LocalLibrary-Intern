import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import { Author } from './author.entity';
import { Genre } from './genre.entity';
import { BookInstance } from './bookInstance.entity';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    summary!: string;

    @Column({ nullable: true })
    isbn?: string;

    @ManyToOne(() => Author, author => author.books)
    @JoinColumn({ name: 'author_id' })
    author!: Author;

    @ManyToMany(() => Genre)
    @JoinTable()
    genres?: Genre[];

    @OneToMany(() => BookInstance, (instance: BookInstance) => instance.book)
    instances!: BookInstance[];
}
