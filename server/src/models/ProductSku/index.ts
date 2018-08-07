import * as uuid from 'uuid/v4';
import {
	Entity,
	PrimaryColumn,
	Column,
	BaseEntity,
	BeforeInsert,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	VersionColumn,
} from 'typeorm';

/*
quantity: number,
active: boolean,
price: number(Cents),
salePrice?: number(Cents),
saleStartDate?: Date(ISO),
saleEndDate?: Date(ISO),
size?: string,
color?: string,
description: string
*/

import { Product } from '..';

@Entity('productSku')
export default class ProductSku extends BaseEntity {
	@PrimaryColumn('uuid') id: string;

	@Column('varchar', { length: 255, nullable: false })
	productId: string;

	@Column('varchar', { length: 255, nullable: false })
	name: string;

	@Column('varchar', { length: 255, nullable: false, unique: true })
	slug: string;

	@Column({ type: 'int', width: 11, nullable: false })
	stock: number;

	@Column('varchar', { length: 255, nullable: true })
	color: string;

	@Column('varchar', { length: 255, nullable: true })
	size: string;

	@Column('int', { width: 11, nullable: false })
	price: number;

	@Column('int', { width: 11, nullable: true })
	shippingPrice: number;

	@Column('int', { width: 11, nullable: true })
	salePrice: number;

	@Column({ nullable: true })
	saleStartDate: Date;

	@Column({ nullable: true })
	saleEndDate: Date;

	@Column('text', { nullable: false })
	description: string;

	@Column('tinyint', { width: 1, default: 1, nullable: false })
	active: boolean;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@VersionColumn({ default: 1 })
	version: number;

	@ManyToOne(() => Product, product => product.id, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	product: Product;

	@BeforeInsert()
	addId() {
		this.id = uuid();
	}
}
