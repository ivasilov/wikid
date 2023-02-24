import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import { MultiValue } from 'react-select/dist/declarations/src/types';
import { useGetAllPagesForDropdownLazyQuery } from '../../models';
import styles from './react-select.module.css';

export type IdName = { id?: string; name: string };

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};

interface Props {
  pages: IdName[];
  onChange: (p: IdName[]) => void;
}

const filterPage: (option: FilterOptionOption<IdName>, inputValue: string) => boolean = (option, inputValue) => {
  if ((option.data as any).__isNew__) {
    return false;
  }

  const normalizedName = option.data.name.toLowerCase();
  const normalizedQuery = inputValue.toLowerCase();

  return normalizedName.indexOf(normalizedQuery) >= 0;
};

export const EditPagesForBookmark = (props: Props) => {
  const { pages, onChange } = props;

  const [getAllPages] = useGetAllPagesForDropdownLazyQuery({ fetchPolicy: 'network-only', ssr: false });

  const availablePages = (_inputValue: string) => {
    // TODO: the input value should be passed to the backend for filtering on the backend
    return getAllPages().then(value => {
      return value.data?.currentUserPages || [];
    });
  };

  return (
    <AsyncCreatableSelect
      classNames={{
        // this is done to unstyle the default style from tailwind/forms on input
        input: () => styles['input-container'],
        control: state => (state.isFocused ? 'border-primary-600 border-primary-600:hover' : ''),
      }}
      styles={{
        control: (baseStyles, state) => {
          return {
            ...baseStyles,
            // this is needed to clear all border style so that the classNames prop works
            borderColor: state.isFocused ? undefined : baseStyles.borderColor,
            '&:hover': undefined,
          };
        },
        menuPortal: base => ({ ...base, zIndex: 9999 }),
      }}
      value={pages}
      isMulti
      cacheOptions
      defaultOptions // when set to true, it will auto load the options on render
      loadOptions={availablePages}
      createOptionPosition="first"
      getOptionValue={p => p.id || p.name} // handle the create new case where it has only a name
      getOptionLabel={p => (p as any).label || p.name} // handle the create new case where it can have a label
      filterOption={filterPage}
      closeMenuOnSelect={false}
      menuPortalTarget={document.body}
      formatCreateLabel={userInput => `Add "${userInput}"`}
      getNewOptionData={(value, label) => ({ name: value, label })} // attach the label created by formatCreateLabel
      onChange={ps => onChange(ps as Mutable<MultiValue<IdName>>)}
    />
  );
};
