import React from "react";
import Courses from "./Courses";
import Cover from "./Cover";
import Category from "./Category";
import TeacherSection from "./TeacherSection";
import AboutInstructor from "./AboutInstructor";

const Home = () => {
  return (
    <div>
      <Cover />
      <Courses />
      <AboutInstructor />
      <Category />
      <TeacherSection />
    </div>
  );
};

export default Home;
