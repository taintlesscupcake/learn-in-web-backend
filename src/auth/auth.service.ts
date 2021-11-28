import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return this.generateTokens(user);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('No user found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException('Wrong password');
    }

    return this.generateTokens(user);
  }

  validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  getUserFromToken(token: string) {
    console.log(token);
    const user = this.jwtService.decode(token);
    return this.prisma.user.findUnique({ where: { id: user['id'] } });
  }

  generateTokens(user: User) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async refreshTokens(token: string) {
    const _user = await this.getUserFromToken(token);
    const user = {
      id: _user.id,
      name: _user.name,
      email: _user.email,
      password: _user.password,
      role: _user.role,
    };
    return this.generateTokens(user);
  }

  async deleteUser(userId: string) {
    return this.prisma.user.delete({ where: { id: userId } });
  }

  async updateUser(token: string, name: string, email?: string) {
    return this.prisma.user.update({
      where: { id: (await this.getUserFromToken(token)).id },
      data: {
        name: name,
        email: email,
      },
    });
  }

  async updatePassword(token: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.update({
      where: { id: (await this.getUserFromToken(token)).id },
      data: {
        password: hashedPassword,
      },
    });
  }

  async AmIAdmin(token: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: (await this.getUserFromToken(token)).id },
    });
    if (user.role === 'ADMIN') {
      return true;
    } else {
      return false;
    }
  }

  async _changeUserPassword(
    token: string,
    userId: string,
    name?: string,
    email?: string,
    password?: string,
  ) {
    if (this.AmIAdmin(token)) {
      const hashedPassword = await bcrypt.hash(password, 10);
      return this.prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedPassword,
        },
      });
    } else {
      throw new BadRequestException('You are not admin');
    }
  }

  // return the newly saved user
}
