/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import { PathOptions } from "leaflet";

// West Coast: (Red) #ff5b14
// Mountain: (Yellow) #ccff14
// Central: (Green) #14ff5b
// East Coast: (Blue) #14a1ff

export function styleGeoJson(geoJsonFeature: any): PathOptions {
  const options: PathOptions = {
    stroke: false,
    fillOpacity: 0.3,
    fillColor: "#555555",
  };

  if (geoJsonFeature.properties === undefined) {
    return options;
  }

  switch (geoJsonFeature.properties.tz_name1st) {
    case "America/Los_Angeles": {
      options.fillColor = "#ff5b14";
      break;
    }
    case "America/Denver": {
      options.fillColor = "#ccff14";
      break;
    }
    case "America/Chicago": {
      options.fillColor = "#14ff5b";
      break;
    }
    case "America/New_York": {
      options.fillColor = "#14a1ff";
      break;
    }
    default: {
      options.fillOpacity = 0.0;
    }
  }

  return options;
}
