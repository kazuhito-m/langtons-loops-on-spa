export class LimitCountBehavior {
    public static readonly INFINITE = new LimitCountBehavior(0, "無限");
    public static readonly FINITE = new LimitCountBehavior(1, "回数指定");

    public static readonly DEFAULT = LimitCountBehavior.INFINITE;

    private constructor(
        public readonly id: number,
        public readonly name: string
    ) { }

    public static all(): LimitCountBehavior[] {
        return [
            LimitCountBehavior.INFINITE,
            LimitCountBehavior.FINITE
        ];
    }

    public static getByIdOf(id: number): LimitCountBehavior {
        const result = LimitCountBehavior.all()
            .find(i => i.id === id);
        if (!result) return LimitCountBehavior.DEFAULT;
        return result;
    }

    public isInfinite(): boolean {
        return this === LimitCountBehavior.INFINITE;
    }
}
