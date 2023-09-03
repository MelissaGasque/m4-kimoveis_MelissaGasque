import { Schedule } from './schedules.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address, Category } from "./index"

@Entity("realEstates")
export class RealEstate {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({default:false})
    sold: boolean;

    @Column({type: 'decimal', precision: 12, scale: 2, default: 0})
    value: number | (() => string);

    @Column()
    size: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Address, (ad) => ad.realEstate)
    @JoinColumn()
    address: Address;

    @ManyToOne(() => Category, (cat) => cat.realEstate)
    @JoinColumn()
    category: Category;

    @OneToMany(() => Schedule, (s) => s.realEstate)
    schedule: Array<Schedule>
}