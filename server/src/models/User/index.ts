import * as uuid from 'uuid/v4';
import {
	Entity,
	PrimaryColumn,
	Column,
	BaseEntity,
	BeforeInsert,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
	@PrimaryColumn('uuid') id: string;

	@Column('varchar', { length: 255, unique: true, nullable: false })
	username: string;

	@Column('varchar', { length: 255, unique: true, nullable: false })
	email: string;

	@Column('varchar', { length: 255, nullable: false })
	password: string;

	@Column('varchar', { length: 255, nullable: false })
	firstName: string;

	@Column('varchar', { length: 255, nullable: false })
	lastName: string;

	@Column('tinyint', { width: 1, default: 0, nullable: false })
	confirmed: boolean;

	@BeforeInsert()
	addId() {
		this.id = uuid();
	}
	lowercase() {
		this.email = this.email.toLowerCase();
		this.username = this.username.toLowerCase();
	}
}
