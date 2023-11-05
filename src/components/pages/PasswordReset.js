import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyByjuoXwSWwV6I1mzgOxz2oisGVGT7Bn5U`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: email,
          }),
        }
      );

      if (response.ok) {
        alert('Password reset email sent. Check your inbox.');
        navigate('/login'); // Redirect to the login page or any other appropriate page
      } else {
        const errorData = await response.json();
        console.error('Password reset email error:', errorData.error.message);
        alert('Password reset email failed. Please try again.');
      }
    } catch (error) {
      console.error('Password reset email error:', error);
      alert('Password reset email failed. Please try again later.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <div>
            <h2>Reset Password</h2>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handlePasswordReset}>
                Reset Password
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordReset;
