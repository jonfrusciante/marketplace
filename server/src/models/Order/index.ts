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

import { User, OrderProduct } from '..';

enum Status {
	'Processing',
	'In Transit',
	'Complete',
	'Canceled',
}

@Entity('order')
export default class Order extends BaseEntity {
	@PrimaryColumn('uuid') id: string;

	@Column('varchar', { length: 255, nullable: false })
	userId: string;

	@Column('varchar', { length: 255, nullable: false })
	productSkuId: string;

	@Column('date') initiatedDate: Date;

	@Column('date') completedDate: Date;

	@Column('text', { nullable: false })
	description: string;

	@Column('enum', {
		enum: ['Processing', 'In Transit', 'Complete', 'Canceled'],
		default: 'Processing',
		nullable: false,
	})
	status: Status;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@VersionColumn({ default: 1 })
	version: number;

	@ManyToMany(() => User, user => user.id, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	user: User[];

	@ManyToMany(() => OrderProduct, orderProduct => orderProduct.orderId, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	orderProduct: OrderProduct[];

	@BeforeInsert()
	addId() {
		this.id = uuid();
	}
}
