import React from "react";
import "./post_first_task.css";
import { Col, Row } from "react-bootstrap";
import Button from "../button/Button";
import { Avatar, Stack } from "@mui/material";
import { category_data } from "../../utils/category_data";
import { useNavigate } from "react-router-dom";
const PostFirstTask = () => {
  const navigtion = useNavigate();
  return (
    <section id="home_post_first_task">
      <Row className="align-items-center">
        {/* Left Content */}
        <Col xs={12} md={5} lg={4} className="text-center text-md-start">
          <div className="home_post_first_task_left">
            <h1>Get started with your first task now</h1>
            <p>Get more done in less time with task completion made simple</p>
            <Button
              title="Post your task"
              style={{ padding: "10px 20px", borderRadius: 10 }}
              onClick={() => navigtion("/post_task")}
            />
          </div>
        </Col>

        {/* Right Content */}
        <Col xs={12} md={7} lg={8}>
          <div className="home_post_first_task_right">
            <div className="task_image_slide_wrapper">
              {/* Left slider */}
              <div className="image_slider left">
                {category_data.map((items, index) => (
                  <div key={`left-${index}`} className="image_items">
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Avatar src={items.img} />
                      <div>
                        <h5>{items.title}</h5>
                        <small>{items.description}</small>
                      </div>
                    </Stack>
                  </div>
                ))}
              </div>

              {/* Right slider */}
              <div className="image_slider right">
                {category_data.map((items, index) => (
                  <div key={`right-${index}`} className="image_items">
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Avatar src={items.img} />
                      <div>
                        <h5>{items.title}</h5>
                        <small>{items.description}</small>
                      </div>
                    </Stack>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default PostFirstTask;
