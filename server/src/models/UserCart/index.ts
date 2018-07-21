import * as uuid from 'uuid/v4';
import {
	Entity,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	VersionColumn,
	PrimaryColumn,
	BeforeInsert,
} from 'typeorm';

import { User } from '..';

@Entity('userCart')
class UserCart extends BaseEntity {
	@PrimaryColumn('uuid') id: string;

	@Column('varchar', { length: 255, nullable: false, unique: true })
	userId: string;

	@Column('text') cart: string;

	@Column('text') wishlist: string;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@VersionColumn({ default: 1 })
	version: number;

	@OneToOne(() => User, user => user.id, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	user: User;

	@BeforeInsert()
	addId() {
		this.id = uuid();
	}
}

export { UserCart };
