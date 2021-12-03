/* import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './infra/typeorm/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthToken as AuthTokenToken } from './dto/auth';
import { JwtService } from '@nestjs/jwt';

import { AuthToken } from './infra/typeorm/entities/authToken.entity';
import { isEmail } from 'class-validator';

interface Request {
  name: string;
  email: string;
  password: string;
  role: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AuthToken)
    private authRepository: Repository<AuthToken>,
    private readonly jwtService: JwtService,
  ) {}

  async create(user: Request): Promise<User> {
    const { email } = user;

    const checkUserEmailExists = await this.userRepository.findOne({
      where: { email: email },
    });
    if (checkUserEmailExists) {
      throw new Error('Email already used.');
    }

    try {
      const userdb = this.userRepository.create(user);

      await this.userRepository.save(userdb);

      return userdb;
    } catch (err) {
      throw new Error('Error.');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [{ email: email }],
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async update(id: string, input: Request): Promise<User> {
    const user = await this.userRepository.save({
      id,
      ...input,
    });
    return user;
  }

  async delete(id: string): Promise<boolean> {
    const checkUserExists = await this.userRepository.findOne(id);

    if (!checkUserExists) {
      throw new Error('User not exist.');
    }
    try {
      await this.userRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async auth(email: string, password: string): Promise<AuthTokenToken> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('User not exist.');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('User not exist.');
    }

    const token = this.authRepository.create({
      userId: user.id,
    });

    await this.authRepository.save(token);

    const authToken = new AuthTokenToken();
    authToken.refreshToken = this.jwtService.sign(
      {
        scope: ['refreshToken'],
        id: token.id,
        email: user.email,
      },
      {
        expiresIn: '8 hours',
      },
    );
    authToken.accessToken = this.jwtService.sign(
      {
        scope: ['accessToken'],
        id: user.id,
        email: user.email,
        user: 'ffffffffffff',
      },
      {
        expiresIn: '1 hours',
      },
    );

    return authToken;
  }

  async accessToken(refreshToken: string): Promise<AuthTokenToken> {
    const { email, id } = this.jwtService.verify(refreshToken);

    const token = await this.authRepository.findOne({
      where: { id: id },
    });

    if (!token) {
      throw new Error('Token does not exists');
    }

    await this.authRepository.delete(token.id);

    const tokenCreated = this.authRepository.create({
      userId: token.userId,
    });

    await this.authRepository.save(tokenCreated);

    const authToken = new AuthTokenToken();
    authToken.refreshToken = this.jwtService.sign(
      {
        scope: ['refreshToken'],
        id: token.id,
      },
      {
        expiresIn: '8 hours',
      },
    );

    authToken.accessToken = this.jwtService.sign(
      {
        scope: ['accessToken'],
        id: token.userId,
        user: 'ffffffffff',
      },
      {
        expiresIn: '1 hours',
      },
    );

    return authToken;
  }
}
 */
