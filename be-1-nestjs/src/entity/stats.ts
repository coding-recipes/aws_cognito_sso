import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';


@Entity('stats')
export class Stats extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
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
  createdDate: string;

  @UpdateDateColumn({ name: 'modified_date', type: 'datetime' })
  lastModifiedDate: string;
}


// @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.categories)
// questionnaire: Questionnaire;

// @OneToMany(() => Question, (question) => question.category)
// questions: Question[];