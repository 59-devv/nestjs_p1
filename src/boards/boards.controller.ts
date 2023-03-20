import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { BoardsService } from "./boards.service"
import { BoardStatus } from "./board-status.enum"
import { CreateBoardDto } from "./dto/create-board.dto"
import { BoardStatusValidationPipe } from "./pipe/board-status-validation.pipe"
import { Board } from "./board.entity"

@Controller("boards")
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get()
  getAllBoards(): Promise<Array<Board>> {
    const result = this.boardService.getAllBoards()
    return result
  }

  @Post()
  @UsePipes(ValidationPipe)
  crateBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto)
  }

  @Delete("/:id")
  deleteBoard(@Param("id", ParseIntPipe) id): Promise<any> {
    return this.boardService.deleteBoard(id)
  }

  @Patch("/:id/status")
  updateBoardStatus(
    @Param("id", ParseIntPipe) id,
    @Body("status", BoardStatusValidationPipe) status: BoardStatus
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status)
  }

  // @Get("/:id")
  // getBoardById(@Param("id") id): Board {
  //   return this.boardService.getBoardById(id)
  // }

  // @Delete("/:id")
  // deleteBoardById(@Param("id") id): void {
  //   this.boardService.deleteBoardById(id)
  // }

  // @Patch("/:id/status")
  // updateBoardStatus(@Param("id") id: string, @Body("status", BoardStatusValidationPipe) status: BoardStatus): Board {
  //   return this.boardService.updateBoardStatusById(id, status)
  // }
}
