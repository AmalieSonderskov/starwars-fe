/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** A user */
export type AuthInputObject = {
  __typename?: 'AuthInputObject';
  id?: Maybe<Scalars['ID']['output']>;
  items?: Maybe<Array<Item>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type AuthObject = {
  __typename?: 'AuthObject';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<AuthInputObject>;
};

/** An item for sale */
export type Item = {
  __typename?: 'Item';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user?: Maybe<AuthInputObject>;
};

export type ItemInput = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  type: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem?: Maybe<Item>;
  createUser?: Maybe<AuthInputObject>;
  login?: Maybe<AuthObject>;
  updateItem?: Maybe<Item>;
};


export type MutationCreateItemArgs = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  type: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationCreateUserArgs = {
  name: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  username: Scalars['String']['input'];
};


export type MutationUpdateItemArgs = {
  item: ItemInput;
};

export type Query = {
  __typename?: 'Query';
  item?: Maybe<Item>;
  items?: Maybe<Array<Item>>;
  users?: Maybe<Array<AuthInputObject>>;
};


export type QueryItemArgs = {
  id: Scalars['Int']['input'];
};

export type CreateItemMutationVariables = Exact<{
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem?: { __typename?: 'Item', id?: string | null, name?: string | null, type?: string | null, price?: number | null, description?: string | null, user?: { __typename?: 'AuthInputObject', id?: string | null, name?: string | null } | null } | null };

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = { __typename?: 'Query', items?: Array<{ __typename?: 'Item', id?: string | null, name?: string | null, type?: string | null, price?: number | null, description?: string | null }> | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthObject', token?: string | null, user?: { __typename?: 'AuthInputObject', id?: string | null, name?: string | null } | null } | null };

export type ItemQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ItemQuery = { __typename?: 'Query', item?: { __typename?: 'Item', id?: string | null, name?: string | null, type?: string | null, price?: number | null, description?: string | null } | null };

export type UpdateItemMutationVariables = Exact<{
  item: ItemInput;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem?: { __typename?: 'Item', id?: string | null, name?: string | null, type?: string | null, price?: number | null, description?: string | null } | null };


export const CreateItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"price"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"price"},"value":{"kind":"Variable","name":{"kind":"Name","value":"price"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateItemMutation, CreateItemMutationVariables>;
export const ItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<ItemsQuery, ItemsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"item"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<ItemQuery, ItemQueryVariables>;
export const UpdateItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"item"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateItemMutation, UpdateItemMutationVariables>;