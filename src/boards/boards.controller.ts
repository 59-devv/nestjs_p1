import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { BoardsService } from "./boards.service"
import { Board, BoardStatus } from "./boards.model"
import { CreateBoardDto } from "./dto/create-board.dto"
import { BoardStatusValidationPipe } from "./pipe/board-status-validation.pipe"

@Controller("boards")
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get()
  getAllBoards(): Array<Board> {
    return this.boardService.getAllBoards()
  }

  @Post()
  @UsePipes(ValidationPipe)
  crateBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardService.createBoard(createBoardDto)
  }

  @Get("/:id")
  getBoardById(@Param("id") id): Board {
    return this.boardService.getBoardById(id)
  }

  @Delete("/:id")
  deleteBoardById(@Param("id") id): void {
    this.boardService.deleteBoardById(id)
  }

  @Patch("/:id/status")
  updateBoardStatus(@Param("id") id: string, @Body("status", BoardStatusValidationPipe) status: BoardStatus): Board {
    return this.boardService.updateBoardStatusById(id, status)
  }
}
