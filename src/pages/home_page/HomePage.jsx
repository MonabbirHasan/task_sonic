import React, { lazy } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
const Layout = lazy(() => import("../../components/layout/Layout"));
import "./home_page.css";
import HomeBanner from "../../components/home_banner/HomeBanner";
import TaskSteps from "../../components/task_steps/TaskSteps";
import Testimonial from "../../components/testimonial/Testimonial";
import PostFirstTask from "../../components/post_first_task/PostFirstTask";
const HomePage = () => {
  return (
    <Layout>
      <Container>
        {/* HOME PAGE BANNER SECTION START HERE */}
        <HomeBanner />
        {/* POST YOUR FIRST TASK SECTION START HERE */}
        <PostFirstTask />
        {/* POST YOUR FIRST_TASK_STEPS START HERE */}
        <TaskSteps />
        {/* TESTIMONIAL SECTION START HERE */}
        <Testimonial />
      </Container>
    </Layout>
  );
};

export default HomePage;
