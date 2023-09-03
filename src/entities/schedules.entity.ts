import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate, User } from "./index";

@Entity("schedules")
export class Schedule {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "date"})
    date: string;

    @Column({type: "time"})
    hour: string;
    
    @ManyToOne(() => RealEstate, (rs) => rs.schedule)
    @JoinColumn()
    realEstate: RealEstate

    @ManyToOne(() => User, (u) => u.schedule)
    @JoinColumn()
    user: User
}