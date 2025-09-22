import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "src/category/entities/category.entity"

export class CreateTransactionDto {
    @IsNotEmpty()
    title: string
    @IsNotEmpty()
    @IsNumber()
    amount: number
    @IsString()
    type: "expense" | "income"
    @IsNotEmpty()
    category: Category
}
