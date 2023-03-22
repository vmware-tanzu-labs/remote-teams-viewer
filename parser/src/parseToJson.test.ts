import { parseToJson } from "./parseToJson";

describe("parseToJson", function () {
  it("returns a JSON version of the CSV rows", function () {
    expect(
      parseToJson([
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
          "Captain America",
          "East",
          "Stan Lee",
          "ENMTMT_P6",
          "MT - Member of Technical Staff",
          "Home Office - Colorado",
          "",
          "N",
          "",
        ],
        [
          "",
          "Superman",
          "Federal",
          "Schuster & Siegal",
          "ENPDPM_P4",
          "PD - Product Management",
          "Home Office - Florida",
          "",
          "N",
          "",
        ],
      ])
    ).toEqual([
      {
        employeeName: "Captain America",
        jobProfile: "ENMTMT_P6",
        jobFamily: "MT - Member of Technical Staff",
        location: "Home Office - Colorado",
        theater: "East",
      },
      {
        employeeName: "Superman",
        jobProfile: "ENPDPM_P4",
        jobFamily: "PD - Product Management",
        location: "Home Office - Florida",
        theater: "Federal",
      },
    ]);
  });
});
