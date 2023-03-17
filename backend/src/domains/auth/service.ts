import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestContext } from '../../app';
import { UsersService } from '../users/service';

export interface JwtPayload {
  id: string;
  email: string;
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
}

export interface IToken {
  readonly token: string;
}

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  // async register(user: IUser) {
  //   let status: RegistrationStatus = {
  //     success: true,
  //     message: 'user register',
  //   };
  //   await this.userModel.register(
  //     new this.userModel({
  //       username: user.email,
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //     }),
  //     user.password,
  //     err => {
  //       if (err) {
  //         debug(err);
  //         status = { success: false, message: err };
  //       }
  //     },
  //   );
  //   return status;
  // }

  async validateUser(ctx: RequestContext, email: string, pass: string) {
    const user = await this.usersService.findOne(ctx, { email });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { id: string; email: string }) {
    const payload = { email: user.email, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
