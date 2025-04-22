import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"
import "reflect-metadata";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 100
    })
    nome: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn()
    @Exclude()
    createdAt: Date;
    
    @Column({
        default: false
    })
    hasActivePayment: boolean;
}