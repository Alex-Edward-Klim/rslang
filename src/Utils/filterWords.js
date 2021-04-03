export default function filterWords(wordsList, userId, difficultName, equal = true) {
  let words = [...wordsList];
  if (userId) {
    equal
      ? (words = wordsList.filter(
          (el) => el?.userWord?.difficulty === difficultName
        ))
      : (words = wordsList.filter(
          (el) => el?.userWord?.difficulty !== difficultName
        ));
  }
  return words;
}
