export class CellTypes {
    private static readonly CODE_TO_COLOR_MAP = [
        "black",
        "blue",
        "red",
        "green",
        "yellow",
        "magenta",
        "white",
        "cyan",
    ];

    public colorOf(typeNumber: number): string {
        return CellTypes.CODE_TO_COLOR_MAP[typeNumber];
    }
}