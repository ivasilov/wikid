import * as React from 'react';
import { ButtonGroup, Button } from '@blueprintjs/core';

interface Props {
  ids: readonly string[];
  itemsPerPage: number;
  itemRenderer: (i: string) => JSX.Element;
}

export const Paginated = (p: Props) => {
  const itemsPerPage = 5;
  const [currentPage, setStatePage] = React.useState(1);

  const maxPages = Math.ceil(p.ids.length / itemsPerPage);

  const startIndex = (currentPage - 1) * p.itemsPerPage;

  const endIndex = currentPage * p.itemsPerPage;

  const paginatedItems = p.ids.slice(startIndex, endIndex);

  const setPage = (p: number) => {
    if (p > 0 && p <= maxPages) {
      setStatePage(p);
    }
  };

  return (
    <>
      <div>{paginatedItems.map(id => p.itemRenderer(id))}</div>
      <div className="row justify-content-center">
        <ButtonGroup large minimal alignText="center">
          <Button text="<" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} />
          {currentPage > 2 ? <Button text={currentPage - 2} onClick={() => setPage(currentPage - 2)} /> : null}
          {currentPage > 1 ? <Button text={currentPage - 1} onClick={() => setPage(currentPage - 1)} /> : null}
          <Button text={currentPage} active />
          {currentPage < maxPages ? <Button text={currentPage + 1} onClick={() => setPage(currentPage + 1)} /> : null}
          {currentPage < maxPages - 1 ? (
            <Button text={currentPage + 2} onClick={() => setPage(currentPage + 2)} />
          ) : null}
          <Button text=">" disabled={currentPage === maxPages} onClick={() => setPage(currentPage + 1)} />
        </ButtonGroup>
      </div>
    </>
  );
};
