/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import { LevelSummary, Office, RoleCount } from "./Office";
import { OfficeJson } from "./OfficeJson";
import { anEmployee, EmployeeJson } from "./EmployeeJson";
let chicago: OfficeJson;
describe("Office", function () {
  beforeEach(() => {
    chicago = {
      name: "Chicago",
      latitude: 41.8884096,
      longitude: -87.6354498,
      timezone: "Central",
    };
  });

  it("retrieve level summary for an office", function () {
    const employees: EmployeeJson[] = [
      anEmployee({
        role: "Ice cream scooper",
        level: "P3",
        office: "Chicago",
      }),
      anEmployee({
        role: "Ice cream manager",
        level: "P4",
        office: "Chicago",
      }),
      anEmployee({
        role: "Ice cream eater",
        level: "P4",
        office: "Chicago",
      }),
      anEmployee({
        role: "Ice cream eater",
        level: "P4",
        office: "Chicago",
      }),
    ];

    const offices = Office.FromJson([chicago], employees);
    const subject = offices[0];

    expect(subject.levelSummary()).toEqual([
      new LevelSummary("P4", [new RoleCount("Ice cream manager", 1), new RoleCount("Ice cream eater", 2)]),
      new LevelSummary("P3", [new RoleCount("Ice cream scooper", 1)]),
    ]);
  });

  it("retrieve role counts for an office", function () {
    const employees: EmployeeJson[] = [
      anEmployee({
        role: "Ice cream eater",
        office: "Chicago",
      }),
      anEmployee({
        role: "Ice cream eater",
        office: "Chicago",
      }),
      anEmployee({
        role: "Ice cream scooper",
        office: "Chicago",
      }),
    ];

    const subject = Office.FromJson([chicago], employees)[0];

    expect(subject.roleSummary()).toEqual([new RoleCount("Ice cream eater", 2), new RoleCount("Ice cream scooper", 1)]);
  });

  it("returns true if has an employee matching the theater filter", () => {
    const employees: EmployeeJson[] = [
      anEmployee({
        role: "Ice cream eater",
        office: "Chicago",
        theater: "East",
      }),
    ];

    const office = Office.FromJson([chicago], employees)[0];
    const result = office.hasEmployeeMatchingFilter({ includeTheaters: ["East"], includeEmployees: [] });
    expect(result).toBeTruthy();
  });

  it("returns false if does not have an employee matching the theater filter", () => {
    const employees: EmployeeJson[] = [
      anEmployee({
        role: "Ice cream eater",
        office: "Chicago",
        theater: "East",
      }),
    ];

    const office = Office.FromJson([chicago], employees)[0];
    const result = office.hasEmployeeMatchingFilter({ includeTheaters: ["West"], includeEmployees: [] });
    expect(result).toBeFalsy();
  });

  it("returns true if has employee match the employee filter", () => {
    const employee = anEmployee({
      role: "Ice cream eater",
      office: "Chicago",
      theater: "East",
    });
    const employees: EmployeeJson[] = [employee];

    const office = Office.FromJson([chicago], employees)[0];
    const result = office.hasEmployeeMatchingFilter({ includeTheaters: ["East"], includeEmployees: [employee] });
    expect(result).toBeTruthy();
  });

  it("returns false if does not have an employee matching the employee filter", () => {
    const employee = anEmployee({
      role: "Ice cream eater",
      office: "Chicago",
      theater: "East",
    });
    const employees: EmployeeJson[] = [employee];

    const office = Office.FromJson([chicago], employees)[0];
    const result = office.hasEmployeeMatchingFilter({ includeTheaters: [], includeEmployees: [anEmployee()] });
    expect(result).toBeFalsy();
  });
});
