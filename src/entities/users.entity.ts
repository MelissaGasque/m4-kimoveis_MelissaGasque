import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Schedule } from "./index"
import { getRounds, hashSync } from "bcryptjs";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 45 })
    name: string;

    @Column({ length: 45, unique:true })
    email: string;

    @Column({default:false})
    admin: boolean;

    @Column({length: 120})
    password: string;

    @CreateDateColumn({ type: "date" })
    createdAt: string;

    @UpdateDateColumn({ type: "date" })
    updatedAt: string;

    @DeleteDateColumn({ type: "date"})
    deletedAt: string | null;

    @OneToMany(() => Schedule, (s) => s.user)
    schedule: Array<Schedule>

    @BeforeInsert() //Antes de inserir
    @BeforeUpdate() //Antes de atualizar no banco de dados
    //será executado o método abaixo
    hashPassword(){
        const hasRounds: number = getRounds(this.password)
        if(!hasRounds){
            this.password = hashSync(this.password, 10)
        }
    }
}