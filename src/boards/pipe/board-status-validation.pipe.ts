import { BadRequestException, PipeTransform } from "@nestjs/common"
import { BoardStatus } from "../board-status.enum"

export class BoardStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    const status: string = value.toUpperCase()

    if (!(status in BoardStatus)) {
      throw new BadRequestException("status not in type")
    }

    return status
  }
}
