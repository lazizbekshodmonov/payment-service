import { Module } from '@nestjs/common';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { FileService } from '../file/file.service';
import { ProviderRepository } from './repositories/provider.repository';
import { FileModule } from '../file/file.module';
import { FileRepository } from '../file/file.repository';

@Module({
  imports: [FileModule],
  controllers: [ProviderController],
  providers: [ProviderService, FileService, ProviderRepository, FileRepository],
  exports: [ProviderService, ProviderRepository],
})
export class ProviderModule {}
