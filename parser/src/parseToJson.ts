import {EveryoneJobFamily} from "./transformJobFamilies";

export type EveryoneJson = {
  employeeName: string;
  jobFamily: string;
  jobProfile: string;
  location: string;
  theater: string;
};

const EMPLOYEE_NAME_COLUMN = 0;
const ROLE_COLUMN = 1;
const LEVEL_COLUMN = 2;
const OFFICE_COLUMN = 3;




export const parseToJson = (rows: string[][]): EveryoneJobFamily[] => {

    const getRole = (role: string): string =>
        role === ("Product Manager") ? "PM" : role.substring(0, 3);

    return rows.slice(1).map((row) => {
        return {
            employeeName: row[EMPLOYEE_NAME_COLUMN],
            role: getRole(row[ROLE_COLUMN]),
            level: row[LEVEL_COLUMN],
            office: "Remote - ".concat(row[OFFICE_COLUMN]),
            theater: "East",
        };
    });
};