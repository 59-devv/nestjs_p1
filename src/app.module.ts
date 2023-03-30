import { Module } from "@nestjs/common"
import { BoardsModule } from "./boards/boards.module"
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { AuthModule } from "./auth/auth.module"
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA,
      entities: ["dist/**/*.entity.js"],
      synchronize: true,
    }),
    BoardsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
