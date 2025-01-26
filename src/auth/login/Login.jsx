import React, { useContext, useEffect } from "react";
import "./login.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Container, Row, Col, Card } from "react-bootstrap";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigation = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);

  /////////////////////////////////
  // HANDLE AUTHENTICATION
  /////////////////////////////////
  useEffect(() => {
    if (isAuthenticated) {
      return navigation("/");
    }
  }, [isAuthenticated]);

  /////////////////////////////////
  // HANLDE USER LOGIN
  /////////////////////////////////
  const handleLogin = async (response) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_ROOT_URI}/api/users/login`,
        {
          token: response.credential,
        },
        { headers: { Authorization: import.meta.env.VITE_API_ACCESS_KEY } }
      );
      // console.log("Login Success:", data);
      const result = login(data.user);
      if (result.success) {
        navigation("/");
        console.log("User logged in:", result.user);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  /////////////////////////////////
  // HANLDE USER LOGIN FAILED
  /////////////////////////////////
  const handleLoginFailure = () => {
    location.reload();
  };

  /////////////////////////////////
  // RENDER PAGE ELEMENTS
  /////////////////////////////////
  return (
    <div className="login-page d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow">
              <Card.Body>
                <h3 className="text-center mb-4">Login</h3>
                <GoogleOAuthProvider
                  clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                >
                  <div className="text-center">
                    <h5 className="mb-3">Sign in with Google</h5>
                    <GoogleLogin
                      onSuccess={handleLogin}
                      onError={handleLoginFailure}
                      theme="outline"
                      size="large"
                      text="signin_with"
                    />
                  </div>
                </GoogleOAuthProvider>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
