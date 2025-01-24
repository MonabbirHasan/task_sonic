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
    <div className="task_details">
      <Offcanvas
        style={{
          width: 550,
          backgroundColor: "#f8f9fa",
          boxShadow: "var(--box-shadow-medium)",
        }}
        placement="end"
        scroll={true}
        show={show}
        onHide={handleClose}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          padding={2}
          sx={{ background: "var(--primary-color-light)" }}
        >
          <h2 className="task_details_head_title">About</h2>
          <IconButton onClick={handleClose}>
            <Close htmlColor="var(--text-color)" />
          </IconButton>
        </Stack>
        {loader ? (
          <DataLoader height={100} width={100} />
        ) : (
          <Offcanvas.Body style={{ padding: "20px 30px" }}>
            <Divider style={{ marginBottom: "20px" }} />
            {/* TASK STATUS CHIPS */}
            <Stack direction="row" spacing={2} style={{ marginBottom: "20px" }}>
              <Chip
                className={
                  SingleTask.task_status == "open"
                    ? "task_details_chip_open"
                    : ""
                }
                label="Open"
              />
              <Chip
                className={
                  SingleTask.task_status == "assigned"
                    ? "task_details_chip_assign"
                    : ""
                }
                label="Assigned"
              />
              <Chip
                className={
                  SingleTask.task_status == "completed"
                    ? "task_details_chip_complete"
                    : ""
                }
                label="Completed"
              />
              <Chip
                className={
                  SingleTask.task_status == "canceled"
                    ? "task_details_chip_canceled"
                    : ""
                }
                label="Canceled"
              />
            </Stack>
            {/* TASK DETAILS */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className="task_details_head_card"
              style={{
                marginBottom: "30px",
                padding: "20px",
                backgroundColor: "var(--background-color)",
                borderRadius: "10px",
                boxShadow: "var(--box-shadow-light)",
              }}
            >
              <div>
                <span className="task_details_budget_title">Task Budget</span>
                <h2 className="task_details_price">
                  ${parseFloat(SingleTask.task_budget)}
                </h2>
                <button className="task_details_order_btn">
                  Make an Offer
                </button>
              </div>
              <div style={{ textAlign: "center" }}>
                <h5 style={{ color: "#888", fontSize: "0.9rem" }}>Posted by</h5>
                <Avatar id="task_details_author_img">
                  {SingleTask?.user_name && SingleTask?.user_name[0]}{" "}
                </Avatar>
                <span className="task_details_author_name">
                  {SingleTask.user_name}
                </span>
              </div>
            </Stack>
            {/* DATE AND DETAILS */}
            <section className="task_details_title_content">
              <h3 className="task_details_title">{SingleTask.task_type}</h3>
              <Divider sx={{ mb: 1 }} />
              <Stack direction="row" justifyContent="space-between" pb={3}>
                <div>
                  <p className="task_details_location_title">Location</p>
                  <span className="task_details_location">
                    {SingleTask.task_location}
                  </span>
                </div>
                <div>
                  <p className="task_details_location_title">
                    To be started on
                  </p>
                  <span className="task_details_location">
                    {SingleTask.task_date}
                    <p>{SingleTask.task_flexible_time}</p>
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => navigation("/post_task")}
                    className="task_details_post_task_btn"
                  >
                    post your task
                  </button>
                </div>
              </Stack>
              {/* TASK CATEGORY */}
              <div className="task_details_category">
                <p className="task_details_category_title">work category</p>
                {tagsArray?.map((tag, index) => (
                  <Chip
                    className="task_details_category_tags"
                    key={index}
                    label={tag.replaceAll("'", "")}
                    variant="outlined"
                  />
                ))}
              </div>
              {/* DETAILS CONTENT */}
              <div className="task_details_content_txt">
                <h4
                  style={{
                    fontWeight: "bold",
                    color: "var(--primary-color)",
                    marginBottom: "10px",
                  }}
                >
                  Details
                </h4>
                <Divider />
                <p style={{ color: "var(--primary-color)", lineHeight: "1.6" }}>
                  {SingleTask.task_details}
                </p>
              </div>
            </section>
          </Offcanvas.Body>
        )}
      </Offcanvas>
    </div>
  );
};

export default TaskDetails;
