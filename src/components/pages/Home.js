import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Table, Dropdown } from 'react-bootstrap';

const Expenses = () => {
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Select');
  const [expenses, setExpenses] = useState([]);

  const fetchExpenseData = () => {
    fetch("https://authenticate-8c62d-default-rtdb.firebaseio.com/expenses.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then((data) => {
        // Handle the data you received from the database and update expenses state
        const expenseData = [];
        for (const key in data) {
          expenseData.push(data[key]);
        }
        setExpenses(expenseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // Fetch and populate user data when the component mounts
    fetchExpenseData();
  }, []);

  const addExpense = () => {
    const newExpense = {
      moneySpent,
      description,
      category,
    };

    fetch("https://authenticate-8c62d-default-rtdb.firebaseio.com/expenses.json", {
      method: "POST",
      body: JSON.stringify(newExpense),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Failed to submit data");
        }
      })
      .then((data) => {
        console.log("Data submitted successfully:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setExpenses([...expenses, newExpense]);
    setMoneySpent('');
    setDescription('');
    setCategory('Food');
  };

  const removeExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  return (
    <Container>
      <br></br>
      <Row className="justify-content-center">
        <Col md="6">
          <h2>Add an Expense</h2>
          <Form>
            <Form.Group>
              <Form.Label>Money Spent</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the amount"
                value={moneySpent}
                onChange={(e) => setMoneySpent(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {category}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setCategory('Food')}>Food</Dropdown.Item>
                  <Dropdown.Item onClick={() => setCategory('Petrol')}>Petrol</Dropdown.Item>
                  <Dropdown.Item onClick={() => setCategory('Salary')}>Salary</Dropdown.Item>
                  {/* Add more categories as needed */}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <br></br>

            <Button variant="primary" onClick={addExpense}>
              Add Expense
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col md="6">
          <h2 className="text-center mb-4">Expenses</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Money Spent</th>
                <th>Description</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.moneySpent}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => removeExpense(index)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Expenses;
