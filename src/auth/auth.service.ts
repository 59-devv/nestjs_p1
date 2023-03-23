import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common"
import { Repository } from "typeorm"
import { User } from "./user.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { AuthCredentialsDto } from "./dto/auth-credentials.dto"
import * as bcrypt from "bcryptjs"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  public async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const salt = await bcrypt.genSalt()
    console.log("salt", salt)
    const hashedPassword = await bcrypt.hash(authCredentialsDto.password, salt)

    const user = this.userRepository.create({
      username: authCredentialsDto.username,
      password: hashedPassword,
    })

    try {
      await this.userRepository.save(user)
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new ConflictException("Existing username")
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  public async signin(authCredentialsDto: AuthCredentialsDto): Promise<object> {
    const user = await this.userRepository.findOneBy({ username: authCredentialsDto.username })

    if (!user) {
      throw new NotFoundException("user not found")
    }

    const result = await bcrypt.compare(authCredentialsDto.password, user.password)

    if (result) {
      // JWT 토큰 생성
      const payload = { username: user.username, id: user.id }
      const accessToken = await this.jwtService.sign(payload)

      return { accessToken: accessToken }
    } else {
      throw new BadRequestException("invalid password")
    }
  }
}
