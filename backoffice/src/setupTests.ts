type Key = string;
type Value = string;

class LocalStorageMock {
	public store: object;

	constructor() {
		this.store = {};
	}

	clear() {
		this.store = {};
	}

	getItem(key: Key) {
		return this.store[key] || null;
	}

	setItem(key: Key, value: Value) {
		this.store[key] = value.toString();
	}

	removeItem(key: Key) {
		delete this.store[key];
	}
}

Object.defineProperty(window, 'localStorage', {
	value: new LocalStorageMock(),
});
