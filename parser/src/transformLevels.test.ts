import { transformLevels } from "./transformLevels";
import { EveryoneJson } from "./parseToJson";

describe("transformLevels", function () {
  it("converts full job profile name into just the level", function () {
    expect(
      transformLevels([
        {
          jobProfile: "ENMTMT_P6",
        } as EveryoneJson,
        {
          jobProfile: "ENPDPM_M4",
        } as EveryoneJson,
      ])
    ).toEqual([
      expect.objectContaining({
        level: "P6",
      }),
      expect.objectContaining({
        level: "M4",
      }),
    ]);
  });

  it("passes through un-parsable levels", function () {
    expect(
      transformLevels([
        {
          jobProfile: "some-nonsense",
        } as EveryoneJson,
        {
          jobProfile: "some-other_nonsense",
        } as EveryoneJson,
      ])
    ).toEqual([
      expect.objectContaining({
        level: "some-nonsense",
      }),
      expect.objectContaining({
        level: "some-other_nonsense",
      }),
    ]);
  });
});
