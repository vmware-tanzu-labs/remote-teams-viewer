import { transformJobFamilies } from "./transformJobFamilies";
import { EveryoneLocation } from "./transformLocations";

describe("transformJobFamilies", function () {
  it("renames the jobFamilies key to role", function () {
    expect(
      transformJobFamilies([
        {
          jobFamily: "MT - Member of Technical Staff",
        } as EveryoneLocation,
        {
          jobFamily: "PD - Product Management",
        } as EveryoneLocation,
      ])
    ).toEqual([
      expect.objectContaining({
        role: "Eng",
      }),
      expect.objectContaining({
        role: "PM",
      }),
    ]);
  });

  it("groups professional services as an engineering role", function () {
    expect(
      transformJobFamilies([
        {
          jobFamily: "PS - Professional Services",
        } as EveryoneLocation,
      ])
    ).toEqual([
      expect.objectContaining({
        role: "Eng",
      }),
    ]);
  });
});
