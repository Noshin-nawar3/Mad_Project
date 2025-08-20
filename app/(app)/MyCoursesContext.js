import React, { createContext, useContext, useState } from "react";

const MyCoursesContext = createContext();

export const MyCoursesProvider = ({ children }) => {
  const [myCourses, setMyCourses] = useState([]);

  const enrollCourse = (course) => {
    setMyCourses((prev) => {
      if (prev.find((c) => c.title === course.title)) return prev; // avoid duplicates
      return [...prev, course];
    });
  };

  return (
    <MyCoursesContext.Provider value={{ myCourses, enrollCourse }}>
      {children}
    </MyCoursesContext.Provider>
  );
};

export const useMyCourses = () => useContext(MyCoursesContext);
