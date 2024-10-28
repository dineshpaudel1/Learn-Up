import React from "react";
import Courses from "./Courses";
import Cover from "./Cover";
import Category from "./Category";
import TeacherSection from "./TeacherSection";

const Home = () => {
  return (
    <div>
      <Cover />
      <Courses />
      <Category />
      <TeacherSection />
    </div>
  );
};

export default Home;
