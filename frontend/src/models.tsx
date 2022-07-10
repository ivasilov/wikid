import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type gqlBookmark = {
  __typename: 'Bookmark';
  id: Scalars['ID'];
  name: Scalars['String'];
  pages: Array<gqlPage>;
  read: Scalars['Boolean'];
  url: Scalars['String'];
};

export type gqlBookmarkNullablePageInput = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type gqlCreateBookmarkInput = {
  name: Scalars['String'];
  pageIds?: InputMaybe<Array<gqlBookmarkNullablePageInput>>;
  url: Scalars['String'];
};

export type gqlCreatePageInput = {
  bookmarkIds?: InputMaybe<Array<Scalars['ID']>>;
  content?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type gqlImportInput = {
  pages?: InputMaybe<Array<gqlBookmarkNullablePageInput>>;
  type: Scalars['String'];
  upload: Scalars['Upload'];
};

export type gqlMutation = {
  __typename: 'Mutation';
  createBookmark: gqlBookmark;
  createPage: gqlPage;
  deleteBookmark: Scalars['ID'];
  deletePage: Scalars['ID'];
  import: gqlUploadedFileResponse;
  updateBookmark: gqlBookmark;
  updatePage: gqlPage;
};

export type gqlMutationCreateBookmarkArgs = {
  params: gqlCreateBookmarkInput;
};

export type gqlMutationCreatePageArgs = {
  params: gqlCreatePageInput;
};

export type gqlMutationDeleteBookmarkArgs = {
  id: Scalars['ID'];
};

export type gqlMutationDeletePageArgs = {
  id: Scalars['ID'];
};

export type gqlMutationImportArgs = {
  params: gqlImportInput;
};

export type gqlMutationUpdateBookmarkArgs = {
  params: gqlUpdateBookmarkInput;
};

export type gqlMutationUpdatePageArgs = {
  params: gqlUpdatePageInput;
};

export type gqlPage = {
  __typename: 'Page';
  bookmarks: Array<gqlBookmark>;
  bookmarksCount: Scalars['Int'];
  content: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type gqlPaginatedBookmarks = {
  __typename: 'paginatedBookmarks';
  bookmarks: Array<gqlBookmark>;
  cursor?: Maybe<Scalars['String']>;
};

export type gqlQuery = {
  __typename: 'Query';
  bookmark: gqlBookmark;
  currentUser: gqlUser;
  currentUserBookmarks: gqlPaginatedBookmarks;
  currentUserPages: Array<gqlPage>;
  currentUserUnreadBookmarks: gqlPaginatedBookmarks;
  page: gqlPage;
  search: gqlPaginatedBookmarks;
};

export type gqlQueryBookmarkArgs = {
  id: Scalars['ID'];
};

export type gqlQueryCurrentUserBookmarksArgs = {
  cursor?: InputMaybe<Scalars['String']>;
};

export type gqlQueryCurrentUserPagesArgs = {
  cursor?: InputMaybe<Scalars['String']>;
};

export type gqlQueryCurrentUserUnreadBookmarksArgs = {
  cursor?: InputMaybe<Scalars['String']>;
};

export type gqlQueryPageArgs = {
  id: Scalars['ID'];
};

export type gqlQuerySearchArgs = {
  params: gqlSearchInput;
};

export type gqlSearchInput = {
  cursor?: InputMaybe<Scalars['String']>;
  term: Scalars['String'];
};

export type gqlUpdateBookmarkInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  pageIds?: InputMaybe<Array<gqlBookmarkNullablePageInput>>;
  read?: InputMaybe<Scalars['Boolean']>;
  url?: InputMaybe<Scalars['String']>;
};

export type gqlUpdatePageInput = {
  content?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type gqlUploadedFileResponse = {
  __typename: 'UploadedFileResponse';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  url: Scalars['String'];
};

export type gqlUser = {
  __typename: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
};

export type gqlCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type gqlCurrentUserQuery = {
  __typename: 'Query';
  currentUser: { __typename: 'User'; id: string; email: string };
};

export type gqlImportFileMutationVariables = Exact<{
  params: gqlImportInput;
}>;

export type gqlImportFileMutation = {
  __typename: 'Mutation';
  import: { __typename: 'UploadedFileResponse'; filename: string };
};

export type gqlAllBookmarksQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
}>;

export type gqlAllBookmarksQuery = {
  __typename: 'Query';
  currentUserBookmarks: {
    __typename: 'paginatedBookmarks';
    cursor?: string | null;
    bookmarks: Array<{ __typename: 'Bookmark'; id: string; url: string; name: string }>;
  };
};

export type gqlBookmarkFragmentFragment = { __typename: 'Bookmark'; id: string; url: string; name: string };

export type gqlBookmarksFragmentFragment = { __typename: 'Bookmark'; id: string; url: string; name: string };

export type gqlDeleteBookmarkMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type gqlDeleteBookmarkMutation = { __typename: 'Mutation'; deleteBookmark: string };

export type gqlGetBookmarkQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type gqlGetBookmarkQuery = {
  __typename: 'Query';
  bookmark: {
    __typename: 'Bookmark';
    id: string;
    url: string;
    name: string;
    read: boolean;
    pages: Array<{ __typename: 'Page'; id: string; name: string; description: string; content: string }>;
  };
};

export type gqlUpdateBookmarkMutationVariables = Exact<{
  params: gqlUpdateBookmarkInput;
}>;

export type gqlUpdateBookmarkMutation = {
  __typename: 'Mutation';
  updateBookmark: {
    __typename: 'Bookmark';
    id: string;
    url: string;
    name: string;
    read: boolean;
    pages: Array<{ __typename: 'Page'; id: string; name: string; description: string; content: string }>;
  };
};

export type gqlGetAllPagesForDropdownQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
}>;

export type gqlGetAllPagesForDropdownQuery = {
  __typename: 'Query';
  currentUserPages: Array<{ __typename: 'Page'; id: string; name: string }>;
};

export type gqlCreateBookmarkMutationVariables = Exact<{
  params: gqlCreateBookmarkInput;
}>;

export type gqlCreateBookmarkMutation = {
  __typename: 'Mutation';
  createBookmark: { __typename: 'Bookmark'; id: string };
};

export type gqlPageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type gqlPageQuery = {
  __typename: 'Query';
  page: {
    __typename: 'Page';
    id: string;
    name: string;
    description: string;
    content: string;
    bookmarks: Array<{ __typename: 'Bookmark'; id: string; url: string; name: string }>;
  };
};

export type gqlReadOnlyPageFragmentFragment = {
  __typename: 'Page';
  id: string;
  name: string;
  description: string;
  content: string;
  bookmarks: Array<{ __typename: 'Bookmark'; id: string; url: string; name: string }>;
};

export type gqlUpdatePageMutationVariables = Exact<{
  params: gqlUpdatePageInput;
}>;

export type gqlUpdatePageMutation = {
  __typename: 'Mutation';
  updatePage: { __typename: 'Page'; id: string; name: string; description: string; content: string };
};

export type gqlGetAllPagesWithCountQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
}>;

export type gqlGetAllPagesWithCountQuery = {
  __typename: 'Query';
  currentUserPages: Array<{ __typename: 'Page'; id: string; name: string; bookmarksCount: number }>;
};

export type gqlUnreadBookmarksQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
}>;

export type gqlUnreadBookmarksQuery = {
  __typename: 'Query';
  currentUserUnreadBookmarks: {
    __typename: 'paginatedBookmarks';
    cursor?: string | null;
    bookmarks: Array<{ __typename: 'Bookmark'; id: string; url: string; name: string }>;
  };
};

export const BookmarkFragmentFragmentDoc = /*#__PURE__*/ gql`
  fragment BookmarkFragment on Bookmark {
    id
    url
    name
  }
`;
export const BookmarksFragmentFragmentDoc = /*#__PURE__*/ gql`
  fragment BookmarksFragment on Bookmark {
    ...BookmarkFragment
  }
  ${BookmarkFragmentFragmentDoc}
`;
export const ReadOnlyPageFragmentFragmentDoc = /*#__PURE__*/ gql`
  fragment ReadOnlyPageFragment on Page {
    id
    name
    description
    content
    bookmarks {
      ...BookmarksFragment
    }
  }
  ${BookmarksFragmentFragmentDoc}
`;
export const CurrentUserDocument = /*#__PURE__*/ gql`
  query currentUser {
    currentUser {
      id
      email
    }
  }
`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<gqlCurrentUserQuery, gqlCurrentUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<gqlCurrentUserQuery, gqlCurrentUserQueryVariables>(CurrentUserDocument, options);
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<gqlCurrentUserQuery, gqlCurrentUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<gqlCurrentUserQuery, gqlCurrentUserQueryVariables>(CurrentUserDocument, options);
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<gqlCurrentUserQuery, gqlCurrentUserQueryVariables>;
export const ImportFileDocument = /*#__PURE__*/ gql`
  mutation importFile($params: ImportInput!) {
    import(params: $params) {
      filename
    }
  }
`;

/**
 * __useImportFileMutation__
 *
 * To run a mutation, you first call `useImportFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importFileMutation, { data, loading, error }] = useImportFileMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useImportFileMutation(
  baseOptions?: Apollo.MutationHookOptions<gqlImportFileMutation, gqlImportFileMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<gqlImportFileMutation, gqlImportFileMutationVariables>(ImportFileDocument, options);
}
export type ImportFileMutationHookResult = ReturnType<typeof useImportFileMutation>;
export type ImportFileMutationResult = Apollo.MutationResult<gqlImportFileMutation>;
export type ImportFileMutationOptions = Apollo.BaseMutationOptions<
  gqlImportFileMutation,
  gqlImportFileMutationVariables
>;
export const AllBookmarksDocument = /*#__PURE__*/ gql`
  query allBookmarks($cursor: String) {
    currentUserBookmarks(cursor: $cursor) {
      cursor
      bookmarks {
        ...BookmarksFragment
      }
    }
  }
  ${BookmarksFragmentFragmentDoc}
`;

/**
 * __useAllBookmarksQuery__
 *
 * To run a query within a React component, call `useAllBookmarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBookmarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBookmarksQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useAllBookmarksQuery(
  baseOptions?: Apollo.QueryHookOptions<gqlAllBookmarksQuery, gqlAllBookmarksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<gqlAllBookmarksQuery, gqlAllBookmarksQueryVariables>(AllBookmarksDocument, options);
}
export function useAllBookmarksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<gqlAllBookmarksQuery, gqlAllBookmarksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<gqlAllBookmarksQuery, gqlAllBookmarksQueryVariables>(AllBookmarksDocument, options);
}
export type AllBookmarksQueryHookResult = ReturnType<typeof useAllBookmarksQuery>;
export type AllBookmarksLazyQueryHookResult = ReturnType<typeof useAllBookmarksLazyQuery>;
export type AllBookmarksQueryResult = Apollo.QueryResult<gqlAllBookmarksQuery, gqlAllBookmarksQueryVariables>;
export const DeleteBookmarkDocument = /*#__PURE__*/ gql`
  mutation deleteBookmark($id: ID!) {
    deleteBookmark(id: $id)
  }
`;

/**
 * __useDeleteBookmarkMutation__
 *
 * To run a mutation, you first call `useDeleteBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookmarkMutation, { data, loading, error }] = useDeleteBookmarkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBookmarkMutation(
  baseOptions?: Apollo.MutationHookOptions<gqlDeleteBookmarkMutation, gqlDeleteBookmarkMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<gqlDeleteBookmarkMutation, gqlDeleteBookmarkMutationVariables>(
    DeleteBookmarkDocument,
    options,
  );
}
export type DeleteBookmarkMutationHookResult = ReturnType<typeof useDeleteBookmarkMutation>;
export type DeleteBookmarkMutationResult = Apollo.MutationResult<gqlDeleteBookmarkMutation>;
export type DeleteBookmarkMutationOptions = Apollo.BaseMutationOptions<
  gqlDeleteBookmarkMutation,
  gqlDeleteBookmarkMutationVariables
>;
export const GetBookmarkDocument = /*#__PURE__*/ gql`
  query getBookmark($id: ID!) {
    bookmark(id: $id) {
      id
      url
      name
      read
      pages {
        id
        name
        description
        content
      }
    }
  }
`;

/**
 * __useGetBookmarkQuery__
 *
 * To run a query within a React component, call `useGetBookmarkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookmarkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookmarkQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBookmarkQuery(
  baseOptions: Apollo.QueryHookOptions<gqlGetBookmarkQuery, gqlGetBookmarkQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<gqlGetBookmarkQuery, gqlGetBookmarkQueryVariables>(GetBookmarkDocument, options);
}
export function useGetBookmarkLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<gqlGetBookmarkQuery, gqlGetBookmarkQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<gqlGetBookmarkQuery, gqlGetBookmarkQueryVariables>(GetBookmarkDocument, options);
}
export type GetBookmarkQueryHookResult = ReturnType<typeof useGetBookmarkQuery>;
export type GetBookmarkLazyQueryHookResult = ReturnType<typeof useGetBookmarkLazyQuery>;
export type GetBookmarkQueryResult = Apollo.QueryResult<gqlGetBookmarkQuery, gqlGetBookmarkQueryVariables>;
export const UpdateBookmarkDocument = /*#__PURE__*/ gql`
  mutation updateBookmark($params: UpdateBookmarkInput!) {
    updateBookmark(params: $params) {
      id
      url
      name
      read
      pages {
        id
        name
        description
        content
      }
    }
  }
`;

/**
 * __useUpdateBookmarkMutation__
 *
 * To run a mutation, you first call `useUpdateBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookmarkMutation, { data, loading, error }] = useUpdateBookmarkMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useUpdateBookmarkMutation(
  baseOptions?: Apollo.MutationHookOptions<gqlUpdateBookmarkMutation, gqlUpdateBookmarkMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<gqlUpdateBookmarkMutation, gqlUpdateBookmarkMutationVariables>(
    UpdateBookmarkDocument,
    options,
  );
}
export type UpdateBookmarkMutationHookResult = ReturnType<typeof useUpdateBookmarkMutation>;
export type UpdateBookmarkMutationResult = Apollo.MutationResult<gqlUpdateBookmarkMutation>;
export type UpdateBookmarkMutationOptions = Apollo.BaseMutationOptions<
  gqlUpdateBookmarkMutation,
  gqlUpdateBookmarkMutationVariables
>;
export const GetAllPagesForDropdownDocument = /*#__PURE__*/ gql`
  query getAllPagesForDropdown($cursor: String) {
    currentUserPages(cursor: $cursor) {
      id
      name
    }
  }
`;

/**
 * __useGetAllPagesForDropdownQuery__
 *
 * To run a query within a React component, call `useGetAllPagesForDropdownQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPagesForDropdownQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPagesForDropdownQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetAllPagesForDropdownQuery(
  baseOptions?: Apollo.QueryHookOptions<gqlGetAllPagesForDropdownQuery, gqlGetAllPagesForDropdownQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<gqlGetAllPagesForDropdownQuery, gqlGetAllPagesForDropdownQueryVariables>(
    GetAllPagesForDropdownDocument,
    options,
  );
}
export function useGetAllPagesForDropdownLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<gqlGetAllPagesForDropdownQuery, gqlGetAllPagesForDropdownQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<gqlGetAllPagesForDropdownQuery, gqlGetAllPagesForDropdownQueryVariables>(
    GetAllPagesForDropdownDocument,
    options,
  );
}
export type GetAllPagesForDropdownQueryHookResult = ReturnType<typeof useGetAllPagesForDropdownQuery>;
export type GetAllPagesForDropdownLazyQueryHookResult = ReturnType<typeof useGetAllPagesForDropdownLazyQuery>;
export type GetAllPagesForDropdownQueryResult = Apollo.QueryResult<
  gqlGetAllPagesForDropdownQuery,
  gqlGetAllPagesForDropdownQueryVariables
>;
export const CreateBookmarkDocument = /*#__PURE__*/ gql`
  mutation createBookmark($params: CreateBookmarkInput!) {
    createBookmark(params: $params) {
      id
    }
  }
`;

/**
 * __useCreateBookmarkMutation__
 *
 * To run a mutation, you first call `useCreateBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookmarkMutation, { data, loading, error }] = useCreateBookmarkMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useCreateBookmarkMutation(
  baseOptions?: Apollo.MutationHookOptions<gqlCreateBookmarkMutation, gqlCreateBookmarkMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<gqlCreateBookmarkMutation, gqlCreateBookmarkMutationVariables>(
    CreateBookmarkDocument,
    options,
  );
}
export type CreateBookmarkMutationHookResult = ReturnType<typeof useCreateBookmarkMutation>;
export type CreateBookmarkMutationResult = Apollo.MutationResult<gqlCreateBookmarkMutation>;
export type CreateBookmarkMutationOptions = Apollo.BaseMutationOptions<
  gqlCreateBookmarkMutation,
  gqlCreateBookmarkMutationVariables
>;
export const PageDocument = /*#__PURE__*/ gql`
  query page($id: ID!) {
    page(id: $id) {
      ...ReadOnlyPageFragment
    }
  }
  ${ReadOnlyPageFragmentFragmentDoc}
`;

/**
 * __usePageQuery__
 *
 * To run a query within a React component, call `usePageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePageQuery(baseOptions: Apollo.QueryHookOptions<gqlPageQuery, gqlPageQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<gqlPageQuery, gqlPageQueryVariables>(PageDocument, options);
}
export function usePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<gqlPageQuery, gqlPageQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<gqlPageQuery, gqlPageQueryVariables>(PageDocument, options);
}
export type PageQueryHookResult = ReturnType<typeof usePageQuery>;
export type PageLazyQueryHookResult = ReturnType<typeof usePageLazyQuery>;
export type PageQueryResult = Apollo.QueryResult<gqlPageQuery, gqlPageQueryVariables>;
export const UpdatePageDocument = /*#__PURE__*/ gql`
  mutation updatePage($params: UpdatePageInput!) {
    updatePage(params: $params) {
      id
      name
      description
      content
    }
  }
`;

/**
 * __useUpdatePageMutation__
 *
 * To run a mutation, you first call `useUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePageMutation, { data, loading, error }] = useUpdatePageMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useUpdatePageMutation(
  baseOptions?: Apollo.MutationHookOptions<gqlUpdatePageMutation, gqlUpdatePageMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<gqlUpdatePageMutation, gqlUpdatePageMutationVariables>(UpdatePageDocument, options);
}
export type UpdatePageMutationHookResult = ReturnType<typeof useUpdatePageMutation>;
export type UpdatePageMutationResult = Apollo.MutationResult<gqlUpdatePageMutation>;
export type UpdatePageMutationOptions = Apollo.BaseMutationOptions<
  gqlUpdatePageMutation,
  gqlUpdatePageMutationVariables
>;
export const GetAllPagesWithCountDocument = /*#__PURE__*/ gql`
  query getAllPagesWithCount($cursor: String) {
    currentUserPages(cursor: $cursor) {
      id
      name
      bookmarksCount
    }
  }
`;

/**
 * __useGetAllPagesWithCountQuery__
 *
 * To run a query within a React component, call `useGetAllPagesWithCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPagesWithCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPagesWithCountQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetAllPagesWithCountQuery(
  baseOptions?: Apollo.QueryHookOptions<gqlGetAllPagesWithCountQuery, gqlGetAllPagesWithCountQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<gqlGetAllPagesWithCountQuery, gqlGetAllPagesWithCountQueryVariables>(
    GetAllPagesWithCountDocument,
    options,
  );
}
export function useGetAllPagesWithCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<gqlGetAllPagesWithCountQuery, gqlGetAllPagesWithCountQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<gqlGetAllPagesWithCountQuery, gqlGetAllPagesWithCountQueryVariables>(
    GetAllPagesWithCountDocument,
    options,
  );
}
export type GetAllPagesWithCountQueryHookResult = ReturnType<typeof useGetAllPagesWithCountQuery>;
export type GetAllPagesWithCountLazyQueryHookResult = ReturnType<typeof useGetAllPagesWithCountLazyQuery>;
export type GetAllPagesWithCountQueryResult = Apollo.QueryResult<
  gqlGetAllPagesWithCountQuery,
  gqlGetAllPagesWithCountQueryVariables
>;
export const UnreadBookmarksDocument = /*#__PURE__*/ gql`
  query unreadBookmarks($cursor: String) {
    currentUserUnreadBookmarks(cursor: $cursor) {
      cursor
      bookmarks {
        ...BookmarksFragment
      }
    }
  }
  ${BookmarksFragmentFragmentDoc}
`;

/**
 * __useUnreadBookmarksQuery__
 *
 * To run a query within a React component, call `useUnreadBookmarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnreadBookmarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnreadBookmarksQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useUnreadBookmarksQuery(
  baseOptions?: Apollo.QueryHookOptions<gqlUnreadBookmarksQuery, gqlUnreadBookmarksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<gqlUnreadBookmarksQuery, gqlUnreadBookmarksQueryVariables>(UnreadBookmarksDocument, options);
}
export function useUnreadBookmarksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<gqlUnreadBookmarksQuery, gqlUnreadBookmarksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<gqlUnreadBookmarksQuery, gqlUnreadBookmarksQueryVariables>(
    UnreadBookmarksDocument,
    options,
  );
}
export type UnreadBookmarksQueryHookResult = ReturnType<typeof useUnreadBookmarksQuery>;
export type UnreadBookmarksLazyQueryHookResult = ReturnType<typeof useUnreadBookmarksLazyQuery>;
export type UnreadBookmarksQueryResult = Apollo.QueryResult<gqlUnreadBookmarksQuery, gqlUnreadBookmarksQueryVariables>;
export type BookmarkKeySpecifier = ('id' | 'name' | 'pages' | 'read' | 'url' | BookmarkKeySpecifier)[];
export type BookmarkFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  pages?: FieldPolicy<any> | FieldReadFunction<any>;
  read?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | 'createBookmark'
  | 'createPage'
  | 'deleteBookmark'
  | 'deletePage'
  | 'import'
  | 'updateBookmark'
  | 'updatePage'
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  createBookmark?: FieldPolicy<any> | FieldReadFunction<any>;
  createPage?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteBookmark?: FieldPolicy<any> | FieldReadFunction<any>;
  deletePage?: FieldPolicy<any> | FieldReadFunction<any>;
  import?: FieldPolicy<any> | FieldReadFunction<any>;
  updateBookmark?: FieldPolicy<any> | FieldReadFunction<any>;
  updatePage?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PageKeySpecifier = (
  | 'bookmarks'
  | 'bookmarksCount'
  | 'content'
  | 'description'
  | 'id'
  | 'name'
  | PageKeySpecifier
)[];
export type PageFieldPolicy = {
  bookmarks?: FieldPolicy<any> | FieldReadFunction<any>;
  bookmarksCount?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type paginatedBookmarksKeySpecifier = ('bookmarks' | 'cursor' | paginatedBookmarksKeySpecifier)[];
export type paginatedBookmarksFieldPolicy = {
  bookmarks?: FieldPolicy<any> | FieldReadFunction<any>;
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | 'bookmark'
  | 'currentUser'
  | 'currentUserBookmarks'
  | 'currentUserPages'
  | 'currentUserUnreadBookmarks'
  | 'page'
  | 'search'
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  bookmark?: FieldPolicy<any> | FieldReadFunction<any>;
  currentUser?: FieldPolicy<any> | FieldReadFunction<any>;
  currentUserBookmarks?: FieldPolicy<any> | FieldReadFunction<any>;
  currentUserPages?: FieldPolicy<any> | FieldReadFunction<any>;
  currentUserUnreadBookmarks?: FieldPolicy<any> | FieldReadFunction<any>;
  page?: FieldPolicy<any> | FieldReadFunction<any>;
  search?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UploadedFileResponseKeySpecifier = (
  | 'encoding'
  | 'filename'
  | 'mimetype'
  | 'url'
  | UploadedFileResponseKeySpecifier
)[];
export type UploadedFileResponseFieldPolicy = {
  encoding?: FieldPolicy<any> | FieldReadFunction<any>;
  filename?: FieldPolicy<any> | FieldReadFunction<any>;
  mimetype?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = ('email' | 'id' | UserKeySpecifier)[];
export type UserFieldPolicy = {
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  Bookmark?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | BookmarkKeySpecifier | (() => undefined | BookmarkKeySpecifier);
    fields?: BookmarkFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  Page?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PageKeySpecifier | (() => undefined | PageKeySpecifier);
    fields?: PageFieldPolicy;
  };
  paginatedBookmarks?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | paginatedBookmarksKeySpecifier | (() => undefined | paginatedBookmarksKeySpecifier);
    fields?: paginatedBookmarksFieldPolicy;
  };
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  UploadedFileResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UploadedFileResponseKeySpecifier | (() => undefined | UploadedFileResponseKeySpecifier);
    fields?: UploadedFileResponseFieldPolicy;
  };
  User?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
    fields?: UserFieldPolicy;
  };
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
