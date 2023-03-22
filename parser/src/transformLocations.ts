import { EveryoneLevel } from "./transformLevels";
import OfficeMappings from "./mappings/OfficeMappings.json";

export type EveryoneLocation = {
  employeeName: string;
  jobFamily: string;
  level: string;
  office: string;
  theater: string;
};

export const transformLocations = (
  employees: EveryoneLevel[]
): EveryoneLocation[] => {
  return employees
    .map((employee) => ({
      employeeName: employee.employeeName,
      jobFamily: employee.jobFamily,
      level: employee.level,
      office: locationToOffice(employee.location),
      theater: employee.theater,
    }))
    .filter(
      (employee): employee is EveryoneLocation => employee.office !== undefined
    );
};

const locationToOffice = (location: string): string | undefined => {
  if (location.startsWith("Home") || location.startsWith("Remote")) {
    return "Remote - ".concat(location.split(" - ")[1]);
  } else {
    return (OfficeMappings as { [key: string]: string })[location];
  }
};
