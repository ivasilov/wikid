import { AuthService } from './service';
import { UsersService } from '../users/service';
import { Post, Body, Controller } from '@nestjs/common';
import { Ctx, RequestContext } from '../../app';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  // @Post('register')
  // public async register(@Response() res, @Body() createUserDto: CreateUserDto) {
  //   const result = await this.authService.register(createUserDto);
  //   if (!result.success) {
  //     return res.status(HttpStatus.BAD_REQUEST).json(result);
  //   }
  //   return res.status(HttpStatus.OK).json(result);
  // }

  @Post('login')
  public async login(@Ctx() ctx: RequestContext, @Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(ctx, body.email, body.password);
    if (user) {
      return this.authService.login(user);
    }
    // if (!user) {
    //   res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //     message: 'User Not Found',
    //   });
    // } else {
    //   const token = this.authService.login(user);
    //   return res.status(HttpStatus.OK).json(token);
    // }
  }
}
