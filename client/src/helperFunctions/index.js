const names = [
  'Sophia',
  'Isabella',
  'Jacob',
  'Mason',
  'Emily',
  'Abigail',
  'Ethan',
  'Mia',
  'Alexander',
  'Aiden',
  'Elizabeth',
  'Emma',
  'Olivia',
  'Paul',
  'Daniel',
  'Ava',
  'Matthew',
  'Anthony',
  'Liam',
  'Grace',
  'Victoria',
  'Brooklyn',
  'David',
  'James',
  'Lucas',
  'Kelly',
  'Amelia',
  'Logan',
];

const randomIndex = () => {
  const min = 0;
  const max = names.length;
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return Math.abs(rand);
};

export const generateTrx = () => {
  return {
    from: names[randomIndex()],
    to: names[randomIndex()],
    amount: (Math.random() * 100).toFixed(2),
  };
};