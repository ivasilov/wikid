import * as React from 'react';
import { map, groupBy, sortBy, keys } from 'lodash';
import { useGetAllPagesQuery } from '../../models';
import { Icon } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

const PageCategoriesLoader = () => {
  return <div>Loading</div>;
};

export const PageCategories = () => {
  const { data, loading } = useGetAllPagesQuery();

  if (loading) {
    return <PageCategoriesLoader />;
  }

  console.log(data);

  if (data) {
    const grouped = groupBy(data.currentUser.pages, p => p.name[0]);
    const sorted = sortBy(keys(grouped), i => i);

    return (
      <div className="w-categories-list pb-6">
        {map(sorted, letter => {
          const group = grouped[letter];
          return (
            <div key={letter} className="pt-6">
              <div className="w-category-name font-bold">{letter.toUpperCase()}</div>
              <div className="w-pages-list">
                {group.map(item => {
                  return (
                    <div key={item.name} className="w-page-item flex flex-row pt-5">
                      <Icon icon="tag" className="w-icon pr-3" />
                      <div className="flex-auto">
                        <Link to={`/page/${item.id}`}>{item.name}</Link>
                      </div>
                      <div className="pr-8">{item.bookmarks.length}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return <div>Error happened.</div>;
};
