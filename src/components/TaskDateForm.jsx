import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button, FormControl, Stack } from "@mui/material";
import DatePicker from "react-datepicker";
import { Form } from "react-bootstrap";

const TaskDateForm = ({ GetDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarMode, setCalendarMode] = useState(null); // 'onDate' or 'beforeDate'
  const handleDateSelection = (mode) => {
    setCalendarMode(mode);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalendarMode(null);
    GetDate(date?.toLocaleDateString());
  };
  return (
    <FormControl>
      <Form.Label>When do you need this done?</Form.Label>
      <Stack direction="row" spacing={2}>
        <Button
          size="small"
          variant={calendarMode === "onDate" ? "contained" : "outlined"}
          sx={{ textTransform: "capitalize", borderRadius: 30 }}
          onClick={() => handleDateSelection("onDate")}
        >
          On Date
        </Button>
        <Button
          size="small"
          variant={calendarMode === "beforeDate" ? "contained" : "outlined"}
          sx={{ textTransform: "capitalize", borderRadius: 30 }}
          onClick={() => handleDateSelection("beforeDate")}
        >
          Before Date
        </Button>
      </Stack>
      {/* Calendar Display */}
      {calendarMode && (
        <div style={{ position: "relative", marginTop: 20, zIndex: 1 }}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
          />
        </div>
      )}
    </FormControl>
  );
};

export default TaskDateForm;
