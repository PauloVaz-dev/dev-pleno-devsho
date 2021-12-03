import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3 } from 'src/utils/s3';
import { Brand } from './brand.entity';
import { BarndResolver } from './brand.resolvers';
import { BrandService } from './brand.service';
import { BarndSlugIsUnique } from './validations/BrandSlugIsUnique';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BarndResolver, BrandService, BarndSlugIsUnique, S3],
})
export default class BrandModule {}
