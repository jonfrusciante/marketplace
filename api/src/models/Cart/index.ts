import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	VersionColumn,
	PrimaryColumn,
	BeforeInsert,
} from 'typeorm';

import { Model, Users } from '..';

@Entity('cart')
export default class Cart extends Model {
	@PrimaryColumn('uuid')
	id: string;

	@Column('varchar', { length: 255, nullable: false, unique: true })
	userId: string;

	@Column('text')
	cart: string;

	@Column('text')
	wishlist: string;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@VersionColumn({ default: 1 })
	version: number;

	@OneToOne(() => Users, user => user.id, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	user: Users;

	@BeforeInsert()
	genId() {
		this.id = this.genUuid();
	}
}
