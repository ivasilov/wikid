import { IItemRendererProps, ItemPredicate, MultiSelect } from '@blueprintjs/select';
import { MenuItem } from '..';
import { useGetAllPagesForDropdownQuery } from '../../models';

export type IdName = { id?: string; name: string };

const PageMultiSelect = MultiSelect.ofType<IdName>();

const renderNewTag = (query: string, active: boolean, handleClick: React.MouseEventHandler<HTMLElement>) => {
  return (
    <MenuItem
      icon="add"
      text={`Create "${query}"`}
      active={active}
      onClick={handleClick}
      shouldDismissPopover={false}
    />
  );
};

const renderPage = (
  page: IdName,
  { modifiers, handleClick }: IItemRendererProps,
  isPageSelected: (i: IdName) => boolean,
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }

  if (isPageSelected(page)) {
    return null;
  }

  return (
    <MenuItem
      key={page.name}
      active={modifiers.active}
      onClick={handleClick}
      shouldDismissPopover={false}
      text={page.name}
    />
  );
};

const filterPage: ItemPredicate<IdName> = (query, page, _index, exactMatch) => {
  const normalizedName = page.name.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedName === normalizedQuery;
  } else {
    return normalizedName.indexOf(normalizedQuery) >= 0;
  }
};

interface Props {
  pages: IdName[];
  onChange: (p: IdName[]) => void;
}

export const EditPagesForBookmark = (props: Props) => {
  const { pages, onChange } = props;

  const { data, loading } = useGetAllPagesForDropdownQuery({ fetchPolicy: 'network-only' });

  if (loading) {
    return <div>Loading</div>;
  }

  if (data?.currentUserPages) {
    const selectPage = (p: IdName) => {
      const ps = pages.concat([p]);
      onChange(ps);
    };

    const addPage = (name: string) => ({ name: name });
    const removePage = (page: any) => {
      const ps = pages.filter(p => p.name !== page);
      onChange(ps);
    };

    const isPageSelected = (page: IdName) => {
      return !!pages.find(p => p.id === page.id && p.name === page.name);
    };

    const availablePages = data.currentUserPages.filter(ap => pages.findIndex(page => page.id === ap.id) === -1);

    return (
      <PageMultiSelect
        fill
        tagRenderer={p => p.name}
        itemRenderer={(item, itemProps) => renderPage(item, itemProps, isPageSelected)}
        itemPredicate={filterPage}
        onItemSelect={selectPage}
        createNewItemFromQuery={addPage}
        createNewItemRenderer={renderNewTag}
        items={availablePages}
        selectedItems={pages}
        noResults={<MenuItem disabled={true} text="No results." />}
        popoverProps={{ minimal: true }}
        resetOnSelect
        tagInputProps={{
          tagProps: { minimal: true },
          onRemove: removePage,
        }}
      />
    );
  }

  return <div>An error happened while trying to show possible pages for linking to this bookmark.</div>;
};
