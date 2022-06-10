import { describe, test, expect } from "vitest";
import { Rule } from "../../../../src/domain/langtonsloops/rule/Rule";

describe("RuleTest", () => {
  test("作成直後はルールがゼロ件。", () => {
    const sut = new Rule();

    expect(sut.count).toEqual(0);
  });

  test("ルールを一つ加えると、内部ルールも一つ増える。", () => {
    const sut = new Rule();
    sut.add("000000");

    expect(sut.count).toEqual(1);  // "00000"は回転しても同じなので、追加されるルールは1つだけ
  });


  test("ルールを加えて「次の値」を計算させると期待通りの結果になる。", () => {
    const sut = new Rule();
    sut.add("000000");

    expect(sut.next(0, 0, 0, 0, 0)).toEqual(0);
  });

  test("ルール'702525'を与え、周りの「次の値」を計算させると期待通りの結果になる。", () => {
    const sut = new Rule();
    sut.add("702525");

    expect(sut.next(7, 0, 2, 5, 2)).toEqual(5);
    expect(sut.next(7, 2, 0, 2, 5)).toEqual(5);
    expect(sut.next(7, 5, 2, 0, 2)).toEqual(5);
    expect(sut.next(7, 2, 5, 2, 0)).toEqual(5);
  });
});