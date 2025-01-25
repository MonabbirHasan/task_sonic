import React from "react";
import "./service_slider.css";
import { category_data } from "../../utils/category_data";
import { useNavigate } from "react-router-dom";
import { Avatar, Stack } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import Button from "../button/Button";

const ServiceSlider = () => {
  const navigtion = useNavigate();
  
  return (
    <section id="service_slider">
      <Row className="align-items-center">
        {/* Left Content */}
        <Col xs={12} md={5} lg={4} className="text-center text-md-start">
          <div className="service_slider_left">
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
          <div className="service_slider_right">
            <div className="service_slider_img_wrapper">
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

export default ServiceSlider;
