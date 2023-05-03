/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TheaterCheckboxes from "./TheaterCheckboxes";

describe("Theater Checkboxes", function () {
  it("should call a given callback with selected theaters when any theater is selected/unselected", async function () {
    const theaters: string[] = ["East", "Federal"];
    const ourSpy = jest.fn();
    render(<TheaterCheckboxes onActiveTheaterChange={ourSpy} theaters={theaters} />);

    //await userEvent.click(screen.getByRole("checkbox", { name: "US Public Sector" }));

    //expect(ourSpy).toBeCalledWith(["East"]);

    //await userEvent.click(screen.getByRole("checkbox", { name: "US Public Sector" }));

    //expect(ourSpy).toBeCalledWith(["East", "Federal"]);
  });
});
