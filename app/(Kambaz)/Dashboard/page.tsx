import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="React Logo"
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/5678" className="wd-dashboard-course-link">
            <Image
              src="/images/math.jpg"
              width={200}
              height={150}
              alt="Math Logo"
            />
            <div>
              <h5> MATH5678 Math </h5>
              <p className="wd-dashboard-course-title">
              Mathematician
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/2222" className="wd-dashboard-course-link">
            <Image
              src="/images/science.jpg"
              width={200}
              height={150}
              alt="Science Logo"
            />
            <div>
              <h5> SCI2222 Science </h5>
              <p className="wd-dashboard-course-title">
                Scientist
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/3333" className="wd-dashboard-course-link">
            <Image
              src="/images/history.jpg"
              width={200}
              height={150}
              alt="History Logo"
            />
            <div>
              <h5> HIST3333 History </h5>
              <p className="wd-dashboard-course-title">
                Historian
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/4444" className="wd-dashboard-course-link">
            <Image
              src="/images/english.jpg"
              width={200}
              height={150}
              alt="English Logo"
            />
            <div>
              <h5> ENG4444 English </h5>
              <p className="wd-dashboard-course-title">
                English Job
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/5555" className="wd-dashboard-course-link">
            <Image
              src="/images/calculus.jpg"
              width={200}
              height={150}
              alt="Calculus Logo"
            />
            <div>
              <h5> MATH5555 Calculus </h5>
              <p className="wd-dashboard-course-title">
                Calculus Job
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/6666" className="wd-dashboard-course-link">
            <Image
              src="/images/physics.jpg"
              width={200}
              height={150}
              alt="Physics Logo"
            />
            <div>
              <h5> PHY6666 Physics </h5>
              <p className="wd-dashboard-course-title">
                Physics Job
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
