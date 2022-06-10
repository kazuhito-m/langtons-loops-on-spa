export class Rule {
    // ルールを表すコレクション
    // key: 中央x10000 + 北x1000 + 東x100 + 南x10 + 西x1 (但し、各位置の値は0～7)
    // value: 次ステップの値
    private readonly _rules = new Map<number, number>();

    public next(c: number, n: number, e: number, s: number, w: number): number {
        const key = c * 10000 + n * 1000 + e * 100 + s * 10 + w;
        if (!this._rules.has(key)) return 0;
        return this._rules.get(key);
    }

    public get count() {
        return this._rules.size;
    }

    public add(ruleString: string): void {
        const ruleBit = ruleString.split("")
            .map(i => Number(i));

        const c = ruleBit[0];
        const n = ruleBit[1];
        const e = ruleBit[2];
        const s = ruleBit[3];
        const w = ruleBit[4];
        const next = ruleBit[5];

        const rules = this._rules

        const key1 = c * 10000 + n * 1000 + e * 100 + s * 10 + w;
        rules.set(key1, next);
        const key2 = c * 10000 + w * 1000 + n * 100 + e * 10 + s;
        if (!rules.has(key2)) rules.set(key2, next);
        const key3 = c * 10000 + s * 1000 + w * 100 + n * 10 + e;
        if (!rules.has(key3)) rules.set(key3, next);
        const key4 = c * 10000 + e * 1000 + s * 100 + w * 10 + n;
        if (!rules.has(key4)) rules.set(key4, next);
    }
}
