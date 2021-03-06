import React, { useState, useReducer } from "react";
import styles from "./index.module.css";
const KEY = process.env.REACT_APP_API_KEY;

const initialState = {
  queryArray: [],
  searchResults: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "setSearchResults":
      return {
        ...state,
        searchResults: [...state.searchResults, action.searchResults],
      };
    default:
      throw new Error();
  }
}

function Search() {
  const [query, setQuery] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  function queryHandler(text) {
    setQuery(text);
  }
  async function runSearch() {
    //split the list of queries at commas
    let newQuery = query.split(",");

    // newQuery - run search on each of them - forEach
    newQuery.forEach((element) => {
      runSearchQuery(element);
      console.log(state.searchResults, "searchResults");
    });
  }

  async function runSearchQuery(query) {
    let data;
    let response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=${KEY}&type=video&q=${query}`
    );

    data = await response.json();

    if (data.items[0]) {
      console.log(data.items[0]);
      dispatch({
        type: "setSearchResults",
        searchResults: data.items[0],
      });
    } else {
      console.log(query, "not found");
    }
  }

  return (
    <>
      <h3 className={styles.searchSubtitle}>
        Watch or download any YouTube videos easily
      </h3>
      <div className={styles.searchContainer}>
        <textarea
          className={styles.textInput}
          type="text"
          placeholder="Search keywords or paste a links here. Comma separated..."
          onChange={(e) => queryHandler(e.target.value)}
        ></textarea>
        <button className={styles.watchButton} onClick={runSearch}>
          Go
        </button>
      </div>
      <div>
        {state.searchResults.length > 0
          ? state.searchResults.map((item) => {
              return (
                <div className={styles.panel}>
                  <p key={item.snippet ? item.snippet.title : ""}>
                    {item.snippet ? item.snippet.title : ""}
                  </p>
                  <img
                    src={
                      item.snippet ? item.snippet.thumbnails.default.url : ""
                    }
                    alt="video thumbnail"
                  />
                  <button className={styles.watchButton}>
                    <a
                      href={`https://www.youtube.com/watch?v=${
                        item.id ? item.id.videoId : ""
                      }`}
                    >
                      Watch????
                    </a>
                  </button>
                  <button className={styles.watchButton}>
                    <a
                      href={`https://savemp3.app/en/download?url=https://www.youtube.com/watch?v=${
                        item.id ? item.id.videoId : ""
                      }`}
                      style={{ display: "table-cell" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download ???
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

//one step behind return
//prevent duplicates into search results
