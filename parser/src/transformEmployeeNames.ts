import { EveryoneJobFamily } from "./transformJobFamilies";

export type EveryoneEmployeeName = {
  employeeFirstName: string;
  employeeLastName: string;
  role: string;
  level: string;
  office: string;
  theater: string;
};

export const transformEmployeeNames =
  (sanitize: boolean) =>
  (employees: EveryoneJobFamily[]): EveryoneEmployeeName[] => {
    const redactLastName = (name: string): string =>
      sanitize
        ? `${name.substring(0, 1)}${name.substring(1).replace(/./g, "*")}`
        : name;

    return employees.map((employee) => {
      return {
        employeeFirstName: employee.employeeName.split(" ")[0],
        employeeLastName: redactLastName(employee.employeeName.split(" ")[1]),
        role: employee.role,
        level: employee.level,
        office: employee.office,
        theater: employee.theater,
      };
    });
  };
