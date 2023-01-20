import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, prettyDOM } from "@testing-library/react";

import Application from "components/Application";

import Axios from "axios";

jest.mock('Axios');


afterEach(cleanup);

describe("Appointment", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
    .then(() => {
      fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // console.log(prettyDOM(container));

    const appointment = getAllByTestId(container, "appointment")[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));

    console.log(prettyDOM(appointment));
  });
});