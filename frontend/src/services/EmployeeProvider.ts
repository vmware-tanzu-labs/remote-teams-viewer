import { EmployeeJson } from "../EmployeeJson";
import stubbedEmployeeJson from "../stub/employees.json";
import employeesJson from "../data/employees.json";

export const getEmployeeJSON = async (): Promise<EmployeeJson[]> => {
  return "true" === process.env.REACT_APP_E2E_ENABLED ? stubbedEmployeeJson : employeesJson;
};
