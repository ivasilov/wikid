import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/service';
import { JwtService } from '@nestjs/jwt';

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
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('auth validate');
    const user = await this.usersService.findOne({ email });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('auth login', user);
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
