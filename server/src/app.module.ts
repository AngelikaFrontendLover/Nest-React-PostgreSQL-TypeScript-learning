import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, CategoryModule, AuthModule, TransactionModule, ConfigModule.forRoot(), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_username'),
      password: configService.get('DB_password'),
      database: configService.get('DB_name'),
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      schema: 'public'
    }),
    inject: [ConfigService]
  })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
