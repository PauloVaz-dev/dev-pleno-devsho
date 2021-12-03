/* import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';

import { UserDTO } from './dto/userDTO';
import { UserMapper } from './user.mapper';
import { UserCreateInputDTO } from './dto/user-create-inputDTO';
import { UserUpdateInputDTO } from './dto/user-update-inputDTO';
import { AuthToken } from './dto/auth';
import { JwtService } from '@nestjs/jwt';
import { AuthUserInput } from './dto/auth-user-inputDTO';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/utils/jwt-authGuard';
import { AuthUserId } from 'src/utils/jwt-user-decoretor';
import { UserService } from './user1.service';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
  role: string;
}

@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Query((returns) => UserDTO)
  async getUserById(@Args('id') input: string): Promise<UserDTO> {
    return await this.userService.findById(input);
  }

  @UseGuards(AuthGuard)
  @Query((returns) => [UserDTO])
  async getAllUsers(@Context() user: string): Promise<UserDTO[]> {
    console.log(user, '555555555555555555');
    return await this.userService.findAll();
  }

  @Mutation((returns) => UserDTO)
  async createUser(@Args('input') input: UserCreateInputDTO): Promise<UserDTO> {
    return this.userService.create({
      ...input,
    });
  }

  @Mutation((returns) => UserDTO)
  async updateUser(@Args('input') input: UserUpdateInputDTO): Promise<UserDTO> {
    const { id } = input;
    return this.userService.update(id, input);
  }

  @Mutation((returns) => Boolean)
  async deleteUser(@Args('id') input: string): Promise<boolean> {
    return this.userService.delete(input);
  }

  @Mutation(() => AuthToken)
  async auth(@Args('input') input: AuthUserInput): Promise<AuthToken> {
    const user = await this.userService.auth(input.email, input.password);
    return user;
  }

  @Mutation(() => AuthToken)
  async accessToken(
    @Args('refreshToken') refreshToken: string,
  ): Promise<AuthToken> {
    const user = await this.userService.accessToken(refreshToken);
    return user;
  }
}
 */
