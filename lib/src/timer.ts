export class Timer {
	private t1: number;

	constructor() {
		this.t1 = Date.now();
	}

	public time(): number {
		return Date.now() - this.t1;
	}
}
