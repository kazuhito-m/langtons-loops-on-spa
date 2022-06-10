import { Rule } from "./Rule";
import langtonsLoopsTable from "./data/Lantons-Loops.table.json";

export class RuleLoader {
    public static load(): Rule {
        const rule = new Rule();
        langtonsLoopsTable.ruleTable
            .forEach(tableItem => rule.add(tableItem));
        return rule;
    }
}