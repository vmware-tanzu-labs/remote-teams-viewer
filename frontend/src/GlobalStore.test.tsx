import { anEmployee } from "./EmployeeJson";
import App from "./App";
import { act, render, waitFor } from "@testing-library/react";
import GlobalStore from "./GlobalStore";
import { getEmployeeJSON } from "./services/EmployeeProvider";
import { getOfficeJSON } from "./services/OfficeProvider";

jest.mock("./services/EmployeeProvider");
jest.mock("./services/OfficeProvider");
jest.mock("./App");

const mockedGetEmployeeJson = getEmployeeJSON as jest.MockedFunction<typeof getEmployeeJSON>;
const mockedGetOfficeJson = getOfficeJSON as jest.MockedFunction<typeof getOfficeJSON>;

describe("Global Store", () => {
  it("should set employees and offices correctly", async () => {
    const employeeJSON = [
      anEmployee({
        office: "New York",
        employeeFirstName: "John",
        employeeLastName: "Doe",
        theater: "East",
        role: "Eng",
      }),
    ];
    const officeJSON = [{ name: "New York", latitude: 1, longitude: 1, timezone: "" }];
    const getEmployeeJSON = mockedGetEmployeeJson.mockResolvedValue(employeeJSON);
    const getOfficeJSON = mockedGetOfficeJson.mockResolvedValue(officeJSON);

    await act(() => {
      render(<GlobalStore />);
    });

    await waitFor(() => expect(getEmployeeJSON).toHaveBeenCalled());
    await waitFor(() => expect(getOfficeJSON).toHaveBeenCalled());

    expect(App).toBeCalledWith(
      expect.objectContaining({
        employees: [],
        offices: [],
        setEmployees: expect.any(Function),
      }),
      {},
    );
  });
});
