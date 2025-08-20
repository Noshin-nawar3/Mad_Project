// import React, { createContext, useState, useContext } from "react";

// const BookmarkContext = createContext();

// export const BookmarkProvider = ({ children }) => {
//   const [bookmarks, setBookmarks] = useState([]);

//   const addBookmark = (course) => {
//     setBookmarks((prev) =>
//       prev.find((item) => item.title === course.title) ? prev : [...prev, course]
//     );
//   };

//   const removeBookmark = (title) => {
//     setBookmarks((prev) => prev.filter((item) => item.title !== title));
//   };

//   const toggleBookmark = (course) => {
//     setBookmarks((prev) =>
//       prev.find((item) => item.title === course.title)
//         ? prev.filter((item) => item.title !== course.title)
//         : [...prev, course]
//     );
//   };

//   return (
//     <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, toggleBookmark }}>
//       {children}
//     </BookmarkContext.Provider>
//   );
// };

// export const useBookmarks = () => useContext(BookmarkContext);


// app/(app)/BookmarkContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import {db, auth} from "../../firebaseConfig"; //firebaseConfig.js
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const user = auth.currentUser; // logged-in user

  // 🔹 Load bookmarks when user logs in
  useEffect(() => {
    if (!user) return;

    const fetchBookmarks = async () => {
      const ref = doc(db, "bookmarks", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setBookmarks(snap.data().courses || []);
      }
    };

    fetchBookmarks();
  }, [user]);

  // 🔹 Add course to Firebase + local state
  const addBookmark = async (course) => {
    if (!user) return alert("Please log in first!");

    const ref = doc(db, "bookmarks", user.uid);
    await setDoc(
      ref,
      { courses: arrayUnion(course) },
      { merge: true }
    );

    setBookmarks((prev) => [...prev, course]);
  };

  // 🔹 Remove course from Firebase + local state
  const removeBookmark = async (id) => {
    if (!user) return alert("Please log in first!");

    const courseToRemove = bookmarks.find((c) => c.id === id);
    if (!courseToRemove) return;

    const ref = doc(db, "bookmarks", user.uid);
    await updateDoc(ref, {
      courses: arrayRemove(courseToRemove),
    });

    setBookmarks((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
