import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity({ name: 'author' }) 
export class Author {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'first_name' }) 
    firstName!: string;

    @Column({ name: 'family_name' }) 
    familyName!: string;

    @Column({ name: 'date_of_birth', nullable: true })
    dateOfBirth?: Date;

    @Column({ name: 'date_of_death', nullable: true }) 
    dateOfDeath?: Date;

    @OneToMany(() => Book, book => book.author)
    books!: Book[];
}
