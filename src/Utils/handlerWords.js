import axios from "axios";

const  handlerWords = (userId, token, word, newDifficulty, changeOptional = true) => {
  const head = "https://rslang-server-2021.herokuapp.com";
  const url = `${head}/users/${userId}/words/${word._id}`;
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  
  switch (newDifficulty) {

    case "game":
      if (word.userWord) {
        const difficulty = word.userWord.difficulty;
        const a = word.userWord.optional;
        const optional = changeOptional 
          ? {correct_otvet: a.correct_otvet + 1, wrong_otvet: a.wrong_otvet} 
          : {correct_otvet: a.correct_otvet, wrong_otvet: a.wrong_otvet + 1};
        const body = { difficulty, optional };

        axios.put(url, body, headers)
        .then(() => {})
        .catch(error => console.log('handlerWords ERROR: "game" PUT'));

      } else {
        const optional = changeOptional 
          ? {correct_otvet: 1, wrong_otvet: 0} 
          : {correct_otvet: 0, wrong_otvet: 1};
        const body = { difficulty: "studied_word", optional };
        
        axios.post(url, body, headers)
        .then(() => {})
        .catch(error => console.log('handlerWords ERROR: "game" POST'));
      };
      break;

    case "compound_word":
      if (word.userWord) {
        const body = { difficulty: "compound_word", optional: word.userWord.optional };

        axios.put(url, body, headers)
        .then(() => {})
        .catch(error => console.log('handlerWords ERROR: "compound_word" PUT'));

      } else {
        const body = { difficulty: "compound_word", optional: {correct_otvet: 0, wrong_otvet: 0} };
        
        axios.post(url, body, headers)
        .then(() => {})
        .catch(error => console.log('handlerWords ERROR: "compound_word" POST'));
      };
      break;

    case "deleted_word":
      if (word.userWord) {
        const body = { difficulty: "deleted_word", optional: word.userWord.optional };

        axios.put(url, body, headers)
        .then(() => {})
        .catch(error => console.log('handlerWords ERROR: "deleted_word" PUT'));

      } else {
        const body = { difficulty: "deleted_word", optional: {correct_otvet: 0, wrong_otvet: 0} };
        
        axios.post(url, body, headers)
        .then(() => {})
        .catch(error => console.log('handlerWords ERROR: "deleted_word" POST'));
      };
      break;

    case "reconstitute":
      axios.delete(url, headers)
      .then(() => {})
      .catch(error => console.log('handlerWords ERROR: "reconstitute" DELETE'));
      break;

    default: break;
  }
};

export default handlerWords;

// difficulty = undefined || "studied_word" || "compound_word" || "deleted_word"
// newDifficulty = "game" || "compound_word" || "deleted_word" || "reconstitute"
// optional = { correct_otvet: 2, wrong_otvet: 0 }