import { Icon } from '@blueprintjs/core';
import { groupBy, keys, map, sortBy } from 'lodash';
import Link from 'next/link';
import { useGetAllPagesWithCountQuery } from '../../../models';

const PageCategoriesLoader = () => {
  return <div>Loading</div>;
};

export const PageCategories = () => {
  const { data, loading } = useGetAllPagesWithCountQuery();

  if (loading) {
    return <PageCategoriesLoader />;
  }

  if (data) {
    const grouped = groupBy(data.currentUserPages, p => p.name[0]);
    const sorted = sortBy(keys(grouped), i => i);

    return (
      <div className="pb-6">
        {map(sorted, letter => {
          const group = grouped[letter];
          return (
            <div key={letter} className="pt-6">
              <div className="text-[#4288e9] font-bold">{letter.toUpperCase()}</div>
              <div>
                {group.map(item => {
                  return (
                    <div key={item.name} className="flex pt-5">
                      <Icon icon="tag" className="w-icon pr-3" />
                      <div className="flex-auto">
                        <Link href={`/pages/${item.id}`}>{item.name}</Link>
                      </div>
                      <div className="pr-8">{item.bookmarksCount}</div>
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
