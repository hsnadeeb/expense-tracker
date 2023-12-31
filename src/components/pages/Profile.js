import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function Profile() {
  const [fullName, setFullName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchUserData = async () => {
    const tokenID = localStorage.getItem('token');
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyByjuoXwSWwV6I1mzgOxz2oisGVGT7Bn5U`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: tokenID,
          }),
        }
      );

      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        setFullName(userData.users[0].displayName || ''); // Populate fullName if available, otherwise an empty string
        setImageUrl(userData.users[0].photoUrl || ''); // Populate imageUrl if available, otherwise an empty string
      } else {
        // Handle the error as needed
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network or other errors and show it to the user
      alert('An error occurred while fetching user data.');
    }
  };

  useEffect(() => {
    // Fetch and populate user data when the component mounts
    fetchUserData();
  }, []);



  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !imageUrl) {
      alert('Please fill in all fields.');
      return;
    }
     const tokenID= localStorage.getItem('token');
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyByjuoXwSWwV6I1mzgOxz2oisGVGT7Bn5U', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idToken: tokenID,
            displayName: fullName,
            photoUrl: imageUrl,
            returnSecureToken: true,
        }),
      });

      if (response.ok) {
        alert('Data updated successfully.');
        // Optionally, you can reset the form fields:
        setFullName('');
        setImageUrl('');
      } else {
        alert('Failed to update data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating data.');
    }
  };

  return (
    <Container>
      <h2>Update Data</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="imageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
}

export default Profile;
