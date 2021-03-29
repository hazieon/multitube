import React, { useEffect, useState } from "react";
const KEY = process.env.REACT_APP_API_KEY;

//https://www.googleapis.com/youtube/v3/search?part=snippet&key=${KEY}&type=video&q=blue%20moon
function Search() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //   useEffect(() => {
  //     runSearch();
  //   }, [query]);

  function queryHandler(text) {
    setQuery(text);
    console.log(query);
  }
  async function runSearch() {
    let response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=${KEY}&type=video&q=${query}`
    );
    let data = await response.json();
    setSearchResults(data.items);
    console.log(searchResults);
    console.log(searchResults.length);
  }

  return (
    <>
      <input
        type="text"
        placeholder="search..."
        onChange={(e) => queryHandler(e.target.value)}
      ></input>
      <button onClick={runSearch}>search</button>

      {searchResults.length > 0
        ? searchResults.map((item) => {
            console.log(item.snippet.title);
            return (
              <p key={item.snippet.thumbnails.title}>{item.snippet.title}</p>
            );
          })
        : ""}
    </>
  );
}

export default Search;
