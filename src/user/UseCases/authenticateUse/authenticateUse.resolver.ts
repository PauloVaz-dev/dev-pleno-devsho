import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthToken } from 'src/user/dto/auth';
import { AuthUserInput } from 'src/user/dto/auth-user-inputDTO';
import { AuthUserService } from './authenticateUse.service';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
  role: string;
}

@Resolver('User')
export class AuthUserResolver {
  constructor(private userService: AuthUserService) {}

  @Mutation(() => AuthToken)
  async auth(@Args('input') input: AuthUserInput): Promise<AuthToken> {
    const user = await this.userService.execute(input.email, input.password);
    return user;
  }
}
