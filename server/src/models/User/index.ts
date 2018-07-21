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

import { Model, UserCart, Order } from '..';

enum Role {
	'Admin',
	'Vendor',
	'Customer'
}

enum Gender {
	'Male',
	'Female',
}
@Entity('user')
class User extends Model {
	@PrimaryColumn('uuid') id: string;

	@Column('varchar', { length: 255, unique: true, nullable: false })
	username: string;

	@Column('varchar', { length: 255, unique: true, nullable: false })
	email: string;

	@Column('varchar', { length: 255, nullable: false })
	password: string;

	@Column('varchar', { length: 255, nullable: false })
	firstName: string;

	@Column('varchar', { length: 255, nullable: false })
	lastName: string;

	@Column('date', { nullable: false })
	DOB: Date;

	@Column('enum', { enum: ['Male', 'Female'], nullable: false })
	gender: Gender;

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

	@OneToOne(() => UserCart, userCart => userCart.userId, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	userCart: UserCart;

	@OneToMany(() => Order, order => order.id, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	order: Order[];

	@BeforeInsert()
	genId() {
		this.id = this.genUuid();
	}
}

export { User };
