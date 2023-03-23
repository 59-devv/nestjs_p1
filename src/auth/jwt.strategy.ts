import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { InjectRepository } from "@nestjs/typeorm"
import { ExtractJwt, Strategy } from "passport-jwt"
import { User } from "./user.entity"
import { Repository } from "typeorm"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super({
      secretOrKey: "secret",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate(payload) {
    const { username } = payload
    const user: User = await this.userRepository.findOneBy({ username: username })

    if (!user) {
      throw new UnauthorizedException("user not found")
    }

    return user
  }
}
