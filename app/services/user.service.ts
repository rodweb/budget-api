import { IRepository } from '../repositories/repository';
import { User } from '../models/user.model';

export interface UserDTO {
  firstName: string;
  lastName: string;
  age: number;
}

export interface IUserService {
  add(user: UserDTO): Promise<UserDTO>;
}

export default class UserService implements IUserService {
  constructor(private userRepository: IRepository<User>) {
  }

  public async add(user: UserDTO) {
    // validate
    // mapping

    const {
      firstName,
      lastName,
      age,
    } = user;

    const { id } = await this.userRepository.save({
      ...user,
      id: 0,
    });

    return {
      ...user,
      id,
    };
  }
}
