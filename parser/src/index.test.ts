import { parseCsv } from "./index";

describe("Testing CSV Parsing script", function () {
  const testInput = [
    [
      "Department",
      "Employee Name",
      "Theater",
      "Manager Last Name",
      "Job Profile Code As Is",
      "Job Family As Is",
      "Location Name As Is",
      "Timezone",
      "Willing to go to an office 2+ times a month?",
      "if yes, which office?",
    ],
    [
      "",
      "Bob Belcher",
      "East",
      "Simpson",
      "ENMTMT_P3",
      "MT - Member of Technical Staff",
      "USA-CA-San Francisco-Howard",
      "",
      "N",
      "",
    ],
    [
      "",
      "Eric Cartman",
      "Federal",
      "Moose",
      "PETMTM_P5",
      "PD - Product Management",
      "USA-IL-Chicago-W. Merchandise Mart",
      "",
      "N",
      "",
    ],
  ];

  it("imports string array and returns unsanitized json", async function () {
    const resultString = parseCsv(testInput, false);

    expect(resultString).toEqual([
      {
        level: "P3",
        role: "Eng",
        office: "San Francisco",
        theater: "East",
        employeeFirstName: "Bob",
        employeeLastName: "Belcher",
      },
      {
        level: "P5",
        role: "PM",
        office: "Chicago",
        theater: "Federal",
        employeeFirstName: "Eric",
        employeeLastName: "Cartman",
      },
    ]);
  }, 10000);

  it("sanitizes output when the parameter provided", async function () {
    const resultString = parseCsv(testInput, true);

    expect(resultString).toEqual([
      {
        level: "P3",
        role: "Eng",
        office: "San Francisco",
        theater: "East",
        employeeFirstName: "Bob",
        employeeLastName: "B******",
      },
      {
        level: "P5",
        role: "PM",
        office: "Chicago",
        theater: "Federal",
        employeeFirstName: "Eric",
        employeeLastName: "C******",
      },
    ]);
  }, 10000);
});
