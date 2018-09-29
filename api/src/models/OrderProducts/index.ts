import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	VersionColumn,
	PrimaryColumn,
	BeforeInsert,
} from 'typeorm';

import { Model, Products, Orders } from '..';

@Entity('orderProducts')
export default class OrderProducts extends Model {
	@PrimaryColumn('uuid')
	id: string;

	@Column('varchar', { length: 255, nullable: false })
	productId: string;

	@Column('varchar', { length: 255, nullable: false })
	orderId: string;

	@Column({ type: 'int', width: 11, nullable: false })
	quantity: number;

	@Column('date')
	shippedDate: Date;

	@Column('date')
	deliveredDate: Date;

	@Column('varchar', { length: 255, nullable: false })
	shippingCompany: string;

	@Column({ type: 'int', width: 11 })
	shippingCost: number;

	@Column({ type: 'int', width: 11 })
	totalCost: number;

	@Column('text', { nullable: false })
	description: string;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@VersionColumn({ default: 1 })
	version: number;

	@ManyToMany(() => Products, product => product.id, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	product: Products[];

	@ManyToMany(() => Orders, order => order.id, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	order: Orders[];

	@BeforeInsert()
	addId() {
		this.id = this.genUuid();
	}
}
