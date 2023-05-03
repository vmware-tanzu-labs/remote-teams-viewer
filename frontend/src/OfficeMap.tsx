/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import React from "react";
import {
  GeoJSON,
  LayerGroup,
  LayersControl,
  MapContainer,
  MarkerProps,
  Popup,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import { Office } from "./Office";
import { LocationAssociatedNames, TooltipPopup } from "./TooltipPopup";
import { DesIcon, DevIcon, HomeIcon, PmIcon } from "./LeafletIcons";
import { styleGeoJson } from "./util/TimezoneStyleFunction";
import { Icon } from "leaflet";

type Props = {
  id?: string;
  offices: Office[];
  timezoneGeoJson: any;
  MarkerComponent: React.ElementType<MarkerProps>;
  employeesSearched?: boolean;
};

function isFilterChecked(filterName: string) {
  return localStorage.getItem(filterName) === "false" ? false : true;
}

export function OfficeMap({ id, offices, timezoneGeoJson, MarkerComponent, employeesSearched }: Props) {
  function getMarkerComponent(office: Office, icon: Icon) {
    let displayIcon;
    if (employeesSearched) {
      const employeeRole = office.roleSummary()[0].role;
      if (employeeRole === "Eng") {
        displayIcon = DevIcon;
      } else if (employeeRole === "PM") {
        displayIcon = PmIcon;
      } else if (employeeRole === "Des") {
        displayIcon = DesIcon;
      }
    } else {
      displayIcon = icon;
    }
    return (
      <MarkerComponent position={{ lat: office.latitude, lng: office.longitude }} key={office.name} icon={displayIcon}>
        {employeesSearched && (
          <Tooltip direction="top" offset={[0, -30]} opacity={1} permanent>
            <LocationAssociatedNames office={office} />
          </Tooltip>
        )}
        <Popup autoClose={false}>
          <TooltipPopup office={office} />
        </Popup>
      </MarkerComponent>
    );
  }

  const checkboxEventHandlers = (checkboxName: string) => ({
    add: () => {
      localStorage.setItem(checkboxName, "true");
    },
    remove: () => localStorage.setItem(checkboxName, "false"),
  });

  return (
    <MapContainer
      id={id}
      maxBounds={[
        [75, -151],
        [0, -33],
      ]}
      center={{ lat: 39.0902, lng: -95.7129 }}
      zoom={4}
      minZoom={2}
      maxZoom={10}
      zoomControl={false}
      closePopupOnClick={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      <LayersControl position="bottomleft">
        <LayersControl.Overlay checked={isFilterChecked("RemoteIcon")} name="Remote">
          <LayerGroup eventHandlers={checkboxEventHandlers("RemoteIcon")}>
            {"false" === process.env.REACT_APP_DEMO || localStorage.getItem("fileUploaded") === "true"
              ? offices.filter((o) => o.employees.length !== 0).map((office) => getMarkerComponent(office, HomeIcon))
              : []}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked={isFilterChecked("TimezoneCheckbox")} name="Timezones">
          <GeoJSON
            key="geojson-timezones"
            data={timezoneGeoJson as any}
            style={styleGeoJson}
            eventHandlers={checkboxEventHandlers("TimezoneCheckbox")}
          ></GeoJSON>
        </LayersControl.Overlay>
      </LayersControl>
      )
    </MapContainer>
  );
}
