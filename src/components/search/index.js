import React from "react";
const KEY = process.env.REACT_APP_API_KEY;

//https://www.googleapis.com/youtube/v3/search?part=snippet&key=${KEY}&type=video&q=blue%20moon
function Search() {
  async function runSearch() {
    let response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=${KEY}&type=video&q=blue%20moon`
    );
    let data = await response.json();
    console.log(data);
  }
  runSearch();
  return <></>;
}

export default Search;
