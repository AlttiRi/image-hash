import {ANSI_BLUE, Tester} from "@alttiri/util-node-js";

export const tester = new Tester({stackDeep: 0});
export const {t} = tester.destructible();

export {ANSI_BLUE};
