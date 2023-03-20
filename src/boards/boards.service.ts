import { Injectable, NotFoundException } from "@nestjs/common"
import { v1 as uuid } from "uuid"
import { CreateBoardDto } from "./dto/create-board.dto"
import { BoardStatus } from "./board-status.enum"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Board } from "./board.entity"

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(Board) private readonly boardRepository: Repository<Board>) {}

  // 전체 게시글 가져오기
  async getAllBoards(): Promise<Array<Board>> {
    const boards = await this.boardRepository.find()
    return boards
  }

  // 게시글 작성하기
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = this.boardRepository.create(createBoardDto)
    return await this.boardRepository.save(board)
  }

  // 게시글 삭제하기
  async deleteBoard(id: number): Promise<any> {
    const result = await this.boardRepository.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find board with id ${id}`)
    }
    return result
  }

  // 게시글 수정하기
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id: id })
    console.log(board)

    if (!board) {
      throw new NotFoundException(`Can't find board with id ${id}`)
    }

    board.status = status
    await this.boardRepository.save(board)
    return board
  }
  // constructor(private readonly boardRepository: BoardRepository) {}
  // // 전체 게시글 가져오기
  // getAllBoards(): Array<Board> {
  //   return this.boards
  // }
  // // 게시글 작성하기
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const board: Board = {
  //     id: uuid(),
  //     title: createBoardDto.title,
  //     description: createBoardDto.description,
  //     status: BoardStatus.PUBLIC,
  //   }
  //   this.boards.push(board)
  //   return board
  // }
  // // ID로 게시글 가져오기
  // getBoardById(id: string): Board {
  //   const board: Board = this.boards.find((board) => board.id === id)
  //   if (!board) {
  //     throw new NotFoundException(`id not exists(${id})`)
  //   }
  //   return board
  // }
  // // 게시글 삭제하기
  // deleteBoardById(id: string) {
  //   const foundBoard: Board = this.getBoardById(id)
  //   if (!foundBoard) {
  //     throw new NotFoundException("Board Not Found")
  //   }
  //   this.boards.filter((board) => board.id !== foundBoard.id)
  // }
  // // 게시글 상태 수정하기
  // updateBoardStatusById(id: string, status: BoardStatus): Board {
  //   const board = this.boards.find((board) => board.id === id)
  //   board.status = status
  //   return board
  // }
}
