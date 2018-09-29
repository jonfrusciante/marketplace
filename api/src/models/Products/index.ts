import {
	Entity,
	PrimaryColumn,
	Column,
	BeforeInsert,
	CreateDateColumn,
	UpdateDateColumn,
	VersionColumn,
} from 'typeorm';

/*
	id: uuid;
	name: string;
	vendorId: string;
	slug: string;
	active: boolean;
	description: string;
	images: [
		ImageId(Generated): {
			imageUrl: string,
			featured(Only 1): boolean
		}
	];
*/

import { Model } from '..';

@Entity('products')
export default class Products extends Model {
	@PrimaryColumn('uuid')
	id: string;

	@Column('varchar', { length: 255, nullable: false })
	name: string;

	@Column('varchar', { length: 255, nullable: false })
	vendorId: string;

	@Column('varchar', { length: 255, nullable: false, unique: true })
	slug: string;

	@Column('tinyint', { width: 1, default: 1, nullable: false })
	active: boolean;

	@Column('text', { nullable: false })
	description: string;

	@Column('text', { nullable: false })
	variants: string;

	@Column('text', { nullable: false })
	images: string;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@VersionColumn({ default: 1 })
	version: number;

	@BeforeInsert()
	addId() {
		this.id = this.genUuid();
		this.slug = this.genSlug(this.name);
	}
}
