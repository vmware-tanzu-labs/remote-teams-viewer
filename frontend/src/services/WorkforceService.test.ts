/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import { getEmployees, getFilteredOffices, getOffices } from "./WorkforceService";
import { getEmployeeJSON } from "./EmployeeProvider";
import { getOfficeJSON } from "./OfficeProvider";
import { anEmployee } from "../EmployeeJson";

jest.mock("./EmployeeProvider");
jest.mock("./OfficeProvider");

const mockedGetEmployeeJson = getEmployeeJSON as jest.MockedFunction<typeof getEmployeeJSON>;
const mockedGetOfficeJson = getOfficeJSON as jest.MockedFunction<typeof getOfficeJSON>;

describe("WorkforceService", () => {
  describe("getOffices", () => {
    it("returns list of offices", async () => {
      mockedGetOfficeJson.mockResolvedValue([
        {
          name: "Remote - California",
          latitude: 36.17,
          longitude: -119.7462,
          timezone: "Pacific",
        },
      ]);
      mockedGetEmployeeJson.mockResolvedValue([]);

      const offices = await getOffices([]);

      expect(offices).toHaveLength(1);
      let actualOffice = offices[0];
      expect(actualOffice.name).toEqual("Remote - California");
      expect(actualOffice.timezone).toEqual("Pacific");
      expect(actualOffice.longitude).toEqual(-119.7462);
      expect(actualOffice.latitude).toEqual(36.17);
    });

    it("should utilize employees if provided", async () => {
      mockedGetOfficeJson.mockResolvedValue([
        {
          name: "Remote - California",
          latitude: 36.17,
          longitude: -119.7462,
          timezone: "Pacific",
        },
      ]);

      const employee = anEmployee({
        office: "Remote - California",
      });

      const offices = await getOffices([employee]);

      expect(offices).toHaveLength(1);
      let actualOffice = offices[0];
      expect(actualOffice.employees.length).toEqual(1);
    });
  });

  describe("getEmployees", () => {
    it("returns list of employees", async () => {
      mockedGetEmployeeJson.mockResolvedValue([
        {
          employeeFirstName: "Lynn",
          employeeLastName: "G*****",
          role: "Eng",
          level: "P3",
          office: "Remote - California",
          theater: "Federal",
        },
      ]);
      const employees = await getEmployees();
      expect(employees).toHaveLength(1);
      const actualEmployee = employees[0];
      expect(actualEmployee.key).toBeTruthy();
      expect(actualEmployee.abbrName).toEqual("Lynn G");
      expect(actualEmployee.level).toEqual("P3");
      expect(actualEmployee.role).toEqual("Eng");
    });
  });

  describe("getFilteredOffices", () => {
    it("returns only office with matching theaters", async () => {
      mockedGetOfficeJson.mockResolvedValue([
        {
          name: "Remote - California",
          latitude: 36.17,
          longitude: -119.7462,
          timezone: "Pacific",
        },
        {
          name: "Remote - Arizona",
          latitude: 33.7712,
          longitude: -111.3877,
          timezone: "Mountain",
        },
      ]);
      mockedGetEmployeeJson.mockResolvedValue([
        anEmployee({ theater: "East", office: "Remote - California" }),
        anEmployee({ theater: "Federal", office: "Remote - Arizona" }),
      ]);

      const offices = await getFilteredOffices([], { includeTheaters: ["East"], includeEmployees: [] });
      expect(offices).toHaveLength(1);
    });
  });
});
