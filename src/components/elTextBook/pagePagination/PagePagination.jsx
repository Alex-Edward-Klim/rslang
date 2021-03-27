import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserDataFromState,
  getWordsGroupAndPageFromState,
} from "../../../redux/selectors";
import { setWordsGroupAndPage } from "../../../redux/wordsGroupAndPage/wordsGroupAndPageActions";
import "./pagePagination.scss";
import arrowL from "../../../img/arrowL.png";
import arrowR from "../../../img/arrowR.png";

function PagePagination() {
  const { group, page } = useSelector(getWordsGroupAndPageFromState);
  const dispatch = useDispatch();

  let buttonLeftClass = 'page-pagination__block left';
  if (page === 0) buttonLeftClass += " disable"
  let buttonRightClass = 'page-pagination__block right';
  if (page === 29) buttonRightClass += " disable"

  return (
    <div className="page-pagination">
      <button
        className={buttonLeftClass}
        disabled={page === 0}
        onClick={() =>
          dispatch(setWordsGroupAndPage({ group, page: page - 1 }))
        }
      >
        <img src={arrowL} alt="" width="30" />
      </button>
      <div className="page-pagination__block  number">{page + 1}</div>
      <button
        className={buttonRightClass}
        disabled={page === 29}
        onClick={() =>
          dispatch(setWordsGroupAndPage({ group, page: page + 1 }))
        }
      >
        <img src={arrowR} alt="" width="30" />
      </button>
    </div>
  );
}

export default PagePagination;
