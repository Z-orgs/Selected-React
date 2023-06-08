import React from "react";
import { useParams } from "react-router-dom";

const SearchResultPage = () => {
  const { keyword } = useParams();
  return (
    <div>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus,
      explicabo?
      {keyword}
    </div>
  );
};

export default SearchResultPage;
