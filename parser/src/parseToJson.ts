export type EveryoneJson = {
  employeeName: string;
  jobFamily: string;
  jobProfile: string;
  location: string;
  theater: string;
};

const THEATER_COLUMN = 2;
const JOB_PROFILE_COLUMN = 4;
const JOB_FAMILY_COLUMN = 5;
const LOCATION_COLUMN = 6;
const EMPLOYEE_NAME_COLUMN = 1;

export const parseToJson = (rows: string[][]): EveryoneJson[] =>
  rows.slice(1).map((row) => ({
    employeeName: row[EMPLOYEE_NAME_COLUMN],
    jobProfile: row[JOB_PROFILE_COLUMN],
    jobFamily: row[JOB_FAMILY_COLUMN],
    location: row[LOCATION_COLUMN],
    theater: row[THEATER_COLUMN],
  }));
