import { Injectable, Inject } from '@nestjs/common';
import { USERS_REPOSITORY } from '../../constants';
import { Repository } from 'typeorm';
import { UserEntity } from './entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(user: Partial<UserEntity>) {
    console.log(user);
    return this.usersRepository.findOne(user);
  }

  findById(id: string) {
    return this.usersRepository.findOneOrFail(id);
  }

  // async create(createUserDto: CreateUserDto): Promise<IUser> {
  //   const createdUser = new this.userModel(createUserDto);
  //   return await createdUser.save();
  // }

  // async update(ID: number, newValue: IUser): Promise<IUser> {
  //   const user = await this.userModel.findById(ID).exec();

  //   if (!user._id) {
  //     debug('user not found');
  //   }

  //   await this.userModel.findByIdAndUpdate(ID, newValue).exec();
  //   return await this.userModel.findById(ID).exec();
  // }
  // async delete(ID: number): Promise<string> {
  //   try {
  //     await this.userModel.findByIdAndRemove(ID).exec();
  //     return 'The user has been deleted';
  //   } catch (err) {
  //     debug(err);
  //     return 'The user could not be deleted';
  //   }
  // }
}
