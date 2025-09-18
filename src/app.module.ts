import { MiddlewareConsumer, Module } from '@nestjs/common';
import { loadYamlConfig } from './common/config/load-yaml.config';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { FileModule } from './modules/file/file.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { LoggerModule } from './common/modules/logger-module/logger.module';
import { LogsController } from './common/controllers/logs.controller';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadYamlConfig],
    }),
    DatabaseModule,
    LoggerModule,
    PaymentModule,
    TransactionModule,
    UserModule,
    AuthModule,
    FileModule,
  ],
  controllers: [LogsController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
