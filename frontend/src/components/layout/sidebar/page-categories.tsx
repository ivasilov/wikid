import { faTag } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { sortBy } from 'lodash';
import { PageLink } from '.';
import { useGetAllPagesWithCountQuery } from '../../../models';

const PageCategoriesLoader = () => {
  return <div>Loading</div>;
};

export const PageCategories = ({ className }: { className?: string }) => {
  const { data, loading } = useGetAllPagesWithCountQuery();

  if (loading) {
    return <PageCategoriesLoader />;
  }

  if (data) {
    const sorted = sortBy(data.currentUserPages, p => p.name);

    return (
      <div className="space-y-1">
        <h3 className={classNames(className, 'px-1 font-medium text-gray-500')} id="projects-headline">
          Pages
        </h3>
        <div className="space-y-1" role="group" aria-labelledby="projects-headline">
          {sorted.map(page => (
            <PageLink key={page.id} name={page.name} className={className} href={`/pages/${page.id}`} icon={faTag} />
          ))}
        </div>
      </div>
    );
  }

  return <div>Error happened.</div>;
};
