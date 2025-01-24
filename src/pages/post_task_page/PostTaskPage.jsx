import React, { lazy, useState } from "react";
import "./post_task_page.css";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
const Layout = lazy(() => import("../../components/layout/Layout"));
import InputFeild from "../../components/input_feild/InputFeild";
import { service_category } from "../../utils/service_category";
import { Container, Form } from "react-bootstrap";
import ApiClient from "../../services/ApiClient";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
const PostTaskPage = () => {
  const [TaskType, setTaskType] = useState();
  const [TaskDate, setTaskDate] = useState(null);
  const [TaskFlexible, setTaskFlexible] = useState("");
  const [TaskBudget, setTaskBudget] = useState();
  const [TaskDetails, setTaskDetails] = useState("");
  const [TaskLocation, setTaskLocation] = useState();
  const [isLocation, setIsLocation] = useState("in-person");
  const [calendarMode, setCalendarMode] = useState(null);
  const [error, setError] = useState({});
  const [tags, setTags] = useState([]);
  // Function to handle date selection
  const handleDateSelection = (mode) => {
    setCalendarMode(mode);
  };

  const handleDateChange = (date) => {
    const rawDate = date?.toLocaleDateString();
    const NewDate = new Date(rawDate);
    const options = { day: "numeric", month: "short" };
    let formatedDate = NewDate.toLocaleDateString("en-US", options);
    setTaskDate(formatedDate);
    setCalendarMode(null);
  };
  // handle add tags
  const handleAddTag = (event, newValue) => {
    if (newValue && !tags.includes(newValue)) {
      setTags([...tags, newValue]);
    }
  };
  // remove single tags
  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  // formate the tags like > tag,tag,tag
  const formattedTags = tags.join(", ") + (tags.length ? "," : "");
  ///////////////////////////////
  // INITIALIZE CLIENT API
  //////////////////////////////
  const ClientApi = new ApiClient(import.meta.env.VITE_API_ROOT_URI);
  const accessToken = import.meta.env.VITE_API_ACCESS_KEY;
  ///////////////////////////////
  // VALIDATE ALL INIPUT FEILD
  //////////////////////////////
  const validate = () => {
    const errors = {};

    // Check TaskType
    if (!TaskType) {
      errors.TaskType = "This field is required";
    }
    // Check TaskLocation based on isLocation
    if (isLocation === "in-person" && !TaskLocation) {
      errors.TaskLocation = "This field is required";
    } else if (isLocation !== "in-person" && TaskLocation) {
      errors.TaskLocation = "TaskLocation should not be set for remote tasks";
    }

    // Check TaskBudget
    if (!TaskBudget) {
      errors.TaskBudget = "This field is required";
    }

    // Set the error object
    setError(errors);

    // Return true if there are errors
    return Object.keys(errors).length > 0;
  };
  const reset_form = () => {
    setTaskFlexible("");
    setIsLocation(false);
    setTaskBudget("");
    setTaskDate("");
    setTaskDetails("");
    setTaskType("");
    setTaskLocation("");
  };
  ///////////////////////////////
  // HANDLE CREATE TASK
  //////////////////////////////
  const hanlde_create = async () => {
    if (!validate()) {
      const data = {
        user_id: "eec05585-bb31-48c7-8464-95cdc1e7b8d4",
        task_type: TaskType,
        task_details: TaskDetails,
        task_budget: TaskBudget,
        task_category: `'${formattedTags}'`,
        task_date: TaskDate,
        task_status: "open",
        task_location: isLocation == "in-person" ? TaskLocation : "remote",
        task_flexible_time: TaskFlexible,
      };
      // CALL CREATE API
      const response = await ClientApi.create(`api/tasks`, data, accessToken);
      if (response.status == 201) {
        reset_form();
        toast.success("Task Create Success");
      }
    }
  };
  ///////////////////////////////
  // RENDER ALL JSX HERE
  //////////////////////////////
  return (
    <Layout>
      <div className="post_task_page">
        <Container>
          <div className="post_task_page_wrapper">
            <div className="post_task_form">
              <h2 className="post_task_form_title">Create a Task</h2>
              {/* task type input */}
              <InputFeild
                fullWidth={true}
                label={"In a few words, what do you need done?"}
                onChange={(e) => setTaskType(e.target.value)}
                value={TaskType}
                className="post_task_form_input"
                type="text"
                placeholder="e.g help me to move my studio"
                error={error.TaskType && error.TaskType}
              />

              {/* task date picker */}
              <FormControl sx={{ pt: 3 }}>
                <Form.Label>When do you need this done?</Form.Label>
                <Stack direction="row" spacing={2}>
                  <Button
                    size="small"
                    variant={
                      calendarMode === "beforeDate" || TaskDate
                        ? "contained"
                        : "outlined"
                    }
                    sx={{ textTransform: "capitalize", borderRadius: 30 }}
                    onClick={() => handleDateSelection("beforeDate")}
                  >
                    Before Date
                  </Button>
                  <Box>
                    <Form.Select
                      onChange={(e) => setTaskFlexible(e.target.value)}
                      value={TaskFlexible}
                      size="sm"
                      className="rounded-5"
                      style={{
                        backgroundColor: TaskFlexible && "var(--primary-color)",
                        color: TaskFlexible && "var(--text-color)",
                        cursor: "pointer",
                      }}
                    >
                      <option value="Morning Before 10am">
                        Morning Before 10am
                      </option>
                      <option value="Midday 10am - 2pm">
                        Midday 10am - 2pm
                      </option>
                      <option value="Afternoon 2pm - 6pm">
                        Afternoon 2pm - 6pm
                      </option>
                      <option value="Evening After 6pm">
                        Evening After 6pm
                      </option>
                      <option value="Anytime">Anytime</option>
                      <option value="Flexible">Flexible</option>
                    </Form.Select>
                  </Box>
                </Stack>
                {/* Calendar Display */}
                {calendarMode && (
                  <div
                    style={{ position: "absolute", marginTop: 20, zIndex: 1 }}
                  >
                    <DatePicker
                      selected={TaskDate}
                      onChange={handleDateChange}
                      inline
                    />
                  </div>
                )}
              </FormControl>
              {/* task location field */}
              <section style={{ padding: "25px 0" }}>
                <h5>Tell us where</h5>
                <Stack direction="row" spacing={2}>
                  {/* LOCATION IN-PERSON SLOT */}
                  <Card
                    onClick={() => setIsLocation("in-person")}
                    className="post_task_form_cardbox"
                    style={{
                      background:
                        isLocation == "in-person"
                          ? "var(--text-secondary-color)"
                          : "var(--background-color)",
                    }}
                  >
                    <svg height="32" width="32" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M13.413 11.412A1.927 1.927 0 0 1 12 12c-.55 0-1.02-.196-1.412-.588A1.923 1.923 0 0 1 10 10c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 12 8c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413s-.196 1.02-.587 1.412Zm3.112 2.85c-.983 1.525-2.492 3.221-4.525 5.088-2.033-1.867-3.542-3.563-4.525-5.088C6.492 12.737 6 11.383 6 10.2c0-1.817.579-3.304 1.737-4.463C8.896 4.579 10.317 4 12 4c1.683 0 3.104.579 4.262 1.737C17.421 6.896 18 8.383 18 10.2c0 1.183-.492 2.537-1.475 4.062ZM5.988 15.637C7.313 17.596 9.317 19.717 12 22c2.683-2.283 4.688-4.404 6.013-6.363C19.338 13.679 20 11.867 20 10.2c0-2.5-.804-4.492-2.413-5.975C15.979 2.742 14.117 2 12 2c-2.117 0-3.979.742-5.587 2.225C4.804 5.708 4 7.7 4 10.2c0 1.667.663 3.479 1.988 5.437Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <h5>in-person</h5>
                    <small>
                      Select this if you need the Tasker physically there
                    </small>
                  </Card>
                  {/* LOCATION ONLINE SLOT */}
                  <Card
                    onClick={() => setIsLocation("online")}
                    className="post_task_form_cardbox"
                    style={{
                      background:
                        isLocation == "online"
                          ? "var(--text-secondary-color)"
                          : "var(--background-color)",
                    }}
                  >
                    <svg height="32" width="32" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M5.588 22.413C5.979 22.804 6.45 23 7 23h10a1.93 1.93 0 0 0 1.413-.587A1.93 1.93 0 0 0 19 21V3a1.93 1.93 0 0 0-.587-1.413A1.928 1.928 0 0 0 17 1H7c-.55 0-1.02.196-1.412.587A1.927 1.927 0 0 0 5 3v18c0 .55.196 1.021.588 1.413ZM7 21v-1h10v1H7Zm10-3H7V6h10v12Zm0-14H7V3h10v1Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <h5>online</h5>
                    <small>
                      Select this if you need the Tasker physically there
                    </small>
                  </Card>
                </Stack>
              </section>

              {/* task location input */}
              {isLocation == "in-person" && (
                <InputFeild
                  fullWidth={true}
                  label={"Where do you need this done?"}
                  onChange={(e) => setTaskLocation(e.target.value)}
                  value={TaskLocation}
                  className="post_task_form_input"
                  type="text"
                  placeholder="Enter A Address or Location"
                  error={error.TaskLocation && error.TaskLocation}
                />
              )}

              {/* task budgets input */}
              <InputFeild
                fullWidth={true}
                label={
                  "What is your budget? You can always negotiate the final price."
                }
                onChange={(e) => setTaskBudget(e.target.value)}
                value={TaskBudget}
                className="post_task_form_input"
                type="text"
                placeholder="Enter Budgets"
                error={error.TaskBudget && error.TaskBudget}
              />

              {/* task tags for category */}
              <FormControl fullWidth sx={{ pt: 2 }}>
                <Form.Label>Select Category (optional)</Form.Label>
                <Box>
                  <Autocomplete
                    size="small"
                    freeSolo
                    options={service_category}
                    onChange={handleAddTag}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        className="form-control outlined-0"
                        size="small"
                        {...params}
                        type="text"
                        placeholder="Add Service Tags"
                      />
                    )}
                  />
                  <Box mt={2}>
                    {tags.map((tag, index) => (
                      <Chip
                        size="small"
                        key={index}
                        label={tag}
                        onDelete={() => handleDeleteTag(tag)}
                        style={{ margin: "5px" }}
                      />
                    ))}
                  </Box>
                </Box>
              </FormControl>

              {/* task additional details input */}
              <InputFeild
                fullWidth={true}
                label={"What are the details?(optional)"}
                onChange={(e) => setTaskDetails(e.target.value)}
                value={TaskDetails}
                className="post_task_form_input"
                type="text"
                as="textarea"
                rows={4}
                placeholder="Write a summary of the key details"
              />

              {/* task submit button */}
              <FormControl sx={{ paddingTop: 2 }}>
                <Button
                  onClick={hanlde_create}
                  variant=""
                  className="post_task_form_btn"
                >
                  get quotes
                </Button>
              </FormControl>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default PostTaskPage;
