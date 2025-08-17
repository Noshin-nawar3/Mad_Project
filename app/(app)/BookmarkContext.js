import React, { createContext, useState, useContext } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const addBookmark = (course) => {
    setBookmarks((prev) =>
      prev.find((item) => item.title === course.title) ? prev : [...prev, course]
    );
  };

  const removeBookmark = (title) => {
    setBookmarks((prev) => prev.filter((item) => item.title !== title));
  };

  const toggleBookmark = (course) => {
    setBookmarks((prev) =>
      prev.find((item) => item.title === course.title)
        ? prev.filter((item) => item.title !== course.title)
        : [...prev, course]
    );
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
