import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Req, Query, BadRequestException } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorGueard } from 'src/guard/author.guard';
import { CategoryService } from 'src/category/category.service';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService
  ) { }

  @Get(':type/find')
  @UseGuards(JwtAuthGuard)
  findAllByType(@Req() req, @Param('type') type: string) {
    return this.transactionService.findAllByType(+req.user.id, type)
  }

  //url/transaction/pagination?page=16&limit=13
  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(@Req() req, @Query('page') page: number = 1, @Query('limit') limit: number = 3) {
    return this.transactionService.findAllWithPagination(+req.user.id, +page, +limit)
  }

  @Post()
  @UsePipes(new ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
    const category = await this.categoryService.findOne(createTransactionDto.category.id)
    if (category && +category.user.id === +req.user.id) {
      return this.transactionService.create(
        createTransactionDto,
        +req.user.id
      )
    }
    throw new BadRequestException("Category not found");
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.transactionService.findAll(+req.user.id);
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGueard)
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGueard)
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGueard)
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
