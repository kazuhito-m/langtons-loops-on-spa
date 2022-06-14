import { CellTypes } from "./CellTypes";

export class Rect {
    constructor(
        private readonly x: number,
        private readonly y: number,
        private readonly w: number,
        private readonly h: number,
        private readonly retio: number,
        public readonly colorType: number
    ) { }

    private static CELL_TYPES = new CellTypes();

    public expandSideways(): Rect {
        return new Rect(
            this.x,
            this.y,
            this.w + 1,
            this.h,
            this.retio,
            this.colorType
        );
    }

    public calcX(): number { return this.x * this.retio; }
    public calcY(): number { return this.y * this.retio; }
    public calcW(): number { return this.w * this.retio; }
    public calcH(): number { return this.h * this.retio; }
    public color(): string { return Rect.CELL_TYPES.colorOf(this.colorType); }

    public static dotOf = (
        x: number,
        y: number,
        retio: number,
        colorType: number
    ) => new Rect(x, y, 1, 1, retio, colorType);
}
