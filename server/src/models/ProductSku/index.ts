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

	@Column('varchar', { length: 255 })
	color: string;

	@Column('varchar', { length: 255 })
	size: string;

	@Column('int', { width: 11 })
	price: number;

	@Column('text', { nullable: false })
	description: string;

	@Column('tinyint', { width: 1, default: 0, nullable: false })
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
