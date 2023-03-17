import { Injectable } from '@nestjs/common';
import { RequestContext } from '../../app/request-context';
import {} from '../../constants';
import { TransactionalConnection } from '../../database';
import { UserEntity } from './entity';

@Injectable()
export class UsersService {
  constructor(private connection: TransactionalConnection) {}

  findAll(ctx: RequestContext) {
    return this.connection.getRepository(ctx, UserEntity).find();
  }

  findOne(ctx: RequestContext, user: Partial<UserEntity>) {
    return this.connection.getRepository(ctx, UserEntity).findOne(user);
  }

  findById(ctx: RequestContext, id: string) {
    return this.connection.getRepository(ctx, UserEntity).findOneOrFail(id);
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
