import { render, screen, act } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/Layout";
import React from "react";

describe("Dashboard.jsx", () => {
  it("renders dashboard title", async () => {
    await act(async () => {
      render(
        <Layout activePage="dashboard" setActivePage={() => {}}>
          <Dashboard data={[]} />
        </Layout>
      );
    });

    expect(
      screen.getAllByText(/Dashboard Overview/i).length
    ).toBeGreaterThan(0);
  });
});
