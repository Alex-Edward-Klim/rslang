import axios from "axios";

export default function requestVocabulary(
  token,
  userId,
  group,
  page,
  typeName,
  cbFunction,
  cb2
) {
  const url = `https://rslang-server-2021.herokuapp.com/users/${userId}/aggregatedWords`;
  const typeName2 = typeName === "studied_word" ? "compound_word" : typeName;
  axios(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      group,
      page,
      wordsPerPage: 20,
      filter: {
        $or: [
          { "userWord.difficulty": typeName },
          { "userWord.difficulty": typeName2 },
        ],
      },
    },
  })
    .then((response) => {
      const data = response.data[0].paginatedResults;
      const length = response?.data[0]?.totalCount[0]?.count;
      
      cbFunction(data);
      cb2(length);
    })
    .catch((err) => console.log(err.message));
}
