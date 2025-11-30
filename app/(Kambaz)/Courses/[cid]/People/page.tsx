"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as client from "../../client";
import PeopleTable from "./Table/page";

export default function PeoplePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const data = await client.findUsersForCourse(cid as string);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div id="wd-people-page">
      <h2>People Enrolled in Course</h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
