import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { JournalEntryLine } from './journal-entry-line.entity';
import { JournalEntryStatus } from '../constants/journal-entry-status.enum';

@Entity('journal_entries')
export class JournalEntry {
    @ApiProperty({ example: 1, description: 'Journal Entry ID' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 1, description: 'Company ID' })
    @Column({ type: 'int' })
    company_id: number;

    @ApiProperty({ example: 'JE-2024-0001', description: 'Unique entry number' })
    @Column({ type: 'varchar', length: 100 })
    entry_number: string;

    @ApiProperty({ example: '2024-01-15', description: 'Date of the entry' })
    @Column({ type: 'date' })
    entry_date: Date;

    @ApiProperty({
        example: 'Monthly payroll expense',
        description: 'Optional description',
        required: false,
        nullable: true,
    })
    @Column({ type: 'text', nullable: true })
    description?: string;

    @ApiProperty({
        example: JournalEntryStatus.DRAFT,
        description: 'Entry status',
        enum: JournalEntryStatus,
        default: JournalEntryStatus.DRAFT,
    })
    @Column({
        type: 'enum',
        enum: JournalEntryStatus,
        default: JournalEntryStatus.DRAFT,
    })
    status: JournalEntryStatus;

    @ApiProperty({ example: 1500.0, description: 'Total debit amount' })
    @Column({ type: 'decimal', precision: 15, scale: 2 })
    total_debit: number;

    @ApiProperty({ example: 1500.0, description: 'Total credit amount' })
    @Column({ type: 'decimal', precision: 15, scale: 2 })
    total_credit: number;

    @ApiProperty({
        example: 'ORDER',
        description: 'Reference type (e.g. ORDER, PAYMENT, PAYROLL)',
        required: false,
        nullable: true,
    })
    @Column({ type: 'varchar', length: 50, nullable: true })
    reference_type?: string;

    @ApiProperty({
        example: 42,
        description: 'ID of the referenced object',
        required: false,
        nullable: true,
    })
    @Column({ type: 'int', nullable: true })
    reference_id?: number;

    @ApiProperty({ example: '2024-01-01T00:00:00Z', description: 'Creation date' })
    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Company)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @OneToMany(() => JournalEntryLine, (line) => line.journal_entry, {
        cascade: true,
    })
    lines: JournalEntryLine[];
}
