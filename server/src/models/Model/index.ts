import * as uuid from 'uuid/v4'
import {
	BaseEntity,
} from 'typeorm';

class Model extends BaseEntity {
	public lowercase(str: string): string {
		return str.toLowerCase();
	}

	public genUuid() {
		return uuid();
	}
}

export { Model };
