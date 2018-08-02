import * as uuid from 'uuid/v4';
import {
	Entity,
	PrimaryColumn,
	Column,
	BaseEntity,
	BeforeInsert,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	VersionColumn,
} from 'typeorm';

import { ProductSku } from '..';

@Entity('product')
export default class Product extends BaseEntity {
	@PrimaryColumn('uuid') id: string;

	@Column('varchar', { length: 255, nullable: false })
	name: string;

	@Column('varchar', { length: 255, nullable: false })
	vendorId: string;

	@Column('varchar', { length: 255, nullable: false, unique: true })
	slug: string;

	@Column('tinyint', { width: 1, default: 0, nullable: false })
	active: boolean;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@VersionColumn({ default: 1 })
	version: number;

	@ManyToMany(() => ProductSku, productSku => productSku.productId, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	productSku: ProductSku[];

	@BeforeInsert()
	addId() {
		this.id = uuid();
	}
}
