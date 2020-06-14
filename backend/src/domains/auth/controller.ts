import { AuthService } from './service';
import { UsersService } from '../users/service';
import { Post, Body, UseGuards, Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // @Post('register')
  // public async register(@Response() res, @Body() createUserDto: CreateUserDto) {
  //   const result = await this.authService.register(createUserDto);
  //   if (!result.success) {
  //     return res.status(HttpStatus.BAD_REQUEST).json(result);
  //   }
  //   return res.status(HttpStatus.OK).json(result);
  // }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  public async login(@Body() body: { username: string; password: string }) {
    return await this.usersService
      .findOne({ email: body.username })
      .then(user => {
        console.log('cont', user);
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
      });
  }
}
