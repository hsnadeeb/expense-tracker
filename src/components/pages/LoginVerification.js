import React, { } from "react";
import {  Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginVerification = ({setIsVerified}) => {
    
    const navigate = useNavigate(); // Move useNavigate inside the component function


    const verifyEmail = async () => {
        const oobCode = getOobCodeFromQueryString(); 
        console.log(oobCode);// You need to implement this function to extract the oobCode from the query string.
        
        if (!oobCode) {
            alert('Invalid verification code.');
            return;
        }

        try {
            const verificationResponse = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyByjuoXwSWwV6I1mzgOxz2oisGVGT7Bn5U', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        oobCode: oobCode,
                    }),
                }
            );

            if (verificationResponse.ok) {
                console.log('Email verified successfully.');
                // setIsVerified(true); 
                // navigate('/home');
            } else {
                const verificationErrorData = await verificationResponse.json();
                console.error('Email verification error:', verificationErrorData.error.message);
                alert('Email verification failed. Please try again later.');
            }
        } catch (error) {
            console.error('Email verification error:', error);
            alert('Email verification failed. Please try again later.');
        }
    };

    
    const getOobCodeFromQueryString = () => {
        


    };




    const sendEmailVerification = async () => {
        const idToken= localStorage.getItem('token');
        try {
            const verificationResponse = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyByjuoXwSWwV6I1mzgOxz2oisGVGT7Bn5U', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        requestType: 'VERIFY_EMAIL',
                        idToken: idToken,
                    }),
                }
            );

            if (verificationResponse.ok) {
                console.log('Verification email sent successfully.');
                // verifyEmail();
                setIsVerified(true); 
                navigate('/home');

               
                // You can provide feedback to the user if needed.
            } else {
                const verificationErrorData = await verificationResponse.json();
                console.error('Email verification error:', verificationErrorData.error.message);
                // Handle email verification error and show it to the user
                alert('Email verification failed. Please try again later.');
            }
        } catch (error) {
            console.error('Email verification error:', error);
            // Handle network or other errors related to email verification
            alert('Email verification failed. Please try again later.');
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1>Login Verification</h1>
                    <p>Please click the button to verify your E-mail.</p>
                    <Button onClick={sendEmailVerification}>
                        Send Email Verification Link
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginVerification;
