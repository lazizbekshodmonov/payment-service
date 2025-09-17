import { Module } from '@nestjs/common';
import { PlumModule } from './modules/plum/plum.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { loadYamlConfig } from './common/config/load-yaml.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadYamlConfig],
    }),
    DatabaseModule,
    PlumModule,
    TransactionModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
