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
    {
      subject: 'Science',
      level: 'Level 1',
      question: 'What do we breathe in to stay alive?',
      options: ['Oxygen', 'Carbon dioxide', 'Nitrogen'],
      correctAnswer: 'Oxygen',
    },
    // Mathematics
    {
      subject: 'Mathematics',
      level: 'Level 1',
      question: 'Jackson has five pieces of candy in his lunch. Fred has two fewer candies than Jackson. How many candies does Fred have?',
      options: ['2', '3', '5', '7'],
      correctAnswer: '3',
    },
    