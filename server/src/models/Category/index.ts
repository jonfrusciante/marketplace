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

import { CategoryProduct } from '..';

@Entity('category')
export default class Category extends BaseEntity {
	@PrimaryColumn('uuid') id: string;

	@Column('varchar', { length: 255, nullable: false, unique: true })
	name: string;

	@Column('varchar', { length: 255, nullable: false, unique: true })
	slug: string;

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

	@ManyToMany(
		() => CategoryProduct,
		categoryProduct => categoryProduct.categoryId,
		{
			cascade: true,
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		}
	)
	categoryProduct: CategoryProduct[];

	@BeforeInsert()
	addId() {
		this.id = uuid();
	}
}
