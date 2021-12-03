import { User } from '../infra/typeorm/entities/user.entity';

export interface ICreateUser {
  id?: string;
  name: string;
  slug: string;
}

export interface IUserRepository {
  find(): Promise<User[]>;
  findOne(id: string): Promise<User>;
  findBySlug(slug: string): Promise<User>;
  findByName(name: string): Promise<User>;
  create(input: ICreateUser): Promise<User>;
  delete(id: string): Promise<boolean>;
  save({ id, name, slug }: ICreateUser): Promise<User>;
}
