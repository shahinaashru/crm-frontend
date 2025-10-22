import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdApps,
  MdOutlineTableChart,
  MdOutlineSecurity,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdHome,
  MdPerson,
  MdGroup,
  MdChecklist,
  MdSettings,
} from "react-icons/md";

import "../css/sidebar1.css";

export default function Sidebar() {
  const [openDashboard, setOpenDashboard] = useState(false);

  return (
    <aside className="sidebar">
      <div className="sidebar-header"></div>

      <ul className="sidebar-menu">
        {/* Dashboard with submenu */}

        {/* Other simple items without submenu */}
        <li className="sidebar-item">
          <Link className="sidebar-link" to="/crm/dashboard">
            <MdDashboard size={24} color="#0a529fff" />
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="sidebar-item">
          <div
            className="sidebar-link"
            onClick={() => setOpenDashboard(!openDashboard)}
          >
            <MdPerson size={24} color="#0a529fff" />
            <span className="user">Users</span>
            {openDashboard ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </div>
          {openDashboard && (
            <ul className="submenu">
              <li>
                <Link to="/crm/user">User List</Link>
              </li>
              <li>
                <Link to="/crm/add-user">Add User</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-item">
          <div
            className="sidebar-link"
            onClick={() => setOpenDashboard(!openDashboard)}
          >
            <MdGroup size={24} color="#0a529fff" />
            <span className="user">Customer</span>
            {openDashboard ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </div>
          {openDashboard && (
            <ul className="submenu">
              <li>
                <Link to="/crm/customer">Customer List</Link>
              </li>
              <li>
                <Link to="/crm/add-customer">Add Customer</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-item">
          <div
            className="sidebar-link"
            onClick={() => setOpenDashboard(!openDashboard)}
          >
            <MdChecklist size={24} color="#0a529fff" />
            <span className="user">Task</span>
            {openDashboard ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </div>
          {openDashboard && (
            <ul className="submenu">
              <li>
                <Link to="/crm/add-case">Create Task</Link>
              </li>
              <li>
                <Link to="/crm/case">List Task</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-item">
          <Link className="sidebar-link" to="/auth">
            <MdSettings size={24} color="#0a529fff" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
