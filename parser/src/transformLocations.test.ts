import { transformLocations } from "./transformLocations";
import { EveryoneLevel } from "./transformLevels";

describe("transformLocations", function () {
  it("parseLocation converts full office location into just the office", function () {
    expect(
      transformLocations([
        {
          location: "CAN-Toronto-1 Toronto",
        } as EveryoneLevel,
        {
          location: "USA-CA-San Francisco-Howard",
        } as EveryoneLevel,
        {
          location: "Remote Office - Colorado",
        } as EveryoneLevel,
        {
          location: "Home Office - Colorado",
        } as EveryoneLevel,
        {
          location: "Home Office - CAN-Ontario",
        } as EveryoneLevel,
      ])
    ).toEqual([
      expect.objectContaining({
        office: "Toronto",
      }),
      expect.objectContaining({
        office: "San Francisco",
      }),
      expect.objectContaining({
        office: "Remote - Colorado",
      }),
      expect.objectContaining({
        office: "Remote - Colorado",
      }),
      expect.objectContaining({
        office: "Remote - CAN-Ontario",
      }),
    ]);
  });

  it("parseLocation does something for unrecognized values", function () {
    expect(
      transformLocations([
        {
          location: "Total Nonsense Value",
        } as EveryoneLevel,
        {
          location: "Another Total Nonsense Value",
        } as EveryoneLevel,
        {
          location: "USA-IL-Chicago-W. Merchandise Mart",
        } as EveryoneLevel,
      ])
    ).toEqual([
      expect.objectContaining({
        office: "Chicago",
      }),
    ]);
  });
});
