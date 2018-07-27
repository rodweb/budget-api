import { User } from '../models/user.model';
import { IRepository } from './repository';
import { Repository, createConnection } from 'typeorm';

export default class UserRepository implements IRepository<User> {

  private repo!: Repository<User>;

  constructor() {
    createConnection().then((conn) => {
      this.repo = conn.getRepository(User);
    });
  }

  find = async(id: number) => this.repo.findOne(id);
  save = async(user: User) => this.repo.save(user);
}
