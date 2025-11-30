"use client";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <ListGroup
      id="wd-courses-navigation"
      className="rounded-0 wd list-group fs-5"
    >
      {links.map((label) => {
        const isExternal = label === "Piazza" || label === "Zoom";

        const href = isExternal
          ? label === "Piazza"
            ? "https://piazza.com/class/mf1li76n4is6m/"
            : "https://www.zoom.com/"
          : label === "People"
          ? `/Courses/${cid}/${label}`
          : `/Courses/${cid}/${label}`;

        const active = pathname.includes(label) || pathname.endsWith(label);

        return (
          <ListGroupItem
            key={label}
            as={Link}
            href={href}
            target={isExternal ? "_blank" : ""}
            id={`wd-course-${label.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              active
                ? "border-start border-4 border-black text-black"
                : "text-danger"
            }`}
          >
            {label}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
