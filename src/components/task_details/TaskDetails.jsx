import React, { useEffect, useState } from "react";
import { Avatar, Chip, Divider, IconButton, Stack } from "@mui/material";
import ApiClient from "../../services/ApiClient";
import { useNavigate } from "react-router-dom";
import DataLoader from "../loader/DataLoader";
import { Close } from "@mui/icons-material";
import { Offcanvas } from "react-bootstrap";
import "./task_details.css";
const TaskDetails = ({ taskId, show, handleClose }) => {
  const navigation = useNavigate();
  const [SingleTask, setSingleTask] = useState({});
  const [loader, setLoader] = useState(false);
  //////////////////////////
  // INITIALIZE CLIENT API
  //////////////////////////
  const ClientApi = new ApiClient(import.meta.env.VITE_API_ROOT_URI);
  const accessToken = import.meta.env.VITE_API_ACCESS_KEY;
  // FOMRATE TASK TAGS TO SHOW
  const tagsArray = SingleTask?.task_category
    ?.split(",")
    ?.map((tag) => tag?.trim())
    ?.filter((tag) => tag);
  //////////////////////////
  // FETCH SINGLE TASK
  //////////////////////////
  const fetch_tasks = async () => {
    try {
      setLoader(true);
      const response = await ClientApi.read(`api/tasks/${taskId}`, accessToken);
      if (response.status == 200) {
        // console.log(response.data);
        setSingleTask(response.data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetch_tasks();
  }, [taskId]);
  return (
    <div className="task-details">
      <Offcanvas
        style={{
          width: 550,
        }}
        placement="end"
        scroll={true}
        show={show}
        onHide={handleClose}
      >
        {/* Task Details Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          padding={2}
          className="task-details__header"
        >
          <h2 className="task-details__header-title">About</h2>
          <IconButton onClick={handleClose}>
            <Close htmlColor="var(--text-color)" />
          </IconButton>
        </Stack>

        {loader ? (
          <DataLoader height={100} width={100} />
        ) : (
          <Offcanvas.Body className="task-details__body">
            <Divider className="task-details__divider" />

            {/* Task Status Chips */}
            <div className="task-details__status">
              <Chip
                className={`task-details__status-chip ${
                  SingleTask.task_status === "open"
                    ? "task-details__status-chip-open"
                    : ""
                }`}
                label="Open"
              />
              <Chip
                className={`task-details__status-chip ${
                  SingleTask.task_status === "assigned"
                    ? "task-details__status-chip--assigned"
                    : ""
                }`}
                label="Assigned"
              />
              <Chip
                className={`task-details__status-chip ${
                  SingleTask.task_status === "completed"
                    ? "task-details__status-chip--completed"
                    : ""
                }`}
                label="Completed"
              />
              <Chip
                className={`task-details__status-chip ${
                  SingleTask.task_status === "canceled"
                    ? "task-details__status-chip--canceled"
                    : ""
                }`}
                label="Canceled"
              />
            </div>

            {/* Task Details Card */}
            <div className="task-details__card">
              <div className="task-details__card-left">
                <span className="task-details__budget-title">Task Budget</span>
                <h2 className="task-details__price">
                  ${parseFloat(SingleTask.task_budget)}
                </h2>
                <button className="task-details__offer-btn">
                  Make an Offer
                </button>
              </div>
              <div className="task-details__card-right">
                <h5 className="task-details_posted-by">Posted by</h5>
                <Avatar className="task-details__author-avatar">
                  {SingleTask?.user_name && SingleTask?.user_name[0]}
                </Avatar>
                <span className="task-details__author-name">
                  {SingleTask.user_name}
                </span>
              </div>
            </div>

            {/* Task Date and Details */}
            <section className="task-details__info">
              <h3 className="task-details__title">{SingleTask.task_type}</h3>
              <Divider className="task-details__divider" />
              <div className="task-details__date-location">
                <div>
                  <p className="task-details__location-title">Location</p>
                  <span className="task-details__location">
                    {SingleTask.task_location}
                  </span>
                </div>
                <div>
                  <p className="task-details__start-title">To be started on</p>
                  <span className="task-details__start-date">
                    {SingleTask.task_date}
                    <p>{SingleTask.task_flexible_time}</p>
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => navigation("/post_task")}
                    className="task-details__post-task-btn"
                  >
                    Post your task
                  </button>
                </div>
              </div>

              {/* Task Category Tags */}
              <div className="task-details__tags">
                <p className="task-details__tags-title">Work Category</p>
                {tagsArray?.map((tag, index) => (
                  <Chip
                    className="task-details__tag"
                    key={index}
                    label={tag.replaceAll("'", "")}
                    variant="outlined"
                  />
                ))}
              </div>

              {/* Task Details Content */}
              <div className="task-details__content">
                <h4 className="task-details__content-title">Details</h4>
                <Divider />
                <p className="task-details__content-text">
                  {SingleTask.task_details}
                </p>
              </div>

              {/* Task Details Request */}
              <Divider className="task-details__divider" />
            </section>
          </Offcanvas.Body>
        )}
      </Offcanvas>
    </div>
  );
};

export default TaskDetails;
