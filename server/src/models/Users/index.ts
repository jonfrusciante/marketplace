import {
	Entity,
	PrimaryColumn,
	Column,
	BeforeInsert,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	OneToMany,
	VersionColumn,
} from 'typeorm';

import { Model, Cart, Orders } from '..';

enum Role {
	'Admin',
	'Vendor',
	'Customer',
}

@Entity('users')
export default class Users extends Model {
	@PrimaryColumn('uuid')
	id: string;

	@Column('varchar', { length: 255, nullable: false })
	name: string;

	@Column('varchar', { length: 255, unique: true, nullable: false })
	email: string;

	@Column('varchar', { length: 255, nullable: false })
	password: string;

	@Column('enum', {
		enum: ['Admin', 'Vendor', 'Customer'],
		default: 'Customer',
		nullable: false,
	})
	role: Role;

	@Column('tinyint', { width: 1, default: 0, nullable: false })
	confirmed: boolean;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@VersionColumn({ default: 1 })
	version: number;

	@OneToOne(() => Cart, cart => cart.userId, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	cart: Cart;

	@OneToMany(() => Orders, order => order.id, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	order: Orders[];

	@BeforeInsert()
	genId() {
		this.id = this.genUuid();
	}
}
