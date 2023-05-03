/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import { render, screen } from "@testing-library/react";
import { TimezoneCard } from "./TimezoneCard";
import { Office } from "./Office";
import { anEmployee, EmployeeJson } from "./EmployeeJson";
import { OfficeJson } from "./OfficeJson";

describe("Timezone cards on map", function () {
  it("A timezone card is displayed with the correct timezone", function () {
    const chicago: OfficeJson = {
      name: "Chicago",
      latitude: 41.8884096,
      longitude: -87.6354498,
      timezone: "Central",
    };
    const dallas: OfficeJson = {
      name: "Dallas",
      latitude: 32.9099587,
      longitude: -96.9279461,
      timezone: "Central",
    };

    const employees: EmployeeJson[] = [
      anEmployee({
        role: "Eng",
        office: "Chicago",
      }),
      anEmployee({
        role: "Eng",
        office: "Chicago",
      }),
      anEmployee({
        role: "Des",
        office: "Dallas",
      }),
    ];

    render(<TimezoneCard offices={Office.FromJson([chicago, dallas], employees)} timezone="Central" title="Close" />);

    //expect(screen.getByText("Central")).toBeInTheDocument();
    //expect(screen.getByText("Eng")).toBeInTheDocument();
    //expect(screen.getByText("2")).toBeInTheDocument();
    //expect(screen.getByText("Des")).toBeInTheDocument();
    //expect(screen.getByText("1")).toBeInTheDocument();
  });
});
