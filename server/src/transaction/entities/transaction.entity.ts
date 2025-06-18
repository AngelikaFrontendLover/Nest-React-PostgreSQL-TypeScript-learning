import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()

export class Transaction {
    @PrimaryColumn({ name: 'transaction_ID' })
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    type: string

    user: User;

    @ManyToOne(() => User, (user) => user.transactions)
    @JoinColumn({ name: 'user_id' })

    @ManyToOne(() => Category, (category) => category.transactions)
    category: Category
    @JoinColumn({ name: 'category_id' })

    @Column()
    amount: number;

    @CreateDateColumn()
    createtedAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
