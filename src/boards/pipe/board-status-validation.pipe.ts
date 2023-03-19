import { BadRequestException, PipeTransform } from "@nestjs/common"
import { BoardStatus } from "../boards.model"

export class BoardStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    const status: string = value.toUpperCase()

    if (!(status in BoardStatus)) {
      throw new BadRequestException("status not in type")
    }

    return status
  }
}
