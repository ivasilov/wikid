import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
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
};

export type gqlPaginatedBookmarks = {
  __typename?: 'paginatedBookmarks';
  cursor?: Maybe<Scalars['String']>;
  bookmarks: Array<gqlBookmark>;
};

export type gqlQuery = {
  __typename?: 'Query';
  currentUserBookmarks: gqlPaginatedBookmarks;
  bookmark: gqlBookmark;
  currentUserPages: Array<gqlPage>;
  page: gqlPage;
  currentUser: gqlUser;
};

export type gqlQueryCurrentUserBookmarksArgs = {
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

export type gqlBookmarkQueryVariables = {
  id: Scalars['ID'];
};

export type gqlBookmarkQuery = { __typename?: 'Query' } & {
  bookmark: { __typename?: 'Bookmark' } & Pick<gqlBookmark, 'id' | 'url' | 'name'> & {
      pages: Array<{ __typename?: 'Page' } & Pick<gqlPage, 'id' | 'name' | 'description' | 'content'>>;
    };
};

export type gqlCreateBookmarkMutationVariables = {
  params: gqlCreateBookmarkInput;
};

export type gqlCreateBookmarkMutation = { __typename?: 'Mutation' } & {
  createBookmark: { __typename?: 'Bookmark' } & Pick<gqlBookmark, 'id'>;
};

export type gqlCreatePageMutationVariables = {
  params: gqlCreatePageInput;
};

export type gqlCreatePageMutation = { __typename?: 'Mutation' } & {
  createPage: { __typename?: 'Page' } & Pick<gqlPage, 'id'>;
};

export type gqlCurrentUserQueryVariables = {};

export type gqlCurrentUserQuery = { __typename?: 'Query' } & {
  currentUser: { __typename?: 'User' } & Pick<gqlUser, 'id' | 'email'>;
};

export type gqlCurrentUserBookmarkIdsQueryVariables = {};

export type gqlCurrentUserBookmarkIdsQuery = { __typename?: 'Query' } & {
  currentUserBookmarks: { __typename?: 'paginatedBookmarks' } & Pick<gqlPaginatedBookmarks, 'cursor'> & {
      bookmarks: Array<{ __typename?: 'Bookmark' } & Pick<gqlBookmark, 'id'>>;
    };
};

export type gqlDeleteBookmarkMutationVariables = {
  id: Scalars['ID'];
};

export type gqlDeleteBookmarkMutation = { __typename?: 'Mutation' } & Pick<gqlMutation, 'deleteBookmark'>;

export type gqlGetAllPagesQueryVariables = {
  cursor?: Maybe<Scalars['String']>;
};

export type gqlGetAllPagesQuery = { __typename?: 'Query' } & {
  currentUserPages: Array<
    { __typename?: 'Page' } & Pick<gqlPage, 'id' | 'name'> & {
        bookmarks: Array<{ __typename?: 'Bookmark' } & Pick<gqlBookmark, 'id'>>;
      }
  >;
};

export type gqlPageQueryVariables = {
  id: Scalars['ID'];
};

export type gqlPageQuery = { __typename?: 'Query' } & {
  page: { __typename?: 'Page' } & gqlReadOnlyPageFragmentFragment;
};

export type gqlUpdateBookmarkMutationVariables = {
  params: gqlUpdateBookmarkInput;
};

export type gqlUpdateBookmarkMutation = { __typename?: 'Mutation' } & {
  updateBookmark: { __typename?: 'Bookmark' } & Pick<gqlBookmark, 'id' | 'url' | 'name'> & {
      pages: Array<{ __typename?: 'Page' } & Pick<gqlPage, 'id' | 'name' | 'description' | 'content'>>;
    };
};

export type gqlUpdatePageMutationVariables = {
  params: gqlUpdatePageInput;
};

export type gqlUpdatePageMutation = { __typename?: 'Mutation' } & {
  updatePage: { __typename?: 'Page' } & Pick<gqlPage, 'id' | 'name' | 'description' | 'content'>;
};

export type gqlAllBookmarksQueryVariables = {
  cursor?: Maybe<Scalars['String']>;
};

export type gqlAllBookmarksQuery = { __typename?: 'Query' } & {
  currentUserBookmarks: { __typename?: 'paginatedBookmarks' } & Pick<gqlPaginatedBookmarks, 'cursor'> & {
      bookmarks: Array<{ __typename?: 'Bookmark' } & gqlBookmarksFragmentFragment>;
    };
};

export type gqlBookmarkFragmentFragment = { __typename?: 'Bookmark' } & Pick<gqlBookmark, 'id' | 'url' | 'name'> & {
    pages: Array<{ __typename?: 'Page' } & Pick<gqlPage, 'id' | 'name'>>;
  };

export type gqlBookmarksFragmentFragment = { __typename?: 'Bookmark' } & gqlBookmarkFragmentFragment;

export type gqlReadOnlyPageFragmentFragment = { __typename?: 'Page' } & Pick<
  gqlPage,
  'id' | 'name' | 'description' | 'content'
> & { bookmarks: Array<{ __typename?: 'Bookmark' } & gqlBookmarksFragmentFragment> };

export const BookmarkFragmentFragmentDoc = gql`
  fragment BookmarkFragment on Bookmark {
    id
    url
    name
    pages {
      id
      name
    }
  }
`;
export const BookmarksFragmentFragmentDoc = gql`
  fragment BookmarksFragment on Bookmark {
    ...BookmarkFragment
  }
  ${BookmarkFragmentFragmentDoc}
`;
export const ReadOnlyPageFragmentFragmentDoc = gql`
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
export const BookmarkDocument = gql`
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
export function useBookmarkQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<gqlBookmarkQuery, gqlBookmarkQueryVariables>,
) {
  return ApolloReactHooks.useQuery<gqlBookmarkQuery, gqlBookmarkQueryVariables>(BookmarkDocument, baseOptions);
}
export function useBookmarkLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<gqlBookmarkQuery, gqlBookmarkQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<gqlBookmarkQuery, gqlBookmarkQueryVariables>(BookmarkDocument, baseOptions);
}
export type BookmarkQueryHookResult = ReturnType<typeof useBookmarkQuery>;
export type BookmarkLazyQueryHookResult = ReturnType<typeof useBookmarkLazyQuery>;
export type BookmarkQueryResult = ApolloReactCommon.QueryResult<gqlBookmarkQuery, gqlBookmarkQueryVariables>;
export const CreateBookmarkDocument = gql`
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<gqlCreateBookmarkMutation, gqlCreateBookmarkMutationVariables>,
) {
  return ApolloReactHooks.useMutation<gqlCreateBookmarkMutation, gqlCreateBookmarkMutationVariables>(
    CreateBookmarkDocument,
    baseOptions,
  );
}
export type CreateBookmarkMutationHookResult = ReturnType<typeof useCreateBookmarkMutation>;
export type CreateBookmarkMutationResult = ApolloReactCommon.MutationResult<gqlCreateBookmarkMutation>;
export type CreateBookmarkMutationOptions = ApolloReactCommon.BaseMutationOptions<
  gqlCreateBookmarkMutation,
  gqlCreateBookmarkMutationVariables
>;
export const CreatePageDocument = gql`
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<gqlCreatePageMutation, gqlCreatePageMutationVariables>,
) {
  return ApolloReactHooks.useMutation<gqlCreatePageMutation, gqlCreatePageMutationVariables>(
    CreatePageDocument,
    baseOptions,
  );
}
export type CreatePageMutationHookResult = ReturnType<typeof useCreatePageMutation>;
export type CreatePageMutationResult = ApolloReactCommon.MutationResult<gqlCreatePageMutation>;
export type CreatePageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  gqlCreatePageMutation,
  gqlCreatePageMutationVariables
>;
export const CurrentUserDocument = gql`
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<gqlCurrentUserQuery, gqlCurrentUserQueryVariables>,
) {
  return ApolloReactHooks.useQuery<gqlCurrentUserQuery, gqlCurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
}
export function useCurrentUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<gqlCurrentUserQuery, gqlCurrentUserQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<gqlCurrentUserQuery, gqlCurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions,
  );
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<gqlCurrentUserQuery, gqlCurrentUserQueryVariables>;
export const CurrentUserBookmarkIdsDocument = gql`
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    gqlCurrentUserBookmarkIdsQuery,
    gqlCurrentUserBookmarkIdsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<gqlCurrentUserBookmarkIdsQuery, gqlCurrentUserBookmarkIdsQueryVariables>(
    CurrentUserBookmarkIdsDocument,
    baseOptions,
  );
}
export function useCurrentUserBookmarkIdsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    gqlCurrentUserBookmarkIdsQuery,
    gqlCurrentUserBookmarkIdsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<gqlCurrentUserBookmarkIdsQuery, gqlCurrentUserBookmarkIdsQueryVariables>(
    CurrentUserBookmarkIdsDocument,
    baseOptions,
  );
}
export type CurrentUserBookmarkIdsQueryHookResult = ReturnType<typeof useCurrentUserBookmarkIdsQuery>;
export type CurrentUserBookmarkIdsLazyQueryHookResult = ReturnType<typeof useCurrentUserBookmarkIdsLazyQuery>;
export type CurrentUserBookmarkIdsQueryResult = ApolloReactCommon.QueryResult<
  gqlCurrentUserBookmarkIdsQuery,
  gqlCurrentUserBookmarkIdsQueryVariables
>;
export const DeleteBookmarkDocument = gql`
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<gqlDeleteBookmarkMutation, gqlDeleteBookmarkMutationVariables>,
) {
  return ApolloReactHooks.useMutation<gqlDeleteBookmarkMutation, gqlDeleteBookmarkMutationVariables>(
    DeleteBookmarkDocument,
    baseOptions,
  );
}
export type DeleteBookmarkMutationHookResult = ReturnType<typeof useDeleteBookmarkMutation>;
export type DeleteBookmarkMutationResult = ApolloReactCommon.MutationResult<gqlDeleteBookmarkMutation>;
export type DeleteBookmarkMutationOptions = ApolloReactCommon.BaseMutationOptions<
  gqlDeleteBookmarkMutation,
  gqlDeleteBookmarkMutationVariables
>;
export const GetAllPagesDocument = gql`
  query getAllPages($cursor: String) {
    currentUserPages(cursor: $cursor) {
      id
      name
      bookmarks {
        id
      }
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<gqlGetAllPagesQuery, gqlGetAllPagesQueryVariables>,
) {
  return ApolloReactHooks.useQuery<gqlGetAllPagesQuery, gqlGetAllPagesQueryVariables>(GetAllPagesDocument, baseOptions);
}
export function useGetAllPagesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<gqlGetAllPagesQuery, gqlGetAllPagesQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<gqlGetAllPagesQuery, gqlGetAllPagesQueryVariables>(
    GetAllPagesDocument,
    baseOptions,
  );
}
export type GetAllPagesQueryHookResult = ReturnType<typeof useGetAllPagesQuery>;
export type GetAllPagesLazyQueryHookResult = ReturnType<typeof useGetAllPagesLazyQuery>;
export type GetAllPagesQueryResult = ApolloReactCommon.QueryResult<gqlGetAllPagesQuery, gqlGetAllPagesQueryVariables>;
export const PageDocument = gql`
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
export function usePageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<gqlPageQuery, gqlPageQueryVariables>) {
  return ApolloReactHooks.useQuery<gqlPageQuery, gqlPageQueryVariables>(PageDocument, baseOptions);
}
export function usePageLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<gqlPageQuery, gqlPageQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<gqlPageQuery, gqlPageQueryVariables>(PageDocument, baseOptions);
}
export type PageQueryHookResult = ReturnType<typeof usePageQuery>;
export type PageLazyQueryHookResult = ReturnType<typeof usePageLazyQuery>;
export type PageQueryResult = ApolloReactCommon.QueryResult<gqlPageQuery, gqlPageQueryVariables>;
export const UpdateBookmarkDocument = gql`
  mutation updateBookmark($params: UpdateBookmarkInput!) {
    updateBookmark(params: $params) {
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<gqlUpdateBookmarkMutation, gqlUpdateBookmarkMutationVariables>,
) {
  return ApolloReactHooks.useMutation<gqlUpdateBookmarkMutation, gqlUpdateBookmarkMutationVariables>(
    UpdateBookmarkDocument,
    baseOptions,
  );
}
export type UpdateBookmarkMutationHookResult = ReturnType<typeof useUpdateBookmarkMutation>;
export type UpdateBookmarkMutationResult = ApolloReactCommon.MutationResult<gqlUpdateBookmarkMutation>;
export type UpdateBookmarkMutationOptions = ApolloReactCommon.BaseMutationOptions<
  gqlUpdateBookmarkMutation,
  gqlUpdateBookmarkMutationVariables
>;
export const UpdatePageDocument = gql`
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<gqlUpdatePageMutation, gqlUpdatePageMutationVariables>,
) {
  return ApolloReactHooks.useMutation<gqlUpdatePageMutation, gqlUpdatePageMutationVariables>(
    UpdatePageDocument,
    baseOptions,
  );
}
export type UpdatePageMutationHookResult = ReturnType<typeof useUpdatePageMutation>;
export type UpdatePageMutationResult = ApolloReactCommon.MutationResult<gqlUpdatePageMutation>;
export type UpdatePageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  gqlUpdatePageMutation,
  gqlUpdatePageMutationVariables
>;
export const AllBookmarksDocument = gql`
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<gqlAllBookmarksQuery, gqlAllBookmarksQueryVariables>,
) {
  return ApolloReactHooks.useQuery<gqlAllBookmarksQuery, gqlAllBookmarksQueryVariables>(
    AllBookmarksDocument,
    baseOptions,
  );
}
export function useAllBookmarksLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<gqlAllBookmarksQuery, gqlAllBookmarksQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<gqlAllBookmarksQuery, gqlAllBookmarksQueryVariables>(
    AllBookmarksDocument,
    baseOptions,
  );
}
export type AllBookmarksQueryHookResult = ReturnType<typeof useAllBookmarksQuery>;
export type AllBookmarksLazyQueryHookResult = ReturnType<typeof useAllBookmarksLazyQuery>;
export type AllBookmarksQueryResult = ApolloReactCommon.QueryResult<
  gqlAllBookmarksQuery,
  gqlAllBookmarksQueryVariables
>;
