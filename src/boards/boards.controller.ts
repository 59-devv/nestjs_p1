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
import { UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { GetUser } from "src/auth/get-user.decorator"
import { User } from "src/auth/user.entity"

@Controller("boards")
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get()
  getAllBoards(): Promise<Array<Board>> {
    const result = this.boardService.getAllBoards()
    return result
  }

  @Post()
  @UsePipes(ValidationPipe)
  crateBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user)
  }

  @Delete("/:id")
  deleteBoard(@Param("id", ParseIntPipe) id, @GetUser() user: User): Promise<any> {
    return this.boardService.deleteBoard(id, user)
  }

  @Patch("/:id/status")
  updateBoardStatus(
    @Param("id", ParseIntPipe) id,
    @Body("status", BoardStatusValidationPipe) status: BoardStatus
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status)
  }

  @Get("/user")
  getUserBoards(@GetUser() user): Promise<Array<Board>> {
    return this.boardService.getUserBoards(user)
  }
}
