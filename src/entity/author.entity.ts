import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    familyName!: string;

    @Column({ nullable: true })
    dateOfBirth?: Date;

    @Column({ nullable: true })
    dateOfDeath?: Date;

    @OneToMany(() => Book, book => book.author)
    books!: Book[];
}
