import React from "react";
import "./home_banner.css";
import { Col, Row } from "react-bootstrap";
import Button from "../button/Button";
import { ArrowRightAlt } from "@mui/icons-material";
import BannerImg from "../../assets/home_banner.png";
import { useNavigate } from "react-router-dom";
const HomeBanner = () => {
  const navigtion = useNavigate();
  return (
    <section id="home_banner">
      <Row className="align-items-center">
        {/* BANNER LEFT COLUMN*/}
        <Col xs={12} sm={12} md={6} lg={6}>
          <div className="home_banner_left">
            <h3 className="home_banner_left_title">
              post your task in just a few clicks
            </h3>
            <p className="home_banner_left_subtitle">
              Connect with thousands of skilled professionals nearby for
              everything from repairs to beauty.
            </p>
            <div className="home_banner_left_action">
              <Button
                onClick={() => navigtion("/post_task")}
                style={{ padding: "10px 20px", borderRadius: 30 }}
                title={
                  <>
                    Post your task for free <ArrowRightAlt />
                  </>
                }
              />
            </div>
          </div>
        </Col>
        <Col lg={2}></Col>
        {/* BANNER LEFT COLUMN*/}
        <Col xs={12} sm={12} md={6} lg={4} className="d-none d-md-block">
          <div className="home_banner_right">
            <img className="home_banner_img" src={BannerImg} alt="Banner" />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default HomeBanner;
