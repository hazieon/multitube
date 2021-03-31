import React, { useState, useReducer, useEffect } from "react";
import styles from "./index.module.css";
const KEY = process.env.REACT_APP_API_KEY;

const initialState = {
  queryArray: [],
  searchResults: [],
};

function reducer(state, action) {
  switch (action.type) {
    // case "addQuery":
    //   return { ...state, queryArray: [...state.queryArray, action.query] };
    case "setSearchResults":
      return {
        ...state,
        searchResults: [...state.searchResults, action.searchResults],
      };
    default:
      throw new Error();
  }
}
//https://www.googleapis.com/youtube/v3/search?part=snippet&key=${KEY}&type=video&q=blue%20moon
function Search() {
  const [query, setQuery] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  function queryHandler(text) {
    setQuery(text);
  }
  async function runSearch() {
    //split the list of queries at commas
    let newQuery = query.split(", ");

    // newQuery - run search on each of them - forEach
    newQuery.forEach((element) => {
      runSearchQuery(element);
      console.log(state.searchResults, "searchResults");
    });
  }

  async function runSearchQuery(query) {
    let response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=${KEY}&type=video&q=${query}`
    );
    let data = await response.json();

    //prevent duplicates:
    // if (state.searchResults.includes(data.items[0]))

    dispatch({ type: "setSearchResults", searchResults: data.items[0] });
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
      <div>
        {state.searchResults.length > 1
          ? state.searchResults.map((item) => {
              return (
                <div className={styles.panel}>
                  <p key={item.snippet.title}>{item.snippet.title}</p>
                  <img
                    src={item.snippet.thumbnails.default.url}
                    alt="video thumbnail"
                  />
                  <button className={styles.watchButton}>
                    <a
                      href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                    >
                      watch📺
                    </a>
                  </button>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
}

export default Search;

// let response = await fetch(
//   `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=${KEY}&type=video&q=${query}`
// );
// let data = await response.json();

//render a link button to the generated video, thumbnail image

//one step behind return
//prevent duplicates into search results
