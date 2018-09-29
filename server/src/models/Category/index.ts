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

import { Model, CategoryProducts } from '..';

@Entity('category')
export default class Category extends Model {
	@PrimaryColumn('uuid')
	id: string;

	@Column('varchar', { length: 255, nullable: false, unique: true })
	name: string;

	@Column('varchar', { length: 255, nullable: false, unique: true })
	slug: string;

	@Column('tinyint', { width: 1, default: 1, nullable: false })
	active: boolean;

	@Column('varchar', { length: 255, nullable: true })
	parentId: string;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@VersionColumn({ default: 1 })
	version: number;

	@ManyToMany(
		() => CategoryProducts,
		categoryProduct => categoryProduct.categoryId,
		{
			cascade: true,
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		}
	)
	categoryProduct: CategoryProducts[];

	@BeforeInsert()
	addId() {
		this.id = this.genUuid();
		this.slug = this.genSlug(this.name);
	}
}
