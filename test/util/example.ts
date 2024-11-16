import {ANSI_BLUE, t} from "../tester.ts";

console.log(ANSI_BLUE("--- Example tests ---"));

t({
    expect: 4,
    result: 2 + 2,
    name: "2 + 2 = 4",
});
t({
    expect: 2,
    result: 1 + 1,
    name: "1 + 1 = 2",
});
t({
    expect: 5,
    result: 2 + 2,
    name: "2 + 2 = 5",
});
