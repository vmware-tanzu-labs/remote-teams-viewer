import { parseToJson } from "./parseToJson";
import { transformLevels } from "./transformLevels";
import { transformLocations } from "./transformLocations";
import { transformJobFamilies } from "./transformJobFamilies";
import {
  EveryoneEmployeeName,
  transformEmployeeNames,
} from "./transformEmployeeNames";

const pipes = <T>(...args: any[]): { run: (value: any) => T } => ({
  run(value: any): T {
    return args.reduce((acc, fn) => fn(acc), value);
  },
});

export const parseCsv = (csv: string[][], sanitize: boolean) => {
  let pipe = pipes<EveryoneEmployeeName[]>(
    parseToJson,
    transformLevels,
    transformLocations,
    transformJobFamilies,
    transformEmployeeNames(sanitize)
  );

  return pipe.run(csv);
};
