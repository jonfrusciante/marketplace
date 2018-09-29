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

import { Model, Products, Category } from '..';

@Entity('categoryProducts')
export default class CategoryProducts extends Model {
	@PrimaryColumn('uuid')
	id: string;

	@Column('varchar', { length: 255, nullable: false })
	productId: string;

	@Column('varchar', { length: 255, nullable: false })
	categoryId: string;

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

	@ManyToMany(() => Category, category => category.id, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	category: Category[];

	@BeforeInsert()
	addId() {
		this.id = this.genUuid();
	}
}
