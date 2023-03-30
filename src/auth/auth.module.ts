import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { User } from "./user.entity"
import { TypeOrmModule } from "@nestjs/typeorm"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { JwtStrategy } from "./jwt.strategy"
import { ConfigService } from "@nestjs/config"

const configService: ConfigService = new ConfigService()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: configService.get("JWT_SECRET"),
      signOptions: {
        expiresIn: configService.get("JWT_EXPIRES_IN"),
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
