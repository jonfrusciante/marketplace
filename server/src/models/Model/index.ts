import * as uuid from 'uuid/v4';
import { BaseEntity } from 'typeorm';

export default class Model extends BaseEntity {
	public lowercase(str: string): string {
		return str.toLowerCase();
	}

	public genUuid(): string {
		return uuid();
	}

	public genSlug(name: string): string {
		return `${name
			.replace(/[^a-zA-Z]+/gi, '')
			.split(' ')
			.join('-')
			.toLowerCase()}-${this.genUuid().substring(0, 8)}`;
	}
}
