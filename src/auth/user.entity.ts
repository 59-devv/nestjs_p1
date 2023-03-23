import { Board } from "src/boards/board.entity"
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm"

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @Column()
  username: string

  @Column({ select: false })
  password: string

  @OneToMany(() => Board, (board) => board.user)
  boards: Array<Board>
}
