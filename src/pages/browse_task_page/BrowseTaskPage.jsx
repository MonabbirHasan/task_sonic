import React, { lazy, useEffect, useState } from "react";
import "./browse_task_page.css";
const Layout = lazy(() => import("../../components/layout/Layout"));
import TaskDetails from "../../components/task_details/TaskDetails";
import DataLoader from "../../components/loader/DataLoader";
import TaskCard from "../../components/task_card/TaskCard";
import { Col, Container, Row } from "react-bootstrap";
import ApiClient from "../../services/ApiClient";
const BrowseTaskPage = () => {
  const [AllTask, setAllTask] = useState([]);
  const [TaskDetailsSidebar, setTaskDetailsSidebar] = useState(false);
  const handleShowSidebar = () => setTaskDetailsSidebar(true);
  const handleCloseSidebar = () => setTaskDetailsSidebar(false);
  const [TaskId, setTaskId] = useState("");
  const [loader, setLoader] = useState(false);
  //////////////////////////
  // INITIALIZE CLIENT API
  //////////////////////////
  const ClientApi = new ApiClient(import.meta.env.VITE_API_ROOT_URI);
  const accessToken = import.meta.env.VITE_API_ACCESS_KEY;
  //////////////////////////
  // FETCH ALL TASK
  //////////////////////////
  const fetch_tasks = async () => {
    try {
      setLoader(true);
      const response = await ClientApi.read(`api/tasks`, accessToken);
      if (response.status == 200) {
        console.log(response.data);
        setAllTask(response.data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetch_tasks();
  }, []);
  //////////////////////
  // RENDER ALL JSX
  //////////////////////
  return (
    <Layout>
      <div className="browse_task_page">
        <Container>
          {loader ? (
            <DataLoader height={100} width={100} />
          ) : (
            //   {/* SHOW ALL TASK SECTION START  */}
            <section id="browse_task">
              <Row lg={3}>
                {AllTask.map((items, index) => (
                  <Col key={index}>
                    <TaskCard
                      onClick={() => {
                        setTaskId(items.task_id);
                        handleShowSidebar();
                      }}
                      title={items.task_type}
                      price={`$${items.task_budget}`}
                      location={items.task_location}
                      flexible={items.task_flexible_time}
                      date={items.task_date}
                      requested={30}
                      status={items.task_status}
                      author_img={true}
                      author={
                        "https://photoheads.co.uk/wp-content/uploads/2020/05/headshot-with-client-testimonial.jpg"
                      }
                    />
                  </Col>
                ))}
              </Row>
            </section>
          )}
          {/* TAKS DETAILS SIDEBAR */}
          <TaskDetails
            taskId={TaskId}
            show={TaskDetailsSidebar}
            handleShow={handleShowSidebar}
            handleClose={handleCloseSidebar}
          />
        </Container>
      </div>
    </Layout>
  );
};

export default BrowseTaskPage;
