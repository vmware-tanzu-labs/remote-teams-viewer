/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import { EveryoneLocation } from "./transformLocations";
import JobFamilyMappings from "./mappings/JobFamilyMappings.json";

export type EveryoneJobFamily = {
  employeeName: string;
  role: string;
  level: string;
  office: string;
  theater: string;
};

export const transformJobFamilies = (
  employees: EveryoneLocation[]
): EveryoneJobFamily[] => {
  return employees
    .map((employee) => ({
      employeeName: employee.employeeName,
      role: jobFamilyToRole(employee.jobFamily),
      level: employee.level,
      office: employee.office,
      theater: employee.theater,
    }))
    .filter(
      (employee): employee is EveryoneJobFamily =>
        employee.role !== undefined && employee.role !== ""
    );
};

const jobFamilyToRole = (jobFamily: string): string | undefined =>
  (JobFamilyMappings as { [key: string]: string })[jobFamily];
