import React, { lazy, useState } from "react";
import "./post_task_page.css";
import { Container, Form } from "react-bootstrap";
import { Button, Card, FormControl, Stack } from "@mui/material";
import TaskDateForm from "../../components/TaskDateForm";
import InputFeild from "../../components/input_feild/InputFeild";
const Layout = lazy(() => import("../../components/layout/Layout"));
const PostTaskPage = () => {
  const [TaskType, setTaskType] = useState();
  const [TaskDate, setTaskDate] = useState(null);
  const [isFlexible, setIsFlexible] = useState(false);
  const [TaskBudget, setTaskBudget] = useState();
  const [TaskDetails, setTaskDetails] = useState("");
  const [TaskLocation, setTaskLocation] = useState();
  const [isLocation, setIsLocation] = useState("in-person");
  const [error, setError] = useState({});
  // Function to handle date selection
  const handleGetDate = (date) => {
    console.log("Selected Date:", date);
    setTaskDate(date); // Store the date in the parent component
    setIsFlexible(false);
  };

  // Function to handle the "Flexible" option
  const handleIsFlexible = (value) => {
    console.log("Is Flexible:", value);
    setTaskDate(null);
    setIsFlexible(value); // Store the flexible state in the parent component
  };
  ///////////////////////////////
  // VALIDATE ALL INIPUT FEILD
  //////////////////////////////
  const validate = () => {
    const errors = {};

    // Check TaskType
    if (!TaskType) {
      errors.TaskType = "This field is required";
    }

    // Check TaskDate or isFlexible
    if (!isFlexible && !TaskDate) {
      errors.TaskDate = "This field is required";
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
  // HANDLE CREATE TASK
  //////////////////////////////
  const hanlde_create = async () => {
    // call validation function
    if (!validate()) {
      const data = {
        user_id: "eec05585-bb31-48c7-8464-95cdc1e7b8d4",
        task_type: "i need urgent plumber for my house work",
        task_details: "Fix the broken pipe in the kitchen.",
        task_budget: "1000.00",
        task_category: "maintenance",
        task_date: "flexible",
        task_status: "in_progress",
        task_location: "123 Main St, Springfield",
        posted_at: "2025-01-24T01:35:06.000Z",
        updated_at: "2025-01-24T01:52:54.000Z",
      };
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
              <TaskDateForm
                GetDate={handleGetDate}
                isFlexible={handleIsFlexible}
              />
              {isFlexible ? "Yes" : "NO"}
              {TaskDate}
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
                          ? "var(--gray-dark)"
                          : "var(--background-color)",
                    }}
                  >
                    <svg height="32" width="32" viewBox="0 0 24 24">
                      <path
                        fill-rule="evenodd"
                        d="M13.413 11.412A1.927 1.927 0 0 1 12 12c-.55 0-1.02-.196-1.412-.588A1.923 1.923 0 0 1 10 10c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 12 8c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413s-.196 1.02-.587 1.412Zm3.112 2.85c-.983 1.525-2.492 3.221-4.525 5.088-2.033-1.867-3.542-3.563-4.525-5.088C6.492 12.737 6 11.383 6 10.2c0-1.817.579-3.304 1.737-4.463C8.896 4.579 10.317 4 12 4c1.683 0 3.104.579 4.262 1.737C17.421 6.896 18 8.383 18 10.2c0 1.183-.492 2.537-1.475 4.062ZM5.988 15.637C7.313 17.596 9.317 19.717 12 22c2.683-2.283 4.688-4.404 6.013-6.363C19.338 13.679 20 11.867 20 10.2c0-2.5-.804-4.492-2.413-5.975C15.979 2.742 14.117 2 12 2c-2.117 0-3.979.742-5.587 2.225C4.804 5.708 4 7.7 4 10.2c0 1.667.663 3.479 1.988 5.437Z"
                        clip-rule="evenodd"
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
                          ? "var(--gray-dark)"
                          : "var(--background-color)",
                    }}
                  >
                    <svg height="32" width="32" viewBox="0 0 24 24">
                      <path
                        fill-rule="evenodd"
                        d="M5.588 22.413C5.979 22.804 6.45 23 7 23h10a1.93 1.93 0 0 0 1.413-.587A1.93 1.93 0 0 0 19 21V3a1.93 1.93 0 0 0-.587-1.413A1.928 1.928 0 0 0 17 1H7c-.55 0-1.02.196-1.412.587A1.927 1.927 0 0 0 5 3v18c0 .55.196 1.021.588 1.413ZM7 21v-1h10v1H7Zm10-3H7V6h10v12Zm0-14H7V3h10v1Z"
                        clip-rule="evenodd"
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
              {isLocation == "in-person" ? (
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
              ) : (
                ""
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
