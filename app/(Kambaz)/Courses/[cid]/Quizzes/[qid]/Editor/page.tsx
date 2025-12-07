"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function QuizEditorPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();

  useEffect(() => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/Editor/Details`);
  }, [cid, qid]);

  return <p>Loading...</p>;
}
