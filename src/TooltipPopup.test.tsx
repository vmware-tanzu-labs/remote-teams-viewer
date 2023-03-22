import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TooltipPopup } from "./TooltipPopup";
import { anEmployee, EmployeeJson } from "./EmployeeJson";
import { Office } from "./Office";
import { textContentMatcher } from "./util/TextContentMatcher";

describe("Tooltip Popup for Marker", function () {
  const denver = {
    name: "Denver",
    latitude: 39.7564649,
    longitude: -105.0086761,
    timezone: "Mountain",
  };

  it("tooltip should display employee levels with the role count", async function () {
    const employees: EmployeeJson[] = [
      anEmployee({
        role: "Ice cream scooper",
        level: "P3",
        office: "Denver",
      }),
      anEmployee({
        role: "Ice cream manager",
        level: "P4",
        office: "Denver",
      }),
      anEmployee({
        role: "Ice cream eater",
        level: "P4",
        office: "Denver",
      }),
      anEmployee({
        role: "Ice cream eater",
        level: "P4",
        office: "Denver",
      }),
    ];

    render(<TooltipPopup office={Office.FromJson([denver], employees)[0]} />);

    await userEvent.click(screen.getByText("Levels"));

    expect(
      await screen.findByText(textContentMatcher("P4 - 1 x Ice cream manager, 2 x Ice cream eater")),
    ).toBeInTheDocument();
    expect(await screen.findByText(textContentMatcher("P3 - 1 x Ice cream scooper"))).toBeInTheDocument();
  });

  it("tooltip should display employee roles with the total role count", async function () {
    const employees: EmployeeJson[] = [
      anEmployee({
        role: "Ice cream scooper",
        office: "Denver",
      }),
      anEmployee({
        role: "Ice cream eater",
        office: "Denver",
      }),
      anEmployee({
        role: "Ice cream eater",
        office: "Denver",
      }),
    ];

    render(<TooltipPopup office={Office.FromJson([denver], employees)[0]} />);

    await userEvent.click(screen.getByText("Roles"));

    expect(await screen.findByText(textContentMatcher("2 x Ice cream eater"))).toBeInTheDocument();
    expect(await screen.findByText(textContentMatcher("1 x Ice cream scooper"))).toBeInTheDocument();
  });

  it("tooltip should display employee names", async function () {
    const employees: EmployeeJson[] = [
      anEmployee({
        role: "Ice cream scooper",
        level: "P6",
        office: "Denver",
        employeeFirstName: "Adam",
        employeeLastName: "Sandler",
      }),
    ];

    render(<TooltipPopup office={Office.FromJson([denver], employees)[0]} />);

    await userEvent.click(screen.getByText("Names"));

    expect(await screen.findByText(textContentMatcher("Adam S"))).toBeInTheDocument();
  });
});
