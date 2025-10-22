import React from "react";
import { Link, Outlet } from "react-router-dom";
import SideBar from "/src/components/SideBar";
import Header from "/src/components/Header";
import { Container } from "react-bootstrap";
export default function AdminLayout() {
  return (
    <>
      <Header />
      <Container
        fluid
        style={{
          display: "flex",
          gap: "0px",
          margin: "0px",
          padding: "0px",
          backgroundColor: "#eee",
        }}
      >
        <SideBar />
        <main style={{ flex: "1" }}>
          <Outlet />
        </main>
      </Container>
    </>
  );
}
