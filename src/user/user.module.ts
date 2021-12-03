import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUserResolver } from './UseCases/authenticateUse/authenticateUse.resolver';
import { AuthUserService } from './UseCases/authenticateUse/authenticateUse.service';
import { UserRepository } from './infra/typeorm/repositories/user.repository';
import { User } from './infra/typeorm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    AuthUserService,
    AuthUserResolver,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
