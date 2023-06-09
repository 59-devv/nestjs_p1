import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { BoardStatus } from "./board-status.enum"
import { User } from "src/auth/user.entity"

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: BoardStatus = BoardStatus.PUBLIC

  @ManyToOne(() => User, (user) => user.boards, { eager: true })
  user: User
}
