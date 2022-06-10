import { LantonsLoopsTable } from "./data/LantonsLoopsTable";
import { Rule } from "./Rule";

export class RuleLoader {
    public static load(): Rule {
        const rule = new Rule();
        const ruleTables: LantonsLoopsTable = require("./data/Lantons-Loops.table.json");
        ruleTables.ruleTable
            .forEach(tableItem => rule.add(tableItem));
        return rule;
    }
}