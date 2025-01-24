import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskDateForm = ({ GetDate, isFlexible }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [Flexible, setFlexible] = useState(false);

  const handleFlexibleClick = () => {
    setFlexible(true);
    setSelectedDate(null); // Clear the date if "Flexible" is selected
    isFlexible(true); // Call the external isFlexible function with `true`
  };

  const handleDateClick = () => {
    setFlexible(false);
    setShowCalendar(!showCalendar); // Toggle the calendar visibility
  };

  return (
    <div style={{ paddingTop: 20 }}>
      <Form.Label>When do you need this done?</Form.Label>
      <Stack direction="row" spacing={2}>
        <Button
          size="small"
          variant="outlined"
          sx={{ textTransform: "capitalize", borderRadius: 30 }}
          onClick={handleDateClick}
        >
          {showCalendar ? "Hide Calendar" : "on date"}
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={{ textTransform: "capitalize", borderRadius: 30 }}
          onClick={handleDateClick}
        >
          {showCalendar ? "Hide Calendar" : "before date"}
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={{ textTransform: "capitalize", borderRadius: 30 }}
          onClick={handleFlexibleClick}
        >
          I'm Flexible
        </Button>
      </Stack>

      {/* Display the selected date or "Flexible" status */}
      {/* <div style={{ marginTop: 20 }}>
        {Flexible ? (
          <p>Selected: Flexible</p>
        ) : selectedDate ? (
          <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
        ) : (
          <p>No date selected</p>
        )}
      </div> */}

      {/* Calendar */}
      <div style={{ position: "absolute", zIndex: 1 }}>
        {showCalendar && (
          <div style={{ marginTop: "20px" }}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setFlexible(false); // Ensure "Flexible" is false when a date is selected
                setShowCalendar(false); // Hide the calendar after selecting a date
                GetDate(date?.toLocaleDateString()); // Pass the date to the external GetDate function
              }}
              inline
            />
          </div>
        )}
      </div>

      {/* <section
        style={{ display: Flexible == true ? "block" : "none" }}
        className="time_selection"
      >
        <Card
          onClick={() => {
            alert("");
          }}
          style={{ padding: 10, display: "inline-block" }}
        >
          <svg
            height="32"
            width="32"
            data-ui-test="morning-time-icon-button-icon"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M1.288 14.712A.965.965 0 0 0 2 15h20a.968.968 0 0 0 .713-.288A.967.967 0 0 0 23 14a.97.97 0 0 0-.287-.713A.97.97 0 0 0 22 13h-5.1a5.002 5.002 0 0 0-9.8 0H2a.967.967 0 0 0-.712.287A.968.968 0 0 0 1 14c0 .283.096.52.288.712ZM9.171 13h5.658a3.001 3.001 0 0 0-5.658 0Zm2.117-6.288A.965.965 0 0 0 12 7a.968.968 0 0 0 .713-.288A.967.967 0 0 0 13 6V4a.97.97 0 0 0-.287-.713A.97.97 0 0 0 12 3a.967.967 0 0 0-.712.287A.968.968 0 0 0 11 4v2c0 .283.096.52.288.712ZM4.575 8 5.65 9.05c.2.183.438.279.713.287a.854.854 0 0 0 .687-.287c.183-.2.275-.433.275-.7 0-.267-.092-.5-.275-.7L6 6.575a.908.908 0 0 0-.7-.3c-.283 0-.525.1-.725.3-.183.2-.28.442-.288.725a.872.872 0 0 0 .288.7Zm12.088.362a.855.855 0 0 0 .287.688c.2.183.433.275.7.275.267 0 .5-.092.7-.275L19.425 8c.2-.183.3-.417.3-.7s-.1-.525-.3-.725c-.2-.183-.442-.28-.725-.288a.872.872 0 0 0-.7.288L16.95 7.65c-.183.2-.279.437-.287.712ZM6 19a.965.965 0 0 1-.712-.288A.965.965 0 0 1 5 18c0-.283.096-.521.288-.713A.967.967 0 0 1 6 17h12a.97.97 0 0 1 .713.287A.97.97 0 0 1 19 18a.97.97 0 0 1-.287.712A.968.968 0 0 1 18 19H6Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p className="p-0 m-0">Morning</p>
          <small>Before 10am</small>
        </Card>
        <Card style={{ padding: 10, display: "inline-block" }}>
          <svg
            height="32"
            width="32"
            data-ui-test="midday-time-icon-button-icon"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M14.125 14.125A2.893 2.893 0 0 1 12 15a2.893 2.893 0 0 1-2.125-.875A2.893 2.893 0 0 1 9 12c0-.833.292-1.542.875-2.125A2.893 2.893 0 0 1 12 9c.833 0 1.542.292 2.125.875S15 11.167 15 12s-.292 1.542-.875 2.125Zm-5.662 1.412C9.438 16.512 10.617 17 12 17s2.563-.488 3.538-1.463C16.513 14.562 17 13.383 17 12s-.487-2.563-1.462-3.538C14.563 7.487 13.383 7 12 7s-2.562.487-3.537 1.462C7.488 9.437 7 10.617 7 12s.488 2.562 1.463 3.537Zm-7.175-2.825A.965.965 0 0 0 2 13h2a.968.968 0 0 0 .713-.288A.967.967 0 0 0 5 12a.97.97 0 0 0-.287-.713A.97.97 0 0 0 4 11H2a.967.967 0 0 0-.712.287A.968.968 0 0 0 1 12c0 .283.096.52.288.712Zm18 0A.965.965 0 0 0 20 13h2c.283 0 .52-.096.712-.288A.965.965 0 0 0 23 12a.968.968 0 0 0-.288-.713A.967.967 0 0 0 22 11h-2a.967.967 0 0 0-.712.287A.968.968 0 0 0 19 12c0 .283.096.52.288.712Zm-8-8A.965.965 0 0 0 12 5a.968.968 0 0 0 .713-.288A.967.967 0 0 0 13 4V2a.97.97 0 0 0-.287-.713A.97.97 0 0 0 12 1a.967.967 0 0 0-.712.287A.968.968 0 0 0 11 2v2c0 .283.096.52.288.712Zm0 18A.965.965 0 0 0 12 23a.968.968 0 0 0 .713-.288A.967.967 0 0 0 13 22v-2a.967.967 0 0 0-.287-.712A.968.968 0 0 0 12 19a.965.965 0 0 0-.712.288A.965.965 0 0 0 11 20v2c0 .283.096.52.288.712ZM4.575 6 5.65 7.05c.2.183.438.279.713.287a.854.854 0 0 0 .687-.287c.183-.2.275-.433.275-.7 0-.267-.092-.5-.275-.7L6 4.575a.908.908 0 0 0-.7-.3c-.283 0-.525.1-.725.3-.183.2-.28.442-.288.725a.872.872 0 0 0 .288.7ZM16.95 18.35 18 19.425c.183.2.417.3.7.3s.525-.1.725-.3c.183-.2.28-.442.288-.725a.872.872 0 0 0-.288-.7l-1.075-1.05a1.067 1.067 0 0 0-.712-.287.855.855 0 0 0-.688.287.934.934 0 0 0-.275.688c0 .275.092.512.275.712Zm-.287-11.988a.855.855 0 0 0 .287.688c.2.183.433.275.7.275.267 0 .5-.092.7-.275L19.425 6c.2-.183.3-.417.3-.7s-.1-.525-.3-.725c-.2-.183-.442-.28-.725-.288a.872.872 0 0 0-.7.288L16.95 5.65c-.183.2-.279.437-.287.712ZM4.275 18.7c0 .283.1.525.3.725.2.183.442.279.725.287a.869.869 0 0 0 .7-.287l1.05-1.075c.183-.2.28-.437.288-.712a.858.858 0 0 0-.288-.688.932.932 0 0 0-.687-.275 1.02 1.02 0 0 0-.713.275L4.575 18c-.2.183-.3.417-.3.7Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p className="p-0 m-0">Morning</p>
          <small>Before 10am</small>
        </Card>
        <Card style={{ padding: 10, display: "inline-block" }}>
          <svg
            height="32"
            width="32"
            data-ui-test="afternoon-time-icon-button-icon"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M1.288 16.712A.965.965 0 0 0 2 17h20a.968.968 0 0 0 .713-.288A.967.967 0 0 0 23 16a.97.97 0 0 0-.287-.713A.97.97 0 0 0 22 15h-6a5 5 0 1 0-8 0H2a.967.967 0 0 0-.712.287A.968.968 0 0 0 1 16c0 .283.096.52.288.712ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-.712-9.288A.965.965 0 0 0 12 6a.968.968 0 0 0 .713-.288A.967.967 0 0 0 13 5V3a.97.97 0 0 0-.287-.713A.97.97 0 0 0 12 2a.967.967 0 0 0-.712.287A.968.968 0 0 0 11 3v2c0 .283.096.52.288.712ZM4.575 7 5.65 8.05c.2.183.438.279.713.287a.854.854 0 0 0 .687-.287c.183-.2.275-.433.275-.7 0-.267-.092-.5-.275-.7L6 5.575a.908.908 0 0 0-.7-.3c-.283 0-.525.1-.725.3-.183.2-.28.442-.288.725a.872.872 0 0 0 .288.7Zm12.088.362a.855.855 0 0 0 .287.688c.2.183.433.275.7.275.267 0 .5-.092.7-.275L19.425 7c.2-.183.3-.417.3-.7s-.1-.525-.3-.725c-.2-.183-.442-.28-.725-.288a.872.872 0 0 0-.7.288L16.95 6.65c-.183.2-.279.437-.287.712ZM6 21a.965.965 0 0 1-.712-.288A.965.965 0 0 1 5 20c0-.283.096-.521.288-.713A.967.967 0 0 1 6 19h12a.97.97 0 0 1 .713.287A.97.97 0 0 1 19 20a.97.97 0 0 1-.287.712A.968.968 0 0 1 18 21H6Zm-4.712-8.288A.965.965 0 0 0 2 13h2a.968.968 0 0 0 .713-.288A.967.967 0 0 0 5 12a.97.97 0 0 0-.287-.713A.97.97 0 0 0 4 11H2a.967.967 0 0 0-.712.287A.968.968 0 0 0 1 12c0 .283.096.52.288.712ZM20 13a.965.965 0 0 1-.712-.288A.965.965 0 0 1 19 12c0-.283.096-.521.288-.713A.967.967 0 0 1 20 11h2a.97.97 0 0 1 .713.287A.97.97 0 0 1 23 12a.97.97 0 0 1-.287.712A.968.968 0 0 1 22 13h-2Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p className="p-0 m-0">Morning</p>
          <small>Before 10am</small>
        </Card>
        <Card style={{ padding: 10, display: "inline-block" }}>
          <svg
            height="32"
            width="32"
            data-ui-test="evening-time-icon-button-icon"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 23H6c-1.383 0-2.562-.487-3.537-1.462C1.488 20.563 1 19.383 1 18s.488-2.563 1.463-3.538c.19-.19.389-.362.595-.515a4.219 4.219 0 0 1-.045-.472c-.009-.2-.013-.392-.013-.575 0-2.433.775-4.58 2.325-6.438C6.875 4.604 8.85 3.45 11.25 3c-.3 1.65-.208 3.262.275 4.837a9.866 9.866 0 0 0 2.5 4.138 9.866 9.866 0 0 0 4.138 2.5c1.575.483 3.187.575 4.837.275-.433 2.4-1.583 4.375-3.45 5.925C17.683 22.225 15.533 23 13.1 23h-2.6ZM5 13.091A5.34 5.34 0 0 1 6 13c1 0 1.913.27 2.738.812A4.911 4.911 0 0 1 10.575 16c.95.033 1.758.387 2.425 1.062.667.675 1 1.488 1 2.438 0 .535-.105 1.026-.314 1.474a8.047 8.047 0 0 0 3.727-1.224 7.82 7.82 0 0 0 2.712-2.875 12.412 12.412 0 0 1-4.075-1.087 11.891 11.891 0 0 1-3.45-2.413 12.087 12.087 0 0 1-2.425-3.45A11.804 11.804 0 0 1 9.1 5.85a7.795 7.795 0 0 0-3.012 2.962A8.048 8.048 0 0 0 5 12.9v.191Zm6.562 7.471A1.444 1.444 0 0 1 10.5 21H6a2.893 2.893 0 0 1-2.125-.875A2.893 2.893 0 0 1 3 18c0-.85.292-1.562.875-2.137S5.167 15 6 15c.6 0 1.15.163 1.65.488.5.325.867.762 1.1 1.312l.5 1.2h1.3c.4 0 .742.146 1.025.438.283.291.425.645.425 1.062 0 .417-.146.77-.438 1.062Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p className="p-0 m-0">Morning</p>
          <small>Before 10am</small>
        </Card>
      </section> */}
    </div>
  );
};

export default TaskDateForm;
