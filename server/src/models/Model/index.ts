import * as uuid from 'uuid/v4';
import { BaseEntity } from 'typeorm';

export default class Model extends BaseEntity {
	public lowercase(str: string): string {
		return str.toLowerCase();
	}

	public genUuid() {
		return uuid();
	}
}
