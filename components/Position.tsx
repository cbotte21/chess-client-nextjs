export class Position {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    offset(): number {
        let num = 8 * (this.x-1) + this.y - 1
        return Number(BigInt(2 << (num-1)) % BigInt(8589934592)) // 2 << 32
    }

    value(): number {
        return (this.x-1)*8+this.y-1
    }

    equals(position: Position): boolean {
        return position.value() == this.value()
    }
}