import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers

import Home from './Home'; // Assuming the component is in the same directory

describe('Expenses Component', () => {
  test('renders Expenses component', () => {
    render(<Expenses />);
    expect(screen.getByText('Add an Expense')).toBeInTheDocument();
  });

  test('adds an expense successfully', async () => {
    render(<Expenses />);
    fireEvent.change(screen.getByPlaceholderText('Enter the amount'), { target: { value: '50' } });
    fireEvent.change(screen.getByPlaceholderText('Enter a description'), { target: { value: 'Test expense' } });
    fireEvent.click(screen.getByText('Add Expense'));

    await waitFor(() => {
      expect(screen.getByText('Test expense')).toBeInTheDocument();
    });
  });

  test('deletes an expense successfully', async () => {
    // Render the component and add an expense
    render(<Expenses />);
    fireEvent.change(screen.getByPlaceholderText('Enter the amount'), { target: { value: '50' } });
    fireEvent.change(screen.getByPlaceholderText('Enter a description'), { target: { value: 'Test expense' } });
    fireEvent.click(screen.getByText('Add Expense'));

    // Delete the added expense
    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(screen.queryByText('Test expense')).toBeNull();
    });
  });

  // Add more test cases based on the functionality of your component
  // ...

  // Example:
  // test('edits an expense successfully', async () => {
  //   // Render the component and add an expense
  //   render(<Expenses />);
  //   fireEvent.change(screen.getByPlaceholderText('Enter the amount'), { target: { value: '50' } });
  //   fireEvent.change(screen.getByPlaceholderText('Enter a description'), { target: { value: 'Test expense' } });
  //   fireEvent.click(screen.getByText('Add Expense'));

  //   // Open the edit modal, make changes, and save
  //   fireEvent.click(screen.getByText('Edit'));
  //   fireEvent.change(screen.getByLabelText('Money Spent'), { target: { value: '75' } });
  //   fireEvent.click(screen.getByText('Save Changes'));

  //   await waitFor(() => {
  //     expect(screen.getByText('75')).toBeInTheDocument();
  //   });
  // });
});
