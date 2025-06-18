import { Category } from "src/category/entities/category.entity";
import { Transaction } from "src/transaction/entities/transaction.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Category, (category) => category.user, {
        onDelete: 'CASCADE',
    })

    categories: Category[]

    transactions: Transaction[]

    @OneToMany(() => Transaction, (transaction) => transaction.user, {
        onDelete: 'CASCADE',
    })

    @CreateDateColumn()
    createtedAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
