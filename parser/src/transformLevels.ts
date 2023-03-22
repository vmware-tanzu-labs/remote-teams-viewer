import { EveryoneJson } from "./parseToJson";

export type EveryoneLevel = {
  employeeName: string;
  jobFamily: string;
  level: string;
  location: string;
  theater: string;
};

export const transformLevels = (employees: EveryoneJson[]): EveryoneLevel[] => {
  return employees.map((employee) => {
    return {
      employeeName: employee.employeeName,
      jobFamily: employee.jobFamily,
      level: jobProfileToLevel(employee.jobProfile),
      location: employee.location,
      theater: employee.theater,
    };
  });
};

const jobProfileToLevel = (jobProfile: string) => {
  const parts = jobProfile.split("_");
  if (parts.length === 2 && startsWithEither(parts[1], ["P", "M"])) {
    return parts[1];
  }
  return jobProfile;
};

const startsWithEither = (s: string, substrings: string[]): boolean => {
  for (const substring of substrings) {
    if (s.startsWith(substring)) {
      return true;
    }
  }
  return false;
};
