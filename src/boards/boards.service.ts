import { Injectable, NotFoundException } from "@nestjs/common"
import { Board, BoardStatus } from "./boards.model"
import { v1 as uuid } from "uuid"
import { CreateBoardDto } from "./dto/create-board.dto"

@Injectable()
export class BoardsService {
  private boards: Array<Board> = []

  // 전체 게시글 가져오기
  getAllBoards(): Array<Board> {
    return this.boards
  }

  // 게시글 작성하기
  createBoard(createBoardDto: CreateBoardDto) {
    const board: Board = {
      id: uuid(),
      title: createBoardDto.title,
      description: createBoardDto.description,
      status: BoardStatus.PUBLIC,
    }

    this.boards.push(board)
    return board
  }

  // ID로 게시글 가져오기
  getBoardById(id: string): Board {
    const board: Board = this.boards.find((board) => board.id === id)

    if (!board) {
      throw new NotFoundException(`id not exists(${id})`)
    }

    return board
  }

  // 게시글 삭제하기
  deleteBoardById(id: string) {
    const foundBoard: Board = this.getBoardById(id)

    if (!foundBoard) {
      throw new NotFoundException("Board Not Found")
    }

    this.boards.filter((board) => board.id !== foundBoard.id)
  }

  // 게시글 상태 수정하기
  updateBoardStatusById(id: string, status: BoardStatus): Board {
    const board = this.boards.find((board) => board.id === id)
    board.status = status

    return board
  }
}
