import { Injectable, Logger, NotFoundException } from "@nestjs/common"
import { CreateBoardDto } from "./dto/create-board.dto"
import { BoardStatus } from "./board-status.enum"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Board } from "./board.entity"
import { User } from "src/auth/user.entity"

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(Board) private readonly boardRepository: Repository<Board>) {}
  private logger = new Logger("BoardController")

  // 전체 게시글 가져오기
  async getAllBoards(): Promise<Array<Board>> {
    const boards = await this.boardRepository.find()
    return boards
  }

  // 게시글 작성하기
  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const board = this.boardRepository.create(createBoardDto)
    board.user = user
    return await this.boardRepository.save(board)
  }

  // 게시글 삭제하기
  async deleteBoard(id: number, user: User): Promise<any> {
    const board = await this.boardRepository.findOneBy({ id: id, deletedAt: null })
    const result = await this.boardRepository.softDelete(id)

    if (!board) {
      throw new NotFoundException(`Can't find board with id ${id}`)
    } else if (result.affected === 0) {
      throw new NotFoundException(`Can't find board with id ${id}`)
    } else if (board.user.id !== user.id) {
      throw new NotFoundException(`Only can delete owner's board`)
    }

    this.logger.log(`User ${user.id} deleted board ${board.id}`)
    return result
  }

  // 게시글 수정하기
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id: id, deletedAt: null })
    console.log(board)

    if (!board) {
      throw new NotFoundException(`Can't find board with id ${id}`)
    }

    board.status = status
    await this.boardRepository.save(board)

    this.logger.log(`Board ${id} status updated.`)
    return board
  }

  // 로그인 한 유저의 게시글만 가져오기
  async getUserBoards(user: User): Promise<Array<Board>> {
    // 방법1 (ORM 기반으로 데이터를 내려주므로 board와 연관된 user 객체도 같이 반환해줌)
    const boards = await this.boardRepository.findBy({ user: { id: user.id } })

    // 방법2 (쿼리를 기반으로 데이터를 내려주므로 연관된 user 객체는 반환하지 않음)
    // const query = this.boardRepository.createQueryBuilder("board")
    // const boards = await query.where("board.userId = :userId", { userId: user.id }).getMany()

    return boards
  }
}
