import { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
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
import logo from "./assets/logo.png";
// @ts-ignore
import staffUploadTemplate from "./assets/templates/staff-upload-template.csv";
import { parseCsv } from "parser";
import Papa from "papaparse";

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

  const handleFilePicker = (event: { target: { files: any } } | void) => {
    if (event?.target) {
      let reader = new FileReader();
      reader.onload = function () {
        if (reader?.result && reader?.result && typeof reader.result === "string") {
          Papa.parse(reader.result, {
            complete: (results) => {
              const parsedEmployees = parseCsv(results.data as string[][], true);
              setEmployees(parsedEmployees);
              setFilters({ ...filters, includeEmployees: [] });
              setAutocompleteKey(autocompleteKey + ".");
            },
          });
        }
      };

      reader.readAsText(event?.target?.files[0]);
    }
  };

  return (
    <div>
      <header>
        <div className="banner">
          <img className="logo-image" src={logo} alt="Logo" />
          <h1 className="logo-text">Remote Teams Viewer</h1>
        </div>
        <div className="banner">
          <div>
            <br />
            <Button variant="contained" color="primary" component="label">
              Upload Your Data
              <input
                data-testid="file-upload"
                type="file"
                accept=".csv"
                onChange={handleFilePicker}
                style={{ display: "none" }}
              />
            </Button>
            <br />
            <a href={staffUploadTemplate} target="_blank" style={{ textDecoration: "none" }} rel="noreferrer">
              <Button
                variant="text"
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "65%",
                  marginLeft: "12px",
                }}
              >
                Download CSV Template
              </Button>
            </a>
          </div>
        </div>
      </header>
      <main>
        <div className="search-container">
          <EmployeeFilter
            employees={employees.filter((e) => e.employeeFirstName.length > 0)}
            onFilterChange={filterByEmployees}
            key={autocompleteKey}
          />

          <div className="theater-checkboxes">
            <TheaterCheckboxes theaters={THEATERS} onActiveTheaterChange={filterByTheaters} />
          </div>
        </div>
        <TimezoneCards offices={filteredOffices} />
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
