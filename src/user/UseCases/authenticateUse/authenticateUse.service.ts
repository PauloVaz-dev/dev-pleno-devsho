import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/user/repositories/user.interface';

interface Request {
  name: string;
  email: string;
  password: string;
  role: string;
}

@Injectable()
export class AuthUserService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(email: string, password: string): Promise<any> {
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
    const user = await this.userRepository.findOne(email);

    if (!user) {
      throw new Error('User not exist.');
    }

    return { id: '1' };
  }
}
