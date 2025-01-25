import React, { lazy } from "react";
import "./home_page.css";
import ServiceSlider from "../../components/service_slider/ServiceSlider";
const Layout = lazy(() => import("../../components/layout/Layout"));
import Testimonial from "../../components/testimonial/Testimonial";
import HomeBanner from "../../components/home_banner/HomeBanner";
import TaskSteps from "../../components/task_steps/TaskSteps";
import { Container } from "react-bootstrap";
const HomePage = () => {
  return (
    <Layout>
      <Container>
        {/* HOME PAGE BANNER SECTION START HERE */}
        <HomeBanner />
        {/* POST YOUR FIRST TASK SECTION START HERE */}
        <ServiceSlider />
        {/* POST YOUR FIRST_TASK_STEPS START HERE */}
        <TaskSteps />
        {/* TESTIMONIAL SECTION START HERE */}
        <Testimonial />
      </Container>
    </Layout>
  );
};

export default HomePage;
