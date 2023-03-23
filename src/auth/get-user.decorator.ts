import { ExecutionContext, createParamDecorator } from "@nestjs/common"
import { User } from "./user.entity"

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  const user: User = req.user
  return user
})
