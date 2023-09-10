export class Position {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    offset(): bigint {
        let num = 8 * this.x + this.y
        return BigInt(2 << (num-1))
    }

    value(): number {
        return this.x-1 + 8*(-this.y-1)
    }
}