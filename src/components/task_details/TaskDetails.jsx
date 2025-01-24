import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { Avatar, Chip, Divider, IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import ApiClient from "../../services/ApiClient";
import "./task_details.css";
import DataLoader from "../loader/DataLoader";
const TaskDetails = ({ taskId, show, handleClose }) => {
  const navigation = useNavigate();
  const [SingleTask, setSingleTask] = useState({});
  const [loader, setLoader] = useState(false);
  //////////////////////////
  // INITIALIZE CLIENT API
  //////////////////////////
  const ClientApi = new ApiClient(import.meta.env.VITE_API_ROOT_URI);
  const accessToken = import.meta.env.VITE_API_ACCESS_KEY;
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
          sx={{ background: "var(--primary-color)" }}
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
            {/* STATUS CHIPS */}
            <Stack direction="row" spacing={2} style={{ marginBottom: "20px" }}>
              <Chip className="task_details_chip" label="Open" style={{}} />
              <Chip className="task_details_chip" label="Assigned" />
              <Chip className="task_details_chip" label="Completed" />
              <Chip className="task_details_chip" label="Canceled" />
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
                {/* {SingleTask?.user_name && SingleTask?.user_name[0]} */}
                <span style={{ color: "#555", fontWeight: "600" }}>
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
                  <p style={{ fontWeight: "600", color: "#555", margin: "0" }}>
                    Location
                  </p>
                  <span
                    style={{
                      color: "var(--primary-color)",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    {SingleTask.task_location}
                  </span>
                </div>
                <div>
                  <p style={{ fontWeight: "600", color: "#555", margin: "0" }}>
                    To be started on
                  </p>
                  <span
                    style={{
                      color: "var(--primary-color)",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    {SingleTask.task_date}
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
            </section>
          </Offcanvas.Body>
        )}
      </Offcanvas>
    </div>
  );
};

export default TaskDetails;
