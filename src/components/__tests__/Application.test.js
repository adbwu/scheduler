import React from "react";

import { render, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

describe("Application", () => {
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
  
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
  
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    });
    it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
      // 1. Render the Application.
      const { container } = render(<Application />);
    
      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));
  
      const appointments = getAllByTestId(container, "appointment");
  
      const appointment = appointments[1];
  
      // 3. Click the "Delete" button on the "Archie Cohen" appointment.
      fireEvent.click(getByAltText(appointment, "Delete"));
      
      //4. Wait until the text "Are you sure you would like to delete?" is displayed
      await waitForElement(() => getByText(appointment, "Are you sure", {exact: false}));
  
      // 5. Click the "Confirm" button.
      fireEvent.click(getByText(appointment, "Confirm"));
      
      // 6. Check that the element with the text "Deleting..." is displayed
       expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
      
      // 7. Wait until the element with the AltText "Add" is displayed.
      await waitForElement(() => getByAltText(appointment, "Add"));
    
  
      // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
      expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    });
    it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
      // 1. Render the Application.
      const { container } = render(<Application />);
    
      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));

      const appointment = getAllByTestId(container, "appointment")[1];
    
      // 3. Click the "Edit" button on the "Archie Cohen" appointment.
      fireEvent.click(getByAltText(appointment, "Edit"));
    // 4. Enter the name "Archibald Cohen" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Archibald Cohen" }
    });
    
    // 5. Click the second interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    // 8. Wait until the element with the text "Toni something" is displayed.
    await waitForElement(() => getByText(appointment, "Archibald Cohen"));

    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();

    // 9. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    });

    it("shows the save error when failing to save an appointment", async () => {
     // Fakes an error by using real axios library once 
      axios.put.mockRejectedValueOnce({response:{status: 500,
        headers: "Fake Error for Save Testing",
        data: "Shhhh it's a secret"}});

    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointment = getAllByTestId(container, "appointment")[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
  
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    //Ensures error element appears    
    await waitForElement(() => getByText(appointment, "Unable to save!"));
    });

    it("shows the delete error when failing to delete an appointment", async () => {
      // Fakes an error by using real axios library once 
       axios.delete.mockRejectedValueOnce({response:{status: 500,
         headers: "This Is Still A Fake Error for Delete Testing",
         data: "Nothing is actually wrong. Take a deep breath."}});
 
     // 1. Render the Application.
      const { container } = render(<Application />);
    
      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));
  
      const appointments = getAllByTestId(container, "appointment");
  
      const appointment = appointments[1];
  
      // 3. Click the "Delete" button on the "Archie Cohen" appointment.
      fireEvent.click(getByAltText(appointment, "Delete"));
      
      //4. Wait until the text "Are you sure you would like to delete?" is displayed
      await waitForElement(() => getByText(appointment, "Are you sure", {exact: false}));
  
      // 5. Click the "Confirm" button.
      fireEvent.click(getByText(appointment, "Confirm"));
      
    //   // 6. Check that the element with the text "Deleting..." is displayed
       expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
 
    //  //Ensures error element appears    
     await waitForElement(() => getByText(appointment, "Unable to delete!"));
     });
    
});