import { Rule } from "./rule/Rule";
import { RuleLoader } from "./rule/RuleLoader";

export class LangtonsLoops {
    private _size: number; // 世界のサイズ(正方形の一辺)
    private _lives: number[][]; // 世界(numberの2次元配列)

    private _rule: Rule;  // セル・オートマトンの規則
    private _isRuleLoaded: boolean;

    // 観測結果(各方向の隣のセルの値)
    private _northLife: number[][];
    private _eastLife: number[][];
    private _southLife: number[][];
    private _westLife: number[][];

    private static readonly DEFAULT_LIVES = [
        [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
        [2, 1, 7, 0, 1, 4, 0, 1, 4, 2, 0, 0, 0, 0, 0],
        [2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0],
        [2, 7, 2, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0],
        [2, 1, 2, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0],
        [2, 0, 2, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0],
        [2, 7, 2, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0],
        [2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 0],
        [2, 0, 7, 1, 0, 7, 1, 0, 7, 1, 1, 1, 1, 1, 2],
        [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    ];

    public get lives(): number[][] {
        return this._lives;
    }

    /**
     * 省略時はデフォルトサイズ。
     */
    public langtonsLoops(size: number = 64): void {
        this.prepare(size);
    }

    private prepare(size: number): void {
        this._size = size;
        this.loadRule();
        this.createLives();
        this.prepareWatchingArray();
    }

    /**
     * Lives配列を作成し、初期状態を設定する。
     */
    private createLives(): void {
        const defaultLives = LangtonsLoops.DEFAULT_LIVES;
        const size = this._size;

        const lives = this.initializeArray(size, size);

        const defaultRow = Math.floor((size - defaultLives.length) / 2);
        const defaultColmn = Math.floor((size - defaultLives[0].length) / 2);
        for (let r0 = 0; r0 < defaultLives.length; r0++) {
            for (let c0 = 0; c0 < defaultLives[r0].length; c0++) {
                let r = defaultRow + r0;
                let c = defaultColmn + c0;
                lives[r][c] = defaultLives[r0][c0];
            }
        }

        this._lives = lives;
    }

    /**
     * 観測用の配列を生成。
     */
    private prepareWatchingArray(): void {
        const size = this._size;
        this._northLife = this.initializeArray(size, size);
        this._eastLife = this.initializeArray(size, size);
        this._southLife = this.initializeArray(size, size);
        this._westLife = this.initializeArray(size, size);
    }

    private loadRule(): void {
        this._rule = RuleLoader.load();
        this._isRuleLoaded = true;
    }

    public update(): void {
        // TODO 実装手段を探す。
        // while (!this._isRuleLoaded)
        //     Task.Delay(100).GetAwaiter().GetResult();

        // 隣を見る (観測し終わるまで this._lives を変更してはいけない)
        for (let r = 1; r < this._size - 1; r++) {
            for (let c = 1; c < this._size - 1; c++) {
                this._northLife[r][c] = this._lives[r - 1][c];
                this._eastLife[r][c] = this._lives[r][c + 1];
                this._southLife[r][c] = this._lives[r + 1][c];
                this._westLife[r][c] = this._lives[r][c - 1];
            }
        }

        /**
         * 次ステップの状態を計算して書き換える。
         */
        for (let r = 1; r < this._size - 1; r++) {
            for (let c = 1; c < this._size - 1; c++) {
                this._lives[r][c] = this._rule.next(
                    this._lives[r][c],
                    this._northLife[r][c],
                    this._eastLife[r][c],
                    this._southLife[r][c],
                    this._westLife[r][c]
                );
            }
        }
    }

    private initializeArray(l: number, r: number): number[][] {
        let result = [];
        for (let i = 0; i < l; i++) {
            let row = [];
            for (let j = 0; j < r; j++) row.push(0);
            result.push(row);
        }
        return result;
    }

    public static of(size: number): LangtonsLoops {
        const result = new LangtonsLoops();
        result.langtonsLoops(size);
        return result;
    }
}
