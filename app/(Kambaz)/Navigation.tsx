"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import "./styles.css";

export default function KambazNavigation() {
  return (
    <Nav
      variant="pills"
      className="flex-column rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2 text-center"
      style={{ width: 120 }}
      id="wd-kambaz-navigation"
    >
      <NavItem className="bg-black border-0 text-center">
        <a
          target="_blank"
          href="https://www.northeastern.edu/"
          id="wd-neu-link"
        >
          <img
            src="/images/NEU.png"
            width="75px"
            alt="Northeastern University"
          />
        </a>
      </NavItem>

      <NavItem>
        <NavLink
          as={Link}
          href="/Account"
          id="wd-account-link"
          className="navItem"
        >
          <FaRegCircleUser className="fs-1 text-white" />
          <br />
          Account
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          as={Link}
          href="/Dashboard"
          id="wd-dashboard-link"
          className="navItem"
        >
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          Dashboard
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          as={Link}
          href="/Dashboard"
          id="wd-course-link"
          className="navItem"
        >
          <LiaBookSolid className="fs-1 text-danger" />
          <br />
          Courses
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          as={Link}
          href="/Calandar"
          id="wd-calandar-link"
          className="navItem"
        >
          <IoCalendarOutline className="fs-1 text-danger" />
          <br />
          Calendar
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink as={Link} href="/Inbox" id="wd-inbox-link" className="navItem">
          <FaInbox className="fs-1 text-danger" />
          <br />
          Inbox
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink as={Link} href="/Labs" id="wd-labs-link" className="navItem">
          <LiaCogSolid className="fs-1 text-danger" />
          <br />
          Labs
        </NavLink>
      </NavItem>
    </Nav>
  );
}
