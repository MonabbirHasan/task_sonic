import React, { lazy, useState } from "react";
import "./post_task_page.css";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  TextField,
} from "@mui/material";
const Layout = lazy(() => import("../../components/layout/Layout"));
import InputFeild from "../../components/input_feild/InputFeild";
import { service_category } from "../../utils/service_category";
import { Map, MobileFriendly } from "@mui/icons-material";
import { Container, Form } from "react-bootstrap";
import ApiClient from "../../services/ApiClient";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { debounce } from "lodash";
const PostTaskPage = () => {
  const [TaskType, setTaskType] = useState();
  const [TaskDate, setTaskDate] = useState(null);
  const [TaskFlexible, setTaskFlexible] = useState("");
  const [TaskBudget, setTaskBudget] = useState();
  const [TaskDetails, setTaskDetails] = useState("");
  const [TaskLocation, setTaskLocation] = useState();
  const [isLocation, setIsLocation] = useState("in-person");
  const [calendarMode, setCalendarMode] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({});
  const [tags, setTags] = useState([]);

  ///////////////////////////////
  // INITIALIZE CLIENT API
  //////////////////////////////
  const ClientApi = new ApiClient(import.meta.env.VITE_API_ROOT_URI);
  const accessToken = import.meta.env.VITE_API_ACCESS_KEY;

  //////////////////////////////////////////
  // TASK DATE SELECTION FORMATING
  //////////////////////////////////////////
  const handleDateSelection = (mode) => {
    setCalendarMode(mode);
  };
  const handleDateChange = (date) => {
    const rawDate = date?.toLocaleDateString();
    const NewDate = new Date(rawDate);
    const options = { day: "numeric", month: "short", year: "numeric" };
    let formatedDate = NewDate.toLocaleDateString("en-US", options);
    setTaskDate(formatedDate);
    setCalendarMode(null);
  };

  //////////////////////////////////////////
  // TASK CATEGORY TAGS ADDING INTO ARRAY
  //////////////////////////////////////////
  const handleAddTag = (event, newValue) => {
    if (newValue && !tags.includes(newValue)) {
      setTags([...tags, newValue]);
    }
  };
  //////////////////////////////////////////
  // TASK CATEGORY TAGS REMOVING FROM ARRAY
  //////////////////////////////////////////
  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  //////////////////////////////////////////
  // FORMATE TASK CATEGORY TAGS >tag,tag
  //////////////////////////////////////////
  const formattedTags = tags.join(", ") + (tags.length ? "," : "");

  ///////////////////////////////
  // VALIDATE ALL INIPUT FEILD
  ///////////////////////////////
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
  ///////////////////////////////
  // RESET ALL INPOUT FEILDS
  ///////////////////////////////
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
  const create_task = async () => {
    try {
      if (!validate()) {
        setLoader(true);
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
          setLoader(false);
        }
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  ///////////////////////////////////
  //  CREATE TASK DEBOUNCE HANDLER
  ///////////////////////////////////
  const debouncedClick = debounce(create_task, 1000);

  ///////////////////////////////
  // RENDER ALL JSX HERE
  //////////////////////////////
  return (
    <Layout>
      <div className="post-task__page">
        <Container>
          <div className="post-task__page_wrapper">
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
              <FormControl fullWidth sx={{ pt: 3 }}>
                <Form.Label>When do you need this done?</Form.Label>
                <div className="task_form_date_wrapper">
                  <Box>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        textTransform: "capitalize",
                        borderRadius: 30,

                        color:
                          calendarMode === "beforeDate" || TaskDate
                            ? "var(--text-color)"
                            : "var(--primary-color)",
                        backgroundColor:
                          calendarMode === "beforeDate" ||
                          (TaskDate && "var(--primary-color)"),
                      }}
                      className="task_form_date_btn"
                      onClick={() => handleDateSelection("beforeDate")}
                    >
                      Before Date
                    </Button>
                  </Box>
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
                </div>
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
                <Form.Label>Tell us where</Form.Label>
                <div className="post_task_form_cardbox_wrapper">
                  {/* LOCATION IN-PERSON SLOT */}

                  <Card
                    onClick={() => setIsLocation("in-person")}
                    className="post_task_form_cardbox"
                    style={{
                      background:
                        isLocation == "in-person"
                          ? "var(--background-color)"
                          : "var(--text-secondary-color)",
                    }}
                  >
                    <Map fontSize="medium" color="var(primary-color)" />
                    <h5 className="post_task_form_cardbox_title">in-person</h5>
                    <p className="post_task_form_cardbox_subtitle">
                      Select this if you need the Tasker physically there
                    </p>
                  </Card>
                  {/* LOCATION ONLINE SLOT */}
                  <Card
                    onClick={() => setIsLocation("online")}
                    className="post_task_form_cardbox"
                    style={{
                      background:
                        isLocation == "online"
                          ? "var(--background-color)"
                          : "var(--text-secondary-color)",
                    }}
                  >
                    <MobileFriendly
                      htmlColor="var(--primary-color)"
                      fontSize="medium"
                    />
                    <h5 className="post_task_form_cardbox_title">online</h5>
                    <p className="post_task_form_cardbox_subtitle">
                      Select this if you need the Tasker physically there
                    </p>
                  </Card>
                </div>
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
                        variant="filled"
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
                  disabled={loader}
                  onClick={debouncedClick}
                  variant=""
                  className="post_task_form_btn"
                >
                  {loader ? "Submiting..." : "submit task"}
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
