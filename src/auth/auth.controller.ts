import {
  Body,
  Controller,
  ExecutionContext,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthCredentialsDto } from "./dto/auth-credentials.dto"
import { AuthGuard } from "@nestjs/passport"
import { GetUser } from "./get-user.decorator"
import { User } from "./user.entity"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private logger = new Logger("AuthController")

  @Post("/signup")
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signup(authCredentialsDto)
  }

  @Post("/signin")
  @UsePipes(ValidationPipe)
  signin(@Body() authCredentialsDto: AuthCredentialsDto): object {
    this.logger.log(`Login attempted with id ${authCredentialsDto.username}`)
    return this.authService.signin(authCredentialsDto)
  }
}
