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
    {
      subject: 'Mathematics',
      level: 'Level 1',
      question: 'Bryan had four library books in his desk. Today, he brought two more books from home. How many books does Bryan have in his desk now?',
      options: ['2', '4', '6', '8'],
      correctAnswer: '6',
    },
    // Social Studies
    {
      subject: 'Social Studies',
      level: 'Level 1',
      question: 'How many states are in the United States of America?',
      options: ['40', '20', '13', '50'],
      correctAnswer: '50',
    },
    {
      subject: 'Social Studies',
      level: 'Level 1',
      question: 'Who invented the telephone?',
      options: ['Benjamin Franklin', 'Alexander Graham Bell', 'Thomas Alva Edison'],
      correctAnswer: 'Alexander Graham Bell',
    },
    // Language
    {
      subject: 'Language',
      level: 'Level 1',
      question: 'I ___ good at climbing trees.',
      options: ['am', 'is'],
      correctAnswer: 'am',
    },
    {
      subject: 'Language',
      level: 'Level 1',
      question: 'I have a sister. ___ is 10 years old.',
      options: ['She', 'He'],
      correctAnswer: 'She',
    },
    // Art & Music
    {
      subject: 'Art & Music',
      level: 'Level 1',
      question: 'How many beats are in a whole note?',
      options: ['20 beats', '4 beats', '2 beats', '1 beat'],
      correctAnswer: '4 beats',
    },
    {
      subject: 'Art & Music',
      level: 'Level 1',
      question: 'A drawing of flowers in a vase is a .',
      options: ['portrait', 'still life', 'abstract art'],
      correctAnswer: 'still life',
    },
  ];

  try {
    for (const question of questions) {
      await addDoc(collection(db, 'questions'), question);
      console.log(`Added question: ${question.question}`);
    }
    console.log('All questions added successfully');
  } catch (error) {
    console.error('Error adding questions:', error);
  }
};

initializeQuestions();