import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('stats')
// @Unique(['kpi', 'period'])
export class Stat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, })
  kpi: string;

  @Column({ type: 'varchar', length: 12, unique: false })
  period: string;

  @Column()
  year: number;

  @Column()
  month: number;

  @Column({ type: 'float' })
  value: number;

  @CreateDateColumn({ name: 'created_date', type: 'datetime' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'modified_date', type: 'datetime' })
  modifiedDate: Date;
}
