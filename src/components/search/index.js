import React, { useEffect, useState } from "react";
const KEY = process.env.REACT_APP_API_KEY;

//https://www.googleapis.com/youtube/v3/search?part=snippet&key=${KEY}&type=video&q=blue%20moon
function Search() {
  const [query, setQuery] = useState("");
  const [queryArray, setQueryArray] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  function queryHandler(text) {
    setQuery(text);
  }
  async function runSearch() {
    //split the list of queries at commas
    let newQuery = query.split(", ");

    // newQuery - run search on each of them - forEach
    newQuery.forEach((element) => {
      runSearchQuery(element);
    });
  }

  async function runSearchQuery(query) {
    let response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=${KEY}&type=video&q=${query}`
    );
    let data = await response.json();
    setQueryArray([...queryArray, data]);
    setSearchResults(queryArray);
  }

  return (
    <>
      <h3>Search with a comma separated list here:</h3>
      <textarea
        type="text"
        placeholder="search..."
        onChange={(e) => queryHandler(e.target.value)}
      ></textarea>
      <button onClick={runSearch}>search</button>

      {searchResults.length > 0
        ? searchResults.map((item) => {
            return <p key={item.snippet.title}>{item.snippet.title}</p>;
          })
        : ""}
    </>
  );
}

export default Search;

// let response = await fetch(
//   `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=${KEY}&type=video&q=${query}`
// );
// let data = await response.json();
