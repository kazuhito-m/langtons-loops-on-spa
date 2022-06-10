import { describe, test, expect } from "vitest";
import { RuleLoader } from "../../../../../src/domain/langtonsloops/rule/RuleLoader";

describe("RuleLoaderTest", () => {
    test("読み込みが成功し期待通りのルール数が存在する。", () => {
        const actual = RuleLoader.load();

        expect(actual.count).toEqual(857);
    });

    test("読み込みが成功したルールの「次へ行く」が期待の動きをする。", () => {
        const sut = RuleLoader.load();

        expect(sut.next(7, 0, 2, 5, 2)).toEqual(5);
        expect(sut.next(7, 2, 0, 2, 5)).toEqual(5);
        expect(sut.next(7, 5, 2, 0, 2)).toEqual(5);
        expect(sut.next(7, 2, 5, 2, 0)).toEqual(5);
    });
});