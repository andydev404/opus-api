import * as bcrypt from 'bcrypt';
import { AuthService } from "./../auth/auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtAuthGuard } from "./../auth/guards/jwt-auth.guard";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { QueryParams } from "../../framework/utils/query";
import { ApiTags, ApiHeader, ApiBearerAuth } from "@nestjs/swagger";
import { ResponseInterceptor } from 'framework/interceptors/response.interceptor';

@ApiTags("Users")
@Controller("users")
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() params: QueryParams) {
    return this.usersService.findAll(params);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto) {
    const getUser = await this.usersService.findByEmail(loginUserDto.email);
    if (getUser) {
      const { password, ...result } = getUser;
      const isValid = await bcrypt.compare(loginUserDto.password, password);
      if (isValid) {
        const authDto = {
          email: result.email,
          userId: result.id,
        };
        const token = await this.authService.login(authDto);
        return {
          user: result,
          ...token,
        };
      }
    }
    return null;
  }
}