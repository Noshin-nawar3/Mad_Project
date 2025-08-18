// import { collection } from "firebase/firestore";
// import { db } from "../../firebaseConfig";
const initializeQuestions = async () => {
  const questions = [
    // Science
    {
      subject: 'Science',
      level: 'Level 1',
      question: 'What do plants need to grow big and strong?',
      options: ['Water, sunlight, and air', 'Soil, rocks, and wind', 'Darkness, cold, and rain'],
      correctAnswer: 'Water, sunlight, and air',
    },
    