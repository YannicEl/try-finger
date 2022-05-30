export class Timer {
    t1;
    constructor() {
        this.t1 = Date.now();
    }
    time() {
        return Date.now() - this.t1;
    }
}
