import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ObjectId, UpdateDateColumn } from "typeorm";
@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: ObjectId;
    @Column({ nullable: true })
    car_name: string;
    @Column({ nullable: false, unique: true })
    mechanical: string;
    @Column({ nullable: false })
    Injector: string;
    @Column({ nullable: false })
    Wiring: string;
    @Column({ default: "" })
    Engine: string;
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date
}