/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import officeIcon from "./assets/officeIcon.png";
import homeIcon from "./assets/homeIcon.png";
import devIcon from "./assets/devIcon.png";
import pmIcon from "./assets/pmIcon.png";
import desIcon from "./assets/desIcon.png";

export const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [16, 32],
});

// Generated from: https://mapicons.mapsmarker.com/markers/offices/real-estate/office-building/?custom_color=ff7b00
export const OfficeIcon = L.icon({
  iconUrl: officeIcon,
  shadowUrl: markerShadow,
  iconAnchor: [16, 33],
  iconSize: [32, 37],
});

// Generated from: https://mapicons.mapsmarker.com/markers/friends-family/home/?custom_color=00a6ff
export const HomeIcon = L.icon({
  iconUrl: homeIcon,
  shadowUrl: markerShadow,
  iconAnchor: [16, 33],
  iconSize: [32, 37],
});

export const DevIcon = L.icon({
  iconUrl: devIcon,
  shadowUrl: markerShadow,
  iconAnchor: [16, 33],
  iconSize: [30, 30],
});
export const PmIcon = L.icon({
  iconUrl: pmIcon,
  shadowUrl: markerShadow,
  iconAnchor: [16, 33],
  iconSize: [30, 30],
});

export const DesIcon = L.icon({
  iconUrl: desIcon,
  shadowUrl: markerShadow,
  iconAnchor: [16, 33],
  iconSize: [30, 30],
});

L.Marker.prototype.options.icon = DefaultIcon;
