import React, { useContext, useEffect, useState } from "react";
import { Avatar, Chip, Divider, IconButton, Stack } from "@mui/material";
import ApiClient from "../../services/ApiClient";
import { useNavigate } from "react-router-dom";
import DataLoader from "../loader/DataLoader";
import { Close } from "@mui/icons-material";
import { Offcanvas } from "react-bootstrap";
import "./task_details.css";
import { AuthContext } from "../../context/AuthProvider";
const TaskDetails = ({ taskId, show, handleClose }) => {
  const { authUser } = useContext(AuthContext);
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
          className="task-details_header"
        >
          <h2 className="task-details_header-title">About</h2>
          <IconButton onClick={handleClose}>
            <Close htmlColor="var(--text-color)" />
          </IconButton>
        </Stack>

        {loader ? (
          <DataLoader height={100} width={100} />
        ) : (
          <Offcanvas.Body className="task-details_body">
            <Divider className="task-details_divider" />

            {/* Task Status Chips */}
            <div className="task-details_status">
              <Chip
                size="small"
                className={`task-details_status-chip ${
                  SingleTask.task_status === "open"
                    ? "task-details_status-chip-open"
                    : ""
                }`}
                label="Open"
              />
              <Chip
                size="small"
                className={`task-details_status-chip ${
                  SingleTask.task_status === "assigned"
                    ? "task-details_status-chip-assigned"
                    : ""
                }`}
                label="Assigned"
              />
              <Chip
                size="small"
                className={`task-details_status-chip ${
                  SingleTask.task_status === "completed"
                    ? "task-details_status-chip-completed"
                    : ""
                }`}
                label="Completed"
              />
              <Chip
                size="small"
                className={`task-details_status-chip ${
                  SingleTask.task_status === "cancelled"
                    ? "task-details_status-chip-canceled"
                    : ""
                }`}
                label="Cancelled"
              />
            </div>

            {/* Task Details Card */}
            <div className="task-details_card">
              {/* task details card left */}
              <div className="task-details_card-left">
                <span className="task-details_budget-title">Task Budget</span>
                <h2 className="task-details_price">
                  ${parseFloat(SingleTask.task_budget)}
                </h2>
                <button className="task-details_offer-btn">
                  Make an Offer
                </button>
              </div>
              {/* task details card right */}
              <div className="task-details_card-right">
                <h5 className="task-details_posted-by">Posted by</h5>
                {SingleTask?.user_id == authUser?.id ? (
                  <Avatar
                    style={{ width: "100%", height: "auto" }}
                    src={
                      SingleTask?.user_id == authUser?.id
                        ? authUser?.picture
                        : ""
                    }
                  />
                ) : (
                  <Avatar className="task-details_author-avatar">
                    {SingleTask?.user_name && SingleTask?.user_name[0]}
                  </Avatar>
                )}
                {/* <Avatar className="task-details_author-avatar">
                  {SingleTask?.user_id == authUser?.id ? authUser?.picture : ""}
                  {SingleTask?.user_name && SingleTask?.user_name[0]}
                </Avatar> */}
                <span className="task-details_author-name">
                  {SingleTask.user_name}
                </span>
              </div>
            </div>

            {/* Task Date and Details */}
            <section className="task-details_info">
              <h3 className="task-details_title">{SingleTask.task_type}</h3>
              <Divider className="task-details_divider" />
              <div className="task-details_date-location">
                <div>
                  <p className="task-details_location-title">Location</p>
                  <span className="task-details_location">
                    {SingleTask.task_location}
                  </span>
                </div>
                <div>
                  <p className="task-details_start-title">To be started on</p>
                  <span className="task-details_start-date">
                    {SingleTask.task_date}
                    <p>{SingleTask.task_flexible_time}</p>
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => navigation("/post_task")}
                    className="task-details_post-task-btn"
                  >
                    Post your task
                  </button>
                </div>
              </div>

              {/* Task Category Tags */}
              <div className="task-details_tags">
                <p className="task-details_tags-title">Work Category</p>
                {tagsArray?.map((tag, index) => (
                  <Chip
                    className="task-details_tag"
                    key={index}
                    label={tag.replaceAll("'", "")}
                    variant="outlined"
                  />
                ))}
              </div>

              {/* Task Details Content */}
              <div className="task-details_content">
                <h4 className="task-details_content-title">Details</h4>
                <Divider />
                <p className="task-details_content-text">
                  {SingleTask.task_details}
                </p>
              </div>

              {/* Task Details Request */}
              <Divider className="task-details_divider" />
            </section>
          </Offcanvas.Body>
        )}
      </Offcanvas>
    </div>
  );
};

export default TaskDetails;
