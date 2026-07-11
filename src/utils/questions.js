export const mockQuestions = [
  {
    id: 1,
    questionText: "What is the computational complexity output here?",
    imageUrl: "/questions/sample-diagram.png", // Leave as null if no image is needed
    options: ["O(1)", "O(n)", "O(log n)"],
    correctAnswer: 1
  },
  { id: 2, section: "Technical", text: "What is the time complexity of searching in a perfectly balanced Binary Search Tree?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], correctAnswer: 2 },
  { id: 3, section: "Technical", text: "In React, what hook would you use to perform side effects in a functional component?", options: ["useState", "useMemo", "useContext", "useEffect"], correctAnswer: 3 },
  { id: 4, section: "Technical", text: "Which HTTP status code represents 'Unauthorized access'?", options: ["400 Bad Request", "401 Unauthorized", "403 Forbidden", "404 Not Found"], correctAnswer: 1 },
  { id: 5, section: "Technical", text: "Which property is used in CSS Flexbox to align items along the main axis?", options: ["align-items", "justify-content", "align-content", "text-align"], correctAnswer: 1 },
  { id: 6, section: "Aptitude", text: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?", options: ["120 meters", "180 meters", "324 meters", "150 meters"], correctAnswer: 3 },
  { id: 7, section: "Aptitude", text: "The average of 20 numbers is zero. Of them, at the most, how many may be greater than zero?", options: ["0", "1", "10", "19"], correctAnswer: 3 },
  { id: 8, section: "Aptitude", text: "A sum of money at simple interest amounts to $815 in 3 years and to $854 in 4 years. The sum is:", options: ["$650", "$690", "$698", "$700"], correctAnswer: 2 },
  { id: 9, section: "Aptitude", text: "Two numbers are in the ratio 3:5. If 9 is subtracted from each, the new numbers are in the ratio 12:23. The smaller number is:", options: ["27", "33", "49", "55"], correctAnswer: 0 },
  { id: 10, section: "Aptitude", text: "What is the probability of getting a sum 9 from two throws of a dice?", options: ["1/6", "1/8", "1/9", "1/12"], correctAnswer: 2 },
  { id: 11, section: "Logical", text: "Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?", options: ["(1/3)", "(1/8)", "(2/8)", "(1/16)"], correctAnswer: 1 },
  { id: 12, section: "Logical", text: "SCD, TEF, UGH, ____, WKL. Choose the correct alternative to fill the blank space.", options: ["CMN", "UJI", "VIJ", "IJT"], correctAnswer: 2 },
  { id: 13, section: "Logical", text: "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?", options: ["His own", "His son's", "His father's", "His nephew's"], correctAnswer: 1 },
  { id: 14, section: "Logical", text: "If in a certain language, POPULAR is coded as QPQVMBS, how is FAMOUS coded in that code?", options: ["GBNPTT", "GCOVTW", "CBJNUT", "GBNVVT"], correctAnswer: 0 },
  { id: 15, section: "Logical", text: "Aristotle cost costlier than Plato, but Socrates is cheaper than Plato. Who is the cheapest?", options: ["Aristotle", "Plato", "Socrates", "Cannot be determined"], correctAnswer: 2 },
  { id: 16, section: "Technical", text: "Which of the following is not a configuration management tool?", options: ["Ansible", "Puppet", "Chef", "Kubernetes"], correctAnswer: 3 },
  { id: 17, section: "Technical", text: "Which database system is natively document-oriented?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], correctAnswer: 2 },
  { id: 18, section: "Technical", text: "What does the 'S' in SOLID principles stand for?", options: ["Structural Responsibility", "Single Responsibility", "Scope Isolation", "Synchronized Objects"], correctAnswer: 1 },
  { id: 19, section: "Technical", text: "Which Git command is used to record project progression changes in your timeline?", options: ["git push", "git commit", "git add", "git status"], correctAnswer: 1 },
  { id: 20, section: "Technical", text: "What is the default port value for a standard HTTP communication protocol?", options: ["443", "8080", "21", "80"], correctAnswer: 3 }
];