import { describe, test, expect } from "vitest";
import { Rule } from "../../../../domain/langtonsloops/rule/Rule";

describe("RuleTest", () => {
  test("作成直後はルールがゼロ件。", () => {
      const sut = new Rule();
      expect(sut.count).toEqual(0);
  });
});