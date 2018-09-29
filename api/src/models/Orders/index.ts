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

import { Model, Users, OrderProducts } from '..';

enum Status {
	'Processing',
	'In Transit',
	'Complete',
	'Canceled',
}

@Entity('orders')
export default class Orders extends Model {
	@PrimaryColumn('uuid')
	id: string;

	@Column('varchar', { length: 255, nullable: false })
	userId: string;

	@Column('varchar', { length: 255, nullable: false })
	productSkuId: string;

	@Column('date')
	initiatedDate: Date;

	@Column('date')
	completedDate: Date;

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

	@ManyToMany(() => Users, user => user.id, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	user: Users[];

	@ManyToMany(() => OrderProducts, orderProduct => orderProduct.orderId, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	orderProduct: OrderProducts[];

	@BeforeInsert()
	addId() {
		this.id = this.genUuid();
	}
}
