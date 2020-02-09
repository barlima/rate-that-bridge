import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { preparePagination } from '../../helpers/pagination';

// alongside with first,
// last and dots: 1 ... 4 5 6 ... 12
const BOXES_VISIBLE = 9;

const Pagination = props => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const { pages, history, location } = props;
  const boxes = preparePagination(pages, BOXES_VISIBLE, currentPage);

  useEffect(() => {
    if (location.search.includes("page")) {
      const params = new URLSearchParams(location.search);
      setCurrentPage(parseInt(params.get('page')));
    }
  }, [])

  const handlePageChange = page => {
    if (!page) {
      return;
    }

    setCurrentPage(page);

    if (page === 1) {
      return history.replace(location.pathname);
    }

    history.replace({
      pathname: location.pathname,
      search: `?page=${page}`,
    })
  }

  const handleIncrement = () => {
    if (currentPage >= pages) {
      return
    }

    handlePageChange(currentPage + 1);
  }

  const handleDecrement = () => {
    if (currentPage < 2) {
      return
    }

    handlePageChange(currentPage - 1);
  }

  return (
    <div className="pagination">
      <div
        key="previous"
        className={`pagination__box ${currentPage < 2 ? 'pagination-disabled' : ''}`}
        onClick={handleDecrement}
      >
        <span className="pagination__box-label">{"<"}</span>
      </div>
      {
        boxes.map((box, i) => (
          <div
            key={i}
            className={`
              pagination__box
              ${currentPage === box ? 'pagination__box-selected' : ''}
              ${box ? '' : 'pagination-disabled'}
            `}
            onClick={() => handlePageChange(box)}
          >
            <span className="pagination__box-label">{box || '...'}</span>
          </div>
        ))
      }
      <div
        key="next"
        className={`pagination__box ${currentPage >= pages ? 'pagination-disabled' : ''}`}
        onClick={handleIncrement}
      >
        <span className="pagination__box-label">{">"}</span>
      </div>
    </div>
  )
}

export default withRouter(Pagination);