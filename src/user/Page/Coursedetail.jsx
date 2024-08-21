import React from "react";

const CourseDetail = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-9">
      <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <header className="bg-blue-800 text-white p-6">
          <h1 className="text-3xl font-bold">
            The Complete 2024 Web Development Bootcamp
          </h1>
          <p className="mt-2">
            Become a Full-Stack Web Developer with just ONE course. HTML, CSS,
            Javascript, Node, React, PostgreSQL, Web3 and DApps.
          </p>
          <div className="mt-4 flex items-center">
            <span className="ml-3 text-lg">
              4.7 <span className="text-yellow-300">★★★★☆</span>
            </span>
          </div>
          <p className="text-sm mt-2">
            Created by{" "}
            <a href="#" className="text-blue-400">
              Dinesh Paudel
            </a>
          </p>
          <p className="text-sm">
            Last updated 6/2024 • English • English, Arabic [Auto], 14 more
          </p>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Course Details */}
          <section className="lg:w-2/3 p-6">
            <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                Build 16 web development projects for your portfolio, ready to
                apply for junior developer jobs.
              </li>
              <li>
                After the course you will be able to build ANY website you want.
              </li>
              <li>Work as a freelance web developer.</li>
              <li>Master backend development with Node.</li>
              <li>
                Learn the latest technologies, including Javascript, React,
                Node, and even Web3 development.
              </li>
              <li>
                Build fully-fledged websites and web apps for your startup or
                business.
              </li>
              <li>Master frontend development with React.</li>
              <li>Learn professional developer best practices.</li>
            </ul>
          </section>

          {/* Sidebar */}
          <aside className="lg:w-1/3 p-6 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200">
            <div className="text-3xl font-bold mb-4">$9.99</div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded mb-3 transition duration-300">
              Enroll Now
            </button>
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">This course includes:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>61 hours on-demand video</li>
                <li>7 coding exercises</li>
                <li>65 articles</li>
                <li>194 downloadable resources</li>
                <li>Access on mobile and TV</li>
                <li>Full lifetime access</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
