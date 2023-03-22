import { EmployeeDetails, Office } from "../Office";
import { getOfficeJSON } from "./OfficeProvider";
import { getEmployeeJSON } from "./EmployeeProvider";
import { OfficeFilters } from "../App";
import { EmployeeJson } from "../EmployeeJson";

export const getOffices = async (employees: EmployeeJson[]): Promise<Office[]> => {
  let officesJson = getOfficeJSON();
  let employeesJson = employees?.length > 0 ? employees : await getEmployeeJSON();
  return Promise.all([officesJson, employeesJson]).then((value) => {
    return Office.FromJson(value[0], value[1]);
  });
};

export const getEmployees = async (): Promise<EmployeeDetails[]> => {
  return getEmployeeJSON().then((employeesJson) => {
    return employeesJson.map((employeeJson) => EmployeeDetails.FromEmployeeJson(employeeJson));
  });
};

export const getFilteredOffices = async (employees: EmployeeJson[], filter: OfficeFilters): Promise<Office[]> => {
  return getOffices(employees).then((offices) => {
    return offices
      .filter((office) => office.hasEmployeeMatchingFilter(filter))
      .map((office) => office.officeAfterEmployeeFilter(filter)); // Should we create no offices or filter employees in place?
  });
};
