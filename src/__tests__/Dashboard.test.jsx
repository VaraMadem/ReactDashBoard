import { render, screen } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";

test("renders dashboard title", () => {
  render(<Dashboard />);
  expect(screen.getByText(/Dashboard Overview/i)).toBeInTheDocument();
});
