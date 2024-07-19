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
    @JoinTable({
        name: 'bookGenre',
        joinColumn: { name: 'book_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' },
    })
    genres?: Genre[];

    @OneToMany(() => BookInstance, instance => instance.book)
    instances!: BookInstance[]; 
}
