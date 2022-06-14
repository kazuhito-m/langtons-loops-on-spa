import { CellTypes } from "./CellTypes";

export class Rect {
    constructor(
        private readonly x: number,
        private readonly y: number,
        private readonly w: number,
        private readonly h: number,
        private readonly retio: number,
        private readonly colorType: number
    ) { }

    private static CELL_TYPES = new CellTypes();

    public calcX = (): number => this.x * this.retio;
    public calcY = (): number => this.y * this.retio;
    public calcW = (): number => this.w * this.retio;
    public calcH = (): number => this.h * this.retio;
    public color = (): string => Rect.CELL_TYPES.colorOf(this.colorType);

    public static horizontalOf = (
        x: number,
        y: number,
        width: number,
        retio: number,
        colorType: number
    ) => new Rect(x, y, width, 1, retio, colorType);
}