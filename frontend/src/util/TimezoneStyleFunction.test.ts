/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import { styleGeoJson } from "./TimezoneStyleFunction";

describe("Style function", function () {
  it("style function correctly returns the right timezone colors", function () {
    const pst = {
      type: "Feature",
      geometry: {
        type: "MultiPolygon",
        coordinates: [[[-118.508118, 32.867916]]],
      },
      properties: {
        tz_name1st: "America/Los_Angeles",
      },
    };

    expect(styleGeoJson(pst)).toEqual({
      stroke: false,
      fillColor: "#ff5b14",
      fillOpacity: 0.3,
    });
  });

  it("style function correctly returns default value on null", function () {
    const pst = {
      type: "Feature",
      geometry: {
        type: "MultiPolygon",
        coordinates: [[[-118.508118, 32.867916]]],
      },
    };

    expect(styleGeoJson(pst)).toEqual({
      stroke: false,
      fillColor: "#555555",
      fillOpacity: 0.3,
    });
  });
});
