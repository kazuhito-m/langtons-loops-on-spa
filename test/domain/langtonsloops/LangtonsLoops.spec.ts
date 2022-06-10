import { describe, expect, test } from "vitest";
import { LangtonsLoops } from "../../../src/domain/langtonsloops/LangtonsLoops";

describe("LangtonsLoopsTest", () => {
    test("初期化が成功する。", () => {
        const sut = new LangtonsLoops();

        sut.langtonsLoops();

        expect(sut.lives.length).toEqual(64);
    });
});