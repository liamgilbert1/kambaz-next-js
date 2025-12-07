"use client";

import { ReactNode } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { useEffect } from "react";
import Link from "next/link";

export default function EditorLayout({ children }: { children: ReactNode }) {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    if (currentUser && !isFaculty) {
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    }
  }, [currentUser, isFaculty, cid, qid]);

  if (!currentUser || !isFaculty) {
    return <p>Loading...</p>;
  }
  const isDetailsActive = pathname.includes("/Details") || pathname.endsWith("/Editor");
  const isQuestionsActive = pathname.includes("/Questions");

  return (
    <div className="p-4">
      <h2>Edit Quiz</h2>
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link
            as={Link}
            href={`/Courses/${cid}/Quizzes/${qid}/Editor/Details`}
            active={isDetailsActive}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            href={`/Courses/${cid}/Quizzes/${qid}/Editor/Questions`}
            active={isQuestionsActive}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {children}
    </div>
  );
}
