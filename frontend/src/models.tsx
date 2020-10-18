import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type gqlBookmark = {
  __typename?: 'Bookmark';
  id: Scalars['ID'];
  url: Scalars['String'];
  name: Scalars['String'];
  read: Scalars['Boolean'];
  pages: Array<gqlPage>;
};

export type gqlBookmarkNullablePageInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type gqlCreateBookmarkInput = {
  url: Scalars['String'];
  name: Scalars['String'];
  pageIds?: Maybe<Array<gqlBookmarkNullablePageInput>>;
};

export type gqlCreatePageInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  bookmarkIds?: Maybe<Array<Scalars['ID']>>;
};

export type gqlMutation = {
  __typename?: 'Mutation';
  createBookmark: gqlBookmark;
  updateBookmark: gqlBookmark;
  deleteBookmark: Scalars['ID'];
  createPage: gqlPage;
  updatePage: gqlPage;
  deletePage: Scalars['ID'];
};

export type gqlMutationCreateBookmarkArgs = {
  params: gqlCreateBookmarkInput;
};

export type gqlMutationUpdateBookmarkArgs = {
  params: gqlUpdateBookmarkInput;
};

export type gqlMutationDeleteBookmarkArgs = {
  id: Scalars['ID'];
};

export type gqlMutationCreatePageArgs = {
  params: gqlCreatePageInput;
};

export type gqlMutationUpdatePageArgs = {
  params: gqlUpdatePageInput;
};

export type gqlMutationDeletePageArgs = {
  id: Scalars['ID'];
};

export type gqlPage = {
  __typename?: 'Page';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  content: Scalars['String'];
  bookmarks: Array<gqlBookmark>;
  bookmarksCount: Scalars['Int'];
};

export type gqlPaginatedBookmarks = {
  __typename?: 'paginatedBookmarks';
  cursor?: Maybe<Scalars['String']>;
  bookmarks: Array<gqlBookmark>;
};

export type gqlQuery = {
  __typename?: 'Query';
  currentUserBookmarks: gqlPaginatedBookmarks;
  currentUserUnreadBookmarks: gqlPaginatedBookmarks;
  bookmark: gqlBookmark;
  currentUserPages: Array<gqlPage>;
  page: gqlPage;
  currentUser: gqlUser;
};

export type gqlQueryCurrentUserBookmarksArgs = {
  cursor?: Maybe<Scalars['String']>;
};

export type gqlQueryCurrentUserUnreadBookmarksArgs = {
  cursor?: Maybe<Scalars['String']>;
};

export type gqlQueryBookmarkArgs = {
  id: Scalars['ID'];
};

export type gqlQueryCurrentUserPagesArgs = {
  cursor?: Maybe<Scalars['String']>;
};

export type gqlQueryPageArgs = {
  id: Scalars['ID'];
};

export type gqlUpdateBookmarkInput = {
  id: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  read?: Maybe<Scalars['Boolean']>;
  pageIds?: Maybe<Array<gqlBookmarkNullablePageInput>>;
};

export type gqlUpdatePageInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type gqlUser = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
};

export type gqlBookmarkQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type gqlBookmarkQuery = { __typename?: 'Query' } & {
  bookmark: { __typename?: 'Bookmark' } & Pick<gqlBookmark, 'id' | 'url' | 'name'> & {
      pages: Array<{ __typename?: 'Page' } & Pick<gqlPage, 'id' | 'name' | 'description' | 'content'>>;
    };
};

export type gqlCreateBookmarkMutationVariables = Exact<{
  params: gqlCreateBookmarkInput;
}>;

export type gqlCreateBookmarkMutation = { __typename?: 'Mutation' } & {
  createBookmark: { __typename?: 'Bookmark' } & Pick<gqlBookmark, 'id'>;
};

export type gqlCreatePageMutationVariables = Exact<{
  params: gqlCreatePageInput;
}>;

export type gqlCreatePageMutation = { __typename?: 'Mutation' } & {
  createPage: { __typename?: 'Page' } & Pick<gqlPage, 'id'>;
};

export type gqlCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type gqlCurrentUserQuery = { __typename?: 'Query' } & {
  currentUser: { __typename?: 'User' } & Pick<gqlUser, 'id' | 'email'>;
};

export type gqlCurrentUserBookmarkIdsQueryVariables = Exact<{ [key: string]: never }>;

export type gqlCurrentUserBookmarkIdsQuery = { __typename?: 'Query' } & {
  currentUserBookmarks: { __typename?: 'paginatedBookmarks' } & Pick<gqlPaginatedBookmarks, 'cursor'> & {
      bookmarks: Array<{ __typename?: 'Bookmark' } & Pick<gqlBookmark, 'id'>>;
    };
};

export type gqlDeleteBookmarkMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type gqlDeleteBookmarkMutation = { __typename?: 'Mutation' } & Pick<gqlMutation, 'deleteBookmark'>;

export type gqlGetAllPagesQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
}>;

export type gqlGetAllPagesQuery = { __typename?: 'Query' } & {
  currentUserPages: Array<{ __typename?: 'Page' } & Pick<gqlPage, 'id' | 'name' | 'bookmarksCount'>>;
};

export type gqlPageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type gqlPageQuery = { __typename?: 'Query' } & {
  page: { __typename?: 'Page' } & gqlReadOnlyPageFragmentFragment;
};

export type gqlUpdatePageMutationVariables = Exact<{
  params: gqlUpdatePageInput;
}>;

export type gqlUpdatePageMutation = { __typename?: 'Mutation' } & {
  updatePage: { __typename?: 'Page' } & Pick<gqlPage, 'id' | 'name' | 'description' | 'content'>;
};

export type gqlAllBookmarksQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
}>;

export type gqlAllBookmarksQuery = { __typename?: 'Query' } & {
  currentUserBookmarks: { __typename?: 'paginatedBookmarks' } & Pick<gqlPaginatedBookmarks, 'cursor'> & {
      bookmarks: Array<{ __typename?: 'Bookmark' } & gqlBookmarksFragmentFragment>;
    };
};

export type gqlBookmarkFragmentFragment = { __typename?: 'Bookmark' } & Pick<gqlBookmark, 'id' | 'url' | 'name'>;

export type gqlBookmarksFragmentFragment = { __typename?: 'Bookmark' } & gqlBookmarkFragmentFragment;

export type gqlGetBookmarkQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type gqlGetBookmarkQuery = { __typename?: 'Query' } & {
  bookmark: { __typename?: 'Bookmark' } & Pick<gqlBookmark, 'id' | 'url' | 'name' | 'read'> & {
      pages: Array<{ __typename?: 'Page' } & Pick<gqlPage, 'id' | 'name' | 'description' | 'content'>>;
    };
};

export type gqlUpdateBookmarkMutationVariables = Exact<{
  params: gqlUpdateBookmarkInput;
}>;

export type gqlUpdateBookmarkMutation = { __typename?: 'Mutation' } & {
  updateBookmark: { __typename?: 'Bookmark' } & Pick<gqlBookmark, 'id' | 'url' | 'name' | 'read'> & {
      pages: Array<{ __typename?: 'Page' } & Pick<gqlPage, 'id' | 'name' | 'description' | 'content'>>;
    };
};

export type gqlReadOnlyPageFragmentFragment = { __typename?: 'Page' } & Pick<
  gqlPage,
  'id' | 'name' | 'description' | 'content'
> & { bookmarks: Array<{ __typename?: 'Bookmark' } & gqlBookmarksFragmentFragment> };

export type gqlUnreadBookmarksQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
}>;

export type gqlUnreadBookmarksQuery = { __typename?: 'Query' } & {
  currentUserUnreadBookmarks: { __typename?: 'paginatedBookmarks' } & Pick<gqlPaginatedBookmarks, 'cursor'> & {
      bookmarks: Array<{ __typename?: 'Bookmark' } & gqlBookmarksFragmentFragment>;
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
export const BookmarkDocument = /*#__PURE__*/ gql`
  query bookmark($id: ID!) {
    bookmark(id: $id) {
      id
      url
      name
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
 * __useBookmarkQuery__
 *
 * To run a query within a React component, call `useBookmarkQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookmarkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookmarkQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBookmarkQuery(baseOptions?: Apollo.QueryHookOptions<gqlBookmarkQuery, gqlBookmarkQueryVariables>) {
  return Apollo.useQuery<gqlBookmarkQuery, gqlBookmarkQueryVariables>(BookmarkDocument, baseOptions);
}
export function useBookmarkLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<gqlBookmarkQuery, gqlBookmarkQueryVariables>,
) {
  return Apollo.useLazyQuery<gqlBookmarkQuery, gqlBookmarkQueryVariables>(BookmarkDocument, baseOptions);
}
export type BookmarkQueryHookResult = ReturnType<typeof useBookmarkQuery>;
export type BookmarkLazyQueryHookResult = ReturnType<typeof useBookmarkLazyQuery>;
export type BookmarkQueryResult = Apollo.QueryResult<gqlBookmarkQuery, gqlBookmarkQueryVariables>;
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
  return Apollo.useMutation<gqlCreateBookmarkMutation, gqlCreateBookmarkMutationVariables>(
    CreateBookmarkDocument,
    baseOptions,
  );
}
export type CreateBookmarkMutationHookResult = ReturnType<typeof useCreateBookmarkMutation>;
export type CreateBookmarkMutationResult = Apollo.MutationResult<gqlCreateBookmarkMutation>;
export type CreateBookmarkMutationOptions = Apollo.BaseMutationOptions<
  gqlCreateBookmarkMutation,
  gqlCreateBookmarkMutationVariables
>;
export const CreatePageDocument = /*#__PURE__*/ gql`
  mutation createPage($params: CreatePageInput!) {
    createPage(params: $params) {
      id
    }
  }
`;

/**
 * __useCreatePageMutation__
 *
 * To run a mutation, you first call `useCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPageMutation, { data, loading, error }] = useCreatePageMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useCreatePageMutation(
  baseOptions?: Apollo.MutationHookOptions<gqlCreatePageMutation, gqlCreatePageMutationVariables>,
) {
  return Apollo.useMutation<gqlCreatePageMutation, gqlCreatePageMutationVariables>(CreatePageDocument, baseOptions);
}
export type CreatePageMutationHookResult = ReturnType<typeof useCreatePageMutation>;
export type CreatePageMutationResult = Apollo.MutationResult<gqlCreatePageMutation>;
export type CreatePageMutationOptions = Apollo.BaseMutationOptions<
  gqlCreatePageMutation,
  gqlCreatePageMutationVariables
>;
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
  return Apollo.useQuery<gqlCurrentUserQuery, gqlCurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<gqlCurrentUserQuery, gqlCurrentUserQueryVariables>,
) {
  return Apollo.useLazyQuery<gqlCurrentUserQuery, gqlCurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<gqlCurrentUserQuery, gqlCurrentUserQueryVariables>;
export const CurrentUserBookmarkIdsDocument = /*#__PURE__*/ gql`
  query currentUserBookmarkIds {
    currentUserBookmarks {
      cursor
      bookmarks {
        id
      }
    }
  }
`;

/**
 * __useCurrentUserBookmarkIdsQuery__
 *
 * To run a query within a React component, call `useCurrentUserBookmarkIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserBookmarkIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserBookmarkIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserBookmarkIdsQuery(
  baseOptions?: Apollo.QueryHookOptions<gqlCurrentUserBookmarkIdsQuery, gqlCurrentUserBookmarkIdsQueryVariables>,
) {
  return Apollo.useQuery<gqlCurrentUserBookmarkIdsQuery, gqlCurrentUserBookmarkIdsQueryVariables>(
    CurrentUserBookmarkIdsDocument,
    baseOptions,
  );
}
export function useCurrentUserBookmarkIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<gqlCurrentUserBookmarkIdsQuery, gqlCurrentUserBookmarkIdsQueryVariables>,
) {
  return Apollo.useLazyQuery<gqlCurrentUserBookmarkIdsQuery, gqlCurrentUserBookmarkIdsQueryVariables>(
    CurrentUserBookmarkIdsDocument,
    baseOptions,
  );
}
export type CurrentUserBookmarkIdsQueryHookResult = ReturnType<typeof useCurrentUserBookmarkIdsQuery>;
export type CurrentUserBookmarkIdsLazyQueryHookResult = ReturnType<typeof useCurrentUserBookmarkIdsLazyQuery>;
export type CurrentUserBookmarkIdsQueryResult = Apollo.QueryResult<
  gqlCurrentUserBookmarkIdsQuery,
  gqlCurrentUserBookmarkIdsQueryVariables
>;
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
  return Apollo.useMutation<gqlDeleteBookmarkMutation, gqlDeleteBookmarkMutationVariables>(
    DeleteBookmarkDocument,
    baseOptions,
  );
}
export type DeleteBookmarkMutationHookResult = ReturnType<typeof useDeleteBookmarkMutation>;
export type DeleteBookmarkMutationResult = Apollo.MutationResult<gqlDeleteBookmarkMutation>;
export type DeleteBookmarkMutationOptions = Apollo.BaseMutationOptions<
  gqlDeleteBookmarkMutation,
  gqlDeleteBookmarkMutationVariables
>;
export const GetAllPagesDocument = /*#__PURE__*/ gql`
  query getAllPages($cursor: String) {
    currentUserPages(cursor: $cursor) {
      id
      name
      bookmarksCount
    }
  }
`;

/**
 * __useGetAllPagesQuery__
 *
 * To run a query within a React component, call `useGetAllPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPagesQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetAllPagesQuery(
  baseOptions?: Apollo.QueryHookOptions<gqlGetAllPagesQuery, gqlGetAllPagesQueryVariables>,
) {
  return Apollo.useQuery<gqlGetAllPagesQuery, gqlGetAllPagesQueryVariables>(GetAllPagesDocument, baseOptions);
}
export function useGetAllPagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<gqlGetAllPagesQuery, gqlGetAllPagesQueryVariables>,
) {
  return Apollo.useLazyQuery<gqlGetAllPagesQuery, gqlGetAllPagesQueryVariables>(GetAllPagesDocument, baseOptions);
}
export type GetAllPagesQueryHookResult = ReturnType<typeof useGetAllPagesQuery>;
export type GetAllPagesLazyQueryHookResult = ReturnType<typeof useGetAllPagesLazyQuery>;
export type GetAllPagesQueryResult = Apollo.QueryResult<gqlGetAllPagesQuery, gqlGetAllPagesQueryVariables>;
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
export function usePageQuery(baseOptions?: Apollo.QueryHookOptions<gqlPageQuery, gqlPageQueryVariables>) {
  return Apollo.useQuery<gqlPageQuery, gqlPageQueryVariables>(PageDocument, baseOptions);
}
export function usePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<gqlPageQuery, gqlPageQueryVariables>) {
  return Apollo.useLazyQuery<gqlPageQuery, gqlPageQueryVariables>(PageDocument, baseOptions);
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
  return Apollo.useMutation<gqlUpdatePageMutation, gqlUpdatePageMutationVariables>(UpdatePageDocument, baseOptions);
}
export type UpdatePageMutationHookResult = ReturnType<typeof useUpdatePageMutation>;
export type UpdatePageMutationResult = Apollo.MutationResult<gqlUpdatePageMutation>;
export type UpdatePageMutationOptions = Apollo.BaseMutationOptions<
  gqlUpdatePageMutation,
  gqlUpdatePageMutationVariables
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
  return Apollo.useQuery<gqlAllBookmarksQuery, gqlAllBookmarksQueryVariables>(AllBookmarksDocument, baseOptions);
}
export function useAllBookmarksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<gqlAllBookmarksQuery, gqlAllBookmarksQueryVariables>,
) {
  return Apollo.useLazyQuery<gqlAllBookmarksQuery, gqlAllBookmarksQueryVariables>(AllBookmarksDocument, baseOptions);
}
export type AllBookmarksQueryHookResult = ReturnType<typeof useAllBookmarksQuery>;
export type AllBookmarksLazyQueryHookResult = ReturnType<typeof useAllBookmarksLazyQuery>;
export type AllBookmarksQueryResult = Apollo.QueryResult<gqlAllBookmarksQuery, gqlAllBookmarksQueryVariables>;
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
  baseOptions?: Apollo.QueryHookOptions<gqlGetBookmarkQuery, gqlGetBookmarkQueryVariables>,
) {
  return Apollo.useQuery<gqlGetBookmarkQuery, gqlGetBookmarkQueryVariables>(GetBookmarkDocument, baseOptions);
}
export function useGetBookmarkLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<gqlGetBookmarkQuery, gqlGetBookmarkQueryVariables>,
) {
  return Apollo.useLazyQuery<gqlGetBookmarkQuery, gqlGetBookmarkQueryVariables>(GetBookmarkDocument, baseOptions);
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
  return Apollo.useMutation<gqlUpdateBookmarkMutation, gqlUpdateBookmarkMutationVariables>(
    UpdateBookmarkDocument,
    baseOptions,
  );
}
export type UpdateBookmarkMutationHookResult = ReturnType<typeof useUpdateBookmarkMutation>;
export type UpdateBookmarkMutationResult = Apollo.MutationResult<gqlUpdateBookmarkMutation>;
export type UpdateBookmarkMutationOptions = Apollo.BaseMutationOptions<
  gqlUpdateBookmarkMutation,
  gqlUpdateBookmarkMutationVariables
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
  return Apollo.useQuery<gqlUnreadBookmarksQuery, gqlUnreadBookmarksQueryVariables>(
    UnreadBookmarksDocument,
    baseOptions,
  );
}
export function useUnreadBookmarksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<gqlUnreadBookmarksQuery, gqlUnreadBookmarksQueryVariables>,
) {
  return Apollo.useLazyQuery<gqlUnreadBookmarksQuery, gqlUnreadBookmarksQueryVariables>(
    UnreadBookmarksDocument,
    baseOptions,
  );
}
export type UnreadBookmarksQueryHookResult = ReturnType<typeof useUnreadBookmarksQuery>;
export type UnreadBookmarksLazyQueryHookResult = ReturnType<typeof useUnreadBookmarksLazyQuery>;
export type UnreadBookmarksQueryResult = Apollo.QueryResult<gqlUnreadBookmarksQuery, gqlUnreadBookmarksQueryVariables>;
