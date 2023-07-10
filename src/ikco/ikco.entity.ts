import { Content } from "src/interface/content.interface";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ObjectId, UpdateDateColumn } from "typeorm";
@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: ObjectId;
    @Column()
    car_name: string;
    @Column()
    mechanical: Content;
    @Column()
    Injector: Content;
    @Column()
    Wiring: Content;
    @Column()
    Engine: Content;
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date
}