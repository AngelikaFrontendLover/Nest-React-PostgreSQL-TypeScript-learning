import { BadRequestException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { create } from 'domain';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>
  ) { }

  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      category: { id: +createTransactionDto.category },
      user: { id },
    }
    if (!newTransaction) throw new BadRequestException("Something went wrong...")

    await this.transactionRepository.save(newTransaction)
  }

  async findAll(id: number) {
    const transaction = await this.transactionRepository.find({
      where: {
        user: { id }
      },
      order:
      {
        createtedAt: 'DESC',
      }
    })
    return transaction;
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        category: true
      }
    })
    if (!transaction) throw new NotFoundException("Transaction not founded");
    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    })

    if (!transaction) throw new NotFoundException("Transaction not founded");

    await this.transactionRepository.update(id, updateTransactionDto)
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    })

    if (!transaction) throw new NotFoundException("Transaction not founded");

    await this.transactionRepository.delete(id)
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const transaction = await this.transactionRepository.find({
      where: {
        user: { id }
      },
      relations: {
        category: true,
        user: true
      },
      order: {
        createtedAt: "DESC"
      },
      take: limit,
      skip: (page - 1) * limit
    })
    return transaction;
  }
}
