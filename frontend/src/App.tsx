/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import Tooltip from "@mui/material/Tooltip";
import "./LeafletIcons";
import "./App.css";
import allTimeZonesJson from "./data/all-timezones_.json";
import { EmployeeJson } from "./EmployeeJson";
import { Office } from "./Office";
import { OfficeMap } from "./OfficeMap";
import TheaterCheckboxes from "./TheaterCheckboxes";
import { TimezoneCards } from "./TimezoneCards";
import EmployeeFilter from "./EmployeeFilter";
import { getFilteredOffices } from "./services/WorkforceService";
import { Button } from "@mui/material";
// @ts-ignore
import staffUploadTemplate from "./assets/templates/staff-upload-template.csv";
import { parseCsv } from "parser";
import Papa from "papaparse";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";

export type OfficeFilters = {
  includeTheaters: string[];
  includeEmployees: EmployeeJson[];
};
type Props = {
  employees: EmployeeJson[];
  offices: Office[];
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeJson[]>>;
};

function App({ employees, offices, setEmployees }: Props) {
  const THEATERS = ["East", "Federal"];
  const [filteredOffices, setFilteredOffices] = useState<Office[]>(offices);
  const [filters, setFilters] = useState<OfficeFilters>({ includeTheaters: THEATERS, includeEmployees: [] });
  const [autocompleteKey, setAutocompleteKey] = useState<string>("Autocomplete Input");

  useEffect(() => {
    const activeTheaters = ["East", "Federal"].filter((theater) => localStorage.getItem(theater) !== "false");
    getFilteredOffices(employees, { ...filters, includeTheaters: activeTheaters }).then((value) => {
      setFilteredOffices(value);
    });
  }, [employees, filters]);

  const filterByEmployees = (employees: EmployeeJson[]) => {
    setFilters({ ...filters, includeEmployees: employees });
  };

  const filterByTheaters = (theaters: string[]) => {
    setFilters({ ...filters, includeTheaters: theaters });
  };

  const csvToArray = (rows: any[]) => {
    return rows.map((row: any) => row.toString().split(","));
  };

  const handleFilePicker = (event: { target: { files: any } } | void) => {
    if (event?.target) {
      let file = event.target.files[0];
      Papa.parse(file, {
        complete: (results) => {
          const parsedEmployees = parseCsv(csvToArray(results.data as string[]), true);
          localStorage.setItem("fileUploaded", "true");
          setEmployees(parsedEmployees);
          setFilters({ ...filters, includeEmployees: [] });
          setAutocompleteKey(autocompleteKey + ".");
        },
      });
    }
  };

  const uploadTooltipText =
    "Expected values for each column are as follows:\n" +
    '*Employee Name: "FirstName" "LastName"\n' +
    '*Role: "Designer", "Engineer", or "Product Manager"\n' +
    "Level: Optional, input levels available at your organization\n" +
    '*Location: "StateProvince"\n' +
    '*Timezone: "PT", "MT", "CT", or "ET"\n' +
    "\n" +
    "* - indicates a required field";

  return (
    <div>
      <header>
        <div className="banner">
          <h1>Remote Teams Viewer</h1>
        </div>
      </header>
      <main style={{ backgroundColor: "white", color: "dimgray" }}>
        <div className="container">
          <div className="instruction-container">
            <div className="instructions">
              <p>
                <b>Instructions:</b>{" "}
                <b>
                  <a
                    href={staffUploadTemplate}
                    target="_blank"
                    style={{ textDecoration: "none", color: "#49AFD9" }}
                    rel="noreferrer"
                  >
                    Download the CSV template
                  </a>
                </b>
                &nbsp; to fill with your team data then upload it to see them displayed. <br />
                <i>
                  Notice: The data uploaded is not saved and the data will be removed once your refresh or close this
                  page.
                </i>
              </p>
            </div>
            <div className="upload-container">
              <div className="upload-button">
                <Button variant="contained" color="primary" component="label" style={{ color: "white" }}>
                  Upload Your Data
                  <input
                    data-testid="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleFilePicker(e)}
                    style={{ display: "none" }}
                  />
                </Button>
              </div>
              <div className="upload-tooltip">
                <Tooltip title={uploadTooltipText}>
                  <IconButton>
                    <HelpIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="search-container">
            <EmployeeFilter
              employees={employees.filter((e) => e.employeeFirstName.length > 0)}
              onFilterChange={filterByEmployees}
              key={autocompleteKey}
            />
          </div>
          <div className="checkbox-container">
            <TheaterCheckboxes theaters={THEATERS} onActiveTheaterChange={filterByTheaters} />
          </div>
        </div>
        <div>
          <TimezoneCards offices={filteredOffices} />
        </div>
        <div>
          <OfficeMap
            MarkerComponent={Marker}
            id="map-container"
            offices={filteredOffices}
            timezoneGeoJson={allTimeZonesJson}
            employeesSearched={filters.includeEmployees.length !== 0}
          />
        </div>
      </main>
    </div>
  );
}
export default App;
