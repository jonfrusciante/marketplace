import * as uuid from 'uuid/v4';
import {
	Entity,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	VersionColumn,
	PrimaryColumn,
	BeforeInsert,
} from 'typeorm';

import { ProductSku, Order } from '..';

@Entity('orderProduct')
export default class OrderProduct extends BaseEntity {
	@PrimaryColumn('uuid') id: string;

	@Column('varchar', { length: 255, nullable: false })
	productSkuId: string;

	@Column('varchar', { length: 255, nullable: false })
	orderId: string;

	@Column({ type: 'int', width: 11, nullable: false })
	quantity: number;

	@Column('date') shippedDate: Date;

	@Column('date') deliveredDate: Date;

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

	@ManyToMany(() => ProductSku, productSku => productSku.id, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	productSku: ProductSku[];

	@ManyToMany(() => Order, order => order.id, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	order: Order[];

	@BeforeInsert()
	addId() {
		this.id = uuid();
	}
}
