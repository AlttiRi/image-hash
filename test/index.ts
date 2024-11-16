import {Tester} from "@alttiri/util-node-js";


const {t} = new Tester().destructible();

t({
    expect: 4,
    result: 2 + 2,
    name: "Example 2 + 2",
});
