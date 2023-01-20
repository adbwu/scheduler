import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getByTestId, getAllByTestId, getByAltText, getByPlaceholderText, prettyDOM } from "@testing-library/react";

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

  const appointment = getAllByTestId(container, "appointment")[0];
  const day = getAllByTestId(container, "day")[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
});