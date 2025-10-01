import Link from "next/link";
import { FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <FormControl
        id="wd-username"
        defaultValue="alice"
        placeholder="username"
        className="mb-2"
      />
      <FormControl
        id="wd-password"
        defaultValue="123"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <FormControl
        id="wd-firstname"
        defaultValue="Alice"
        placeholder="First Name"
        className="mb-2"
      />
      <FormControl
        id="wd-lastname"
        defaultValue="Wonderland"
        placeholder="Last Name"
        className="mb-2"
      />
      <FormControl
        id="wd-dob"
        defaultValue="2000-01-01"
        type="date"
        className="mb-2"
      />
      <FormControl
        id="wd-email"
        defaultValue="alice@wonderland.com"
        type="email"
        className="mb-2"
      />
      <FormSelect id="wd-role" defaultValue="User" className="mb-3">
        <option value="User">User</option>
        <option value="Admin">Admin</option>
        <option value="Faculty">Faculty</option>
        <option value="Student">Student</option>
      </FormSelect>

      <Link
        href="/Account/Signin"
        className="btn btn-danger w-100"
        id="wd-signout-btn"
      >
        Signout
      </Link>
    </div>
  );
}
