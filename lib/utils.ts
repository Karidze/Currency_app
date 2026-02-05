// lib/utils.ts
export const generateAccountNumber = () => {
  // Генерируем 16 случайных цифр
  const numbers = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('');
  
  // Форматируем в блоки по 4 цифры через пробел
  return numbers.replace(/(\d{4})(?=\d)/g, '$1 ');
};