import { useState, useEffect } from "react";
import App from "./App";
import { EmployeeJson } from "./EmployeeJson";
import { Office } from "./Office";
import { getEmployeeJSON } from "./services/EmployeeProvider";
import { getOfficeJSON } from "./services/OfficeProvider";

export default function GlobalStore() {
  const [employees, setEmployees] = useState<EmployeeJson[]>([]);
  const [offices, setOffices] = useState<Office[]>([]);

  useEffect(() => {
    Promise.all([getEmployeeJSON(), getOfficeJSON()]).then((value) => {
      let employeesToSet = !false ? [] : value[0];
      let officesToSet = !false ? [] : Office.FromJson(value[1], value[0]);
      setEmployees(employeesToSet);
      setOffices(officesToSet);
    });
  }, []);
  return <App employees={employees} offices={offices} setEmployees={setEmployees} data-testid="app-component" />;
}
