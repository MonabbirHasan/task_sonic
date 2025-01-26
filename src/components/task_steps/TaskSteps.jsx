import React from "react";
import "./task_steps.css";
import { Col, Row } from "react-bootstrap";
import {
  CalendarMonthOutlined,
  RequestQuoteOutlined,
  ReviewsOutlined,
} from "@mui/icons-material";
const TaskSteps = () => {
  return (
    <section id="task_steps">
      <h1 className="task_steps_title">how it works</h1>
      <p className="task_steps_subtitle">
        Get the job done effortlessly in three steps.
      </p>
      {/* task card wrapper */}
      <div className="task_steps_card_wrapper">
        <Row className="g-4">
          {/* card items 1 */}
          <Col xs={12} sm={6} md={4}>
            <div className="steps_item">
              <p className="steps_item_icon">
                <RequestQuoteOutlined />
              </p>
              <h3 className="steps_item_title">Post a Request</h3>
              <p className="steps_item_subtitle">
                Some price fringilla ushers youthful dictated solicitation pure
                laughter.
              </p>
            </div>
          </Col>
          {/* card items 2 */}
          <Col xs={12} sm={6} md={4}>
            <div className="steps_item">
              <p className="steps_item_icon">
                <ReviewsOutlined />
              </p>
              <h3 className="steps_item_title">Review Offers</h3>
              <p className="steps_item_subtitle">
                Even the vehicle was effective and easy to drive placed gentle.
              </p>
            </div>
          </Col>
          {/* card items 3 */}
          <Col xs={12} sm={6} md={4}>
            <div className="steps_item">
              <p className="steps_item_icon">
                <CalendarMonthOutlined />
              </p>
              <h3 className="steps_item_title">Get It Done</h3>
              <p className="steps_item_subtitle">
                Focus on fermentum felis cras rhythm in vestibular courses.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default TaskSteps;
