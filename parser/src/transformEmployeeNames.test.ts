import { EveryoneJobFamily } from "./transformJobFamilies";
import { transformEmployeeNames } from "./transformEmployeeNames";

describe("transformEmployeeNames", function () {
  it("splits the employeeName to employeeFirstName and employeeLastName", function () {
    expect(
      transformEmployeeNames(false)([
        {
          employeeName: "John Smith",
        } as EveryoneJobFamily,
        {
          employeeName: "Mary Poppins",
        } as EveryoneJobFamily,
      ])
    ).toEqual([
      expect.objectContaining({
        employeeFirstName: "John",
        employeeLastName: "Smith",
      }),
      expect.objectContaining({
        employeeFirstName: "Mary",
        employeeLastName: "Poppins",
      }),
    ]);
  });

  it("redacts employeeLastName", function () {
    expect(
      transformEmployeeNames(true)([
        {
          employeeName: "John Smith",
        } as EveryoneJobFamily,
        {
          employeeName: "Mary Poppins",
        } as EveryoneJobFamily,
      ])
    ).toEqual([
      expect.objectContaining({
        employeeLastName: "S****",
      }),
      expect.objectContaining({
        employeeLastName: "P******",
      }),
    ]);
  });
});
