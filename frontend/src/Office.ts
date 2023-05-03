/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import _, { Dictionary } from "lodash";
import { OfficeJson } from "./OfficeJson";
import { EmployeeJson } from "./EmployeeJson";
import { OfficeFilters } from "./App";

export class RoleCount {
  constructor(private readonly _role: string, private readonly _count: number) {}

  get role(): string {
    return this._role;
  }

  get count(): number {
    return this._count;
  }
}

export class LevelSummary {
  constructor(private readonly _level: string, private readonly _roleCounts: RoleCount[]) {}

  get level(): string {
    return this._level;
  }

  get roleCounts(): RoleCount[] {
    return this._roleCounts;
  }
}

export class EmployeeDetails {
  constructor(
    private readonly _firstName: string,
    private readonly _lastName: string,
    private readonly _level: string,
    private readonly _role: string,
  ) {}

  public static FromEmployeeJson(employeeJson: EmployeeJson) {
    return new EmployeeDetails(
      employeeJson.employeeFirstName,
      employeeJson.employeeLastName,
      employeeJson.level,
      employeeJson.role,
    );
  }

  get abbrName(): string {
    return `${this._firstName} ${this._lastName.substring(0, 1)}`;
  }

  get key(): string {
    // Without the random suffix chances are we can get the non-unique result when
    // firstName + abbreviated lastName produce non-unique resul (e.g. empty string)
    // This can cause glitches in UI when switching back and forth between tabs in the tooltip
    const randomSuffix = (Math.random() + 1).toString(36).substring(7);

    // Need to encode the id to handle scenario when there are special caracters in the name
    return `${this._firstName}-${this._lastName.substring(0, 1)}-${randomSuffix}`;
  }

  get level(): string {
    return this._level;
  }

  get role(): string {
    return this._role;
  }
}

export class Office {
  private constructor(private readonly _officeData: OfficeJson, private readonly _employees: EmployeeJson[]) {}

  public static FromJson(officeJson: OfficeJson[], employeeJson: EmployeeJson[]) {
    return officeJson.map(
      (office) =>
        new Office(
          office,
          employeeJson.filter((e) => e.office === office.name),
        ),
    );
  }

  get name(): string {
    return this._officeData.name;
  }

  get latitude(): number {
    return this._officeData.latitude;
  }

  get longitude(): number {
    return this._officeData.longitude;
  }

  get timezone(): string {
    return this._officeData.timezone;
  }

  get employees(): EmployeeJson[] {
    return this._employees;
  }

  levelSummary(): LevelSummary[] {
    const levels: Dictionary<EmployeeJson[]> = _.groupBy(this.employees, "level");

    return _.orderBy(Object.entries(levels), (entry) => entry[0], "desc").map(([level, value]) => {
      const countRoles: Dictionary<number> = _.countBy(value, "role");

      const roleCounts = Object.entries(countRoles).map(([role, count]) => new RoleCount(role, count));

      return new LevelSummary(level, roleCounts);
    });
  }

  roleSummary(): RoleCount[] {
    const roles: Dictionary<EmployeeJson[]> = _.groupBy(this.employees, "role");

    return _.orderBy(Object.entries(roles)).map(([role, employees]) => {
      return new RoleCount(role, employees.length);
    });
  }

  isRemoteOrHomeOffice() {
    return this.name.includes("Remote") || this.name.includes("Home");
  }

  employeeDetails(): EmployeeDetails[] {
    return this.employees
      .map((e) => EmployeeDetails.FromEmployeeJson(e))
      .sort((e1, e2) => e1.abbrName.localeCompare(e2.abbrName));
  }

  hasEmployeeMatchingFilter(filter: OfficeFilters): boolean {
    let employeeJsons: EmployeeJson[] = this._employees
      .filter((employee) => filter.includeTheaters.includes(employee.theater))
      .filter((employee) => (filter.includeEmployees.length > 0 ? filter.includeEmployees.includes(employee) : true));
    return employeeJsons.length > 0;
  }

  officeAfterEmployeeFilter(filter: OfficeFilters): Office {
    let employeeJsons: EmployeeJson[] = this._employees
      .filter((employee) => filter.includeTheaters.includes(employee.theater))
      .filter((employee) => (filter.includeEmployees.length > 0 ? filter.includeEmployees.includes(employee) : true));
    return new Office(this._officeData, employeeJsons);
  }
}
