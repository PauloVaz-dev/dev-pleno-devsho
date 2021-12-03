import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateUser,
  IUserRepository,
} from 'src/user/repositories/user.interface';
import { User } from 'src/user/infra/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

interface Request {
  name: string;
  slug: string;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async find(): Promise<User[]> {
    const categories = await this.repository.find();

    console.log(categories);

    return categories;
  }

  async findOne(email: string): Promise<User> {
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
    const category = await this.repository.findOne({
      where: { email },
    });
    return category;
  }
  async findBySlug(slug: string): Promise<User> {
    const category = await this.repository.findOne({
      where: {
        slug,
      },
    });
    return category;
  }

  async findName(name: string): Promise<User | null> {
    const category = await this.repository.findOne({
      where: {
        name,
      },
    });
    return category || null;
  }
  async delete(id: string): Promise<boolean> {
    try {
      await this.repository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async findByName(name: string): Promise<User | null> {
    const findInSameName = await this.repository.findOne({
      where: {
        name,
      },
    });
    return findInSameName || null;
  }

  async create({ name, slug }: Request): Promise<User> {
    const category = this.repository.create({
      name,
    });

    await this.repository.save(category);
    return category;
  }

  async save({ id, name, slug }: ICreateUser): Promise<User> {
    const category = await this.repository.save({
      id,
      name,
      slug,
    });

    return category;
  }
}
