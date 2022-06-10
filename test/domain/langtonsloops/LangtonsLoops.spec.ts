import { describe, expect, test } from "vitest";
import { LangtonsLoops } from "../../../src/domain/langtonsloops/LangtonsLoops";

describe("LangtonsLoopsTest", () => {
    test("初期化が成功する。", () => {
        const sut = new LangtonsLoops();

        sut.langtonsLoops();

        expect(sut.lives.length).toEqual(64);
        expect(sut.lives[0].length).toEqual(64);
    });

    test("世界の大きさ(size)指定で初期化が出来る。", () => {
        const sut = new LangtonsLoops();

        sut.langtonsLoops(512);

        expect(sut.lives.length).toEqual(512);
        expect(sut.lives[0].length).toEqual(512);
    });
});