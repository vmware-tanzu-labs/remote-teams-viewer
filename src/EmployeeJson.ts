export type EmployeeJson = {
  employeeLastName: string;
  employeeFirstName: string;
  role: string;
  level: string;
  office: string;
  theater: string;
};

export function anEmployee(options?: Partial<EmployeeJson>): EmployeeJson {
  const defaults: EmployeeJson = {
    employeeLastName: "",
    employeeFirstName: "",
    role: "",
    level: "",
    office: "",
    theater: "",
  };

  return {
    ...defaults,
    ...options,
  };
}

export function abbrName(e: EmployeeJson): string {
  return `${e.employeeFirstName} ${e.employeeLastName}`;
}
