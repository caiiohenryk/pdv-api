import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"
import "reflect-metadata";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 100
    })
    nome: string;

    @Column()
    email: string;

    @Column({
        length: 50
    })
    password: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @Column()
    hasActivePayment: boolean;
}