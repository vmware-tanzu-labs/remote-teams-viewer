import { fireEvent, render, screen } from "@testing-library/react";
import { OfficeMap } from "./OfficeMap";
import { Marker } from "react-leaflet";
import allTimeZonesJson from "./data/all-timezones_.json";
import { anEmployee, EmployeeJson } from "./EmployeeJson";
import { EmployeeDetails, Office } from "./Office";

describe("Office Map", function () {
  const denver = {
    name: "Denver",
    latitude: 39.7564649,
    longitude: -105.0086761,
    timezone: "Mountain",
  };
  const chicago = {
    name: "Chicago",
    latitude: 41.8884096,
    longitude: -87.6354498,
    timezone: "Central",
  };
  const remoteIllinois = {
    name: "Remote - Illinois",
    latitude: 41.9884096,
    longitude: -87.6354498,
    timezone: "Central",
  };
  const boulder = {
    name: "Boulder",
    latitude: 41.9884096,
    longitude: -87.6354498,
    timezone: "Mountain",
  };
  const employees: EmployeeJson[] = [
    anEmployee({
      office: "Chicago",
    }),
    anEmployee({
      office: "Denver",
    }),
  ];

  beforeEach(() => {
    localStorage.setItem("TimezoneCheckbox", "true");
    localStorage.setItem("OfficeHubsIcon", "true");
    localStorage.setItem("RemoteIcon", "true");
  });

  it("renders only offices with employees", function () {
    render(
      <OfficeMap
        MarkerComponent={Marker}
        offices={Office.FromJson([denver, chicago, remoteIllinois, boulder], employees)}
        timezoneGeoJson={allTimeZonesJson}
      />,
    );

    expect(screen.queryAllByAltText("Marker")).toHaveLength(2);
  });

  it("calls the marker component with the correct positions", function () {
    const mockMarker = jest.fn(() => null);

    render(
      <OfficeMap
        MarkerComponent={mockMarker}
        offices={Office.FromJson([denver, chicago], employees)}
        timezoneGeoJson={allTimeZonesJson}
      />,
    );

    expect(mockMarker).toHaveBeenCalledTimes(2);
    expect((mockMarker.mock.calls[0] as any[])[0].position).toEqual({
      lat: denver.latitude,
      lng: denver.longitude,
    });
    expect((mockMarker.mock.calls[1] as any[])[0].position).toEqual({
      lat: chicago.latitude,
      lng: chicago.longitude,
    });
  });

  it("clicking an office opens tooltip with office name displayed", function () {
    render(
      <OfficeMap
        MarkerComponent={Marker}
        offices={Office.FromJson([denver], employees)}
        timezoneGeoJson={allTimeZonesJson}
      />,
    );

    expect(screen.queryByText(denver.name)).not.toBeInTheDocument();

    click(screen.getByAltText("Marker"));

    expect(screen.getByText(denver.name)).toBeInTheDocument();
  });

  it("tooltips stay open until closed", function () {
    render(
      <OfficeMap
        MarkerComponent={Marker}
        offices={Office.FromJson([chicago, denver], employees)}
        timezoneGeoJson={allTimeZonesJson}
      />,
    );

    screen.queryAllByAltText("Marker").forEach((marker) => {
      click(marker);
    });

    expect(screen.getByText(chicago.name)).toBeInTheDocument();
    expect(screen.getByText(denver.name)).toBeInTheDocument();

    click(screen.getAllByRole("button").filter((x) => x.className === "leaflet-popup-close-button")[0]);

    expect(screen.queryByText(chicago.name)).not.toBeInTheDocument();
    expect(screen.getByText(denver.name)).toBeInTheDocument();

    click(screen.getAllByRole("button").filter((x) => x.className === "leaflet-popup-close-button")[0]);

    expect(screen.queryByText(chicago.name)).not.toBeInTheDocument();
    expect(screen.queryByText(denver.name)).not.toBeInTheDocument();
  });

  describe("Searching for employees", () => {
    const employees: EmployeeJson[] = [
      anEmployee({
        office: "Remote - Illinois",
        employeeLastName: "Pitt",
        employeeFirstName: "Brad",
        role: "PM",
      }),
      anEmployee({
        office: "Denver",
        employeeLastName: "Willis",
        employeeFirstName: "Bruce",
        role: "Des",
      }),
    ];

    it("should show names of searched employees adjacent to their pins", () => {
      render(
        <OfficeMap
          MarkerComponent={Marker}
          offices={Office.FromJson([remoteIllinois, denver], employees)}
          timezoneGeoJson={allTimeZonesJson}
          employeesSearched={true}
        />,
      );

      expect(screen.getByText(EmployeeDetails.FromEmployeeJson(employees[0]).abbrName)).toBeInTheDocument();
      expect(screen.getByText(EmployeeDetails.FromEmployeeJson(employees[1]).abbrName)).toBeInTheDocument();
    });

    it.each([
      { role: "Eng", roleSrc: "devIcon.png" },
      { role: "PM", roleSrc: "pmIcon.png" },
      { role: "Des", roleSrc: "desIcon.png" },
    ])("displays the $role icon", ({ role, roleSrc }) => {
      const employee: EmployeeJson[] = [
        anEmployee({
          office: "Remote - Illinois",
          employeeLastName: "Pitt",
          employeeFirstName: "Brad",
          role: role,
        }),
      ];

      render(
        <OfficeMap
          MarkerComponent={Marker}
          offices={Office.FromJson([remoteIllinois], employee)}
          timezoneGeoJson={allTimeZonesJson}
          employeesSearched={true}
        />,
      );

      const roleIcon = screen.getByRole("button", { name: "Marker" });
      expect(roleIcon).toHaveAttribute("src", roleSrc);
    });
  });
});

function click(element: Document | Element | Window | Node) {
  fireEvent(
    element,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    }),
  );
}
