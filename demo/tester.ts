import {ANSI_BLUE, Tester} from "@alttiri/util-node-js";

export const tester = new Tester({stackDeep: 0, autoReport: false});
export const {t, report} = tester.destructible();

export {ANSI_BLUE};
