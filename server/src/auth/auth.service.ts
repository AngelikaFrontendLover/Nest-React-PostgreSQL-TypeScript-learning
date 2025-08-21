import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (user) {
      const passwordIsMatch = await argon2.verify(user.password, password)
      if (passwordIsMatch) {
        return user;
      }
      throw new UnauthorizedException('Password is incorrect');
    }
    throw new UnauthorizedException('User is incorrect');
  }

  async login(user: IUser) {
    const { id, email } = user;
    return {
      id,
      email,
      token: this.jwtService.sign({ id: id, email: email }),
    }
  }
}