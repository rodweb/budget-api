
import { Repository, Connection } from 'typeorm';

import { User } from '../models/user.model';

import { IRepository } from './repository';

export default class UserRepository implements IRepository<User> {
  private repo!: Repository<User>;

  constructor(private conn: Connection) {
    this.repo = conn.getRepository(User);
  }

  find = async(id: number) => this.repo.findOne(id);
  save = async(user: User) => this.repo.save(user);
}
