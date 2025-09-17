import { Module } from '@nestjs/common';
import { loadYamlConfig } from './common/config/load-yaml.config';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { FileModule } from './modules/file/file.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { PlumModule } from './modules/plum/plum.module';

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
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
