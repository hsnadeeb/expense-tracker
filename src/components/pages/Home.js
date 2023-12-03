import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Table, Dropdown, Modal } from 'react-bootstrap';

const lightTheme = {
  body: '#fff',
  text: '#333',
  background: '#f8f9fa',
};

const darkTheme = {
  body: '#333',
  text: '#fff',
  background: '#424242',
};


const Expenses = () => {
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Select');
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [totalAmount, settotalAmount] = useState(0);
  const [premiumActivated, setPremiumActivated] = useState(false);
  const [theme, setTheme] = useState(lightTheme);
  const [isPremiumActivated, setIsPremiumActivated] = useState(false);
  const [storedTheme, setStoredTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    const newThemeName = newTheme === lightTheme ? 'light' : 'dark';
    localStorage.setItem('theme', newThemeName);
    setTheme(newTheme);
  };
  
  // useEffect(() => {
  //   setTheme(storedTheme);
  //   fetchExpenseData();
  // }, []);  
  useEffect(() => {
    // Set the theme based on the stored theme in localStorage
    const storedThemeValue = localStorage.getItem('theme');
    setStoredTheme(storedThemeValue || 'light');
    setTheme(storedThemeValue === 'light' ? lightTheme : darkTheme);
  }, []);

  useEffect(() => {
    if (totalAmount <= 10000) {
      // Revert to light theme when expenses go below $10,000
      setTheme(lightTheme);
    }
  }, [totalAmount]);

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
        const expenseData = [];
        let total=0;
        for (const key in data) {
            const moneySpent = parseFloat(data[key].moneySpent);
          expenseData.push({ id: key, ...data[key] });
          total=total+ moneySpent;
        }
        console.log(total);
        settotalAmount(total);
        setExpenses(expenseData);

        setPremiumActivated(total > 10000);
        setIsPremiumActivated(total > 10000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
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
        setMoneySpent('');
        setDescription('');
        setCategory('Food');
        fetchExpenseData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const removeExpense = (id) => {
    fetch(`https://authenticate-8c62d-default-rtdb.firebaseio.com/expenses/${id}.json`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Expense deleted successfully");
          fetchExpenseData();
        } else {
          throw new Error("Failed to delete expense");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const openEditModal = (expense) => {
    setSelectedExpense(expense);
    setShowEditModal(true);
  };

  const saveEditedExpense = () => {
    if (selectedExpense) {
      fetch(`https://authenticate-8c62d-default-rtdb.firebaseio.com/expenses/${selectedExpense.id}.json`, {
        method: "PUT",
        body: JSON.stringify(selectedExpense),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Expense edited successfully");
            setShowEditModal(false);
            fetchExpenseData();
          } else {
            throw new Error("Failed to edit expense");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const downloadExpensesCSV = () => {
    const csvContent = `Money Spent,Description,Category\n${expenses.map(expense => `${expense.moneySpent},${expense.description},${expense.category}`).join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
  };

  return (
    
    <Container fluid style={{ background: theme.background, color: theme.text }}>
      <br></br>
      
       {premiumActivated && (
       <Button variant="secondary" onClick={toggleTheme} className="mb-3" disabled={!isPremiumActivated}>
          Toggle Theme
        </Button>)}

        {premiumActivated && (<Button variant="success" onClick={downloadExpensesCSV} className="mb-3 ml-2" disabled={!isPremiumActivated}>
          Download Expenses
        </Button>
       )}
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
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.moneySpent}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => removeExpense(expense.id)}>
                      Delete
                    </Button>
                    <Button variant="info" size="sm" onClick={() => openEditModal(expense)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-right">
      <strong>Total Amount: ${totalAmount.toFixed(2)}</strong>
      {premiumActivated && (
        <Button variant="warning" className="ml-2" onClick={() => setIsPremiumActivated(true)} disabled={!isPremiumActivated}>
          Activate Premium
        </Button>
      )}
      
    </div>
        </Col>
      </Row>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Money Spent</Form.Label>
              <Form.Control
                type="number"
                value={selectedExpense ? selectedExpense.moneySpent : ''}
                onChange={(e) => setSelectedExpense({ ...selectedExpense, moneySpent: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={selectedExpense ? selectedExpense.description : ''}
                onChange={(e) => setSelectedExpense({ ...selectedExpense, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedExpense ? selectedExpense.category : ''}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSelectedExpense({ ...selectedExpense, category: 'Food' })}>Food</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSelectedExpense({ ...selectedExpense, category: 'Petrol' })}>Petrol</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSelectedExpense({ ...selectedExpense, category: 'Salary' })}>Salary</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveEditedExpense}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    // </ThemeProvider>
  );
};

export default Expenses;
