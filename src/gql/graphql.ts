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
  id?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Item>>;
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  wallet?: Maybe<Scalars['Float']['output']>;
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
  forSale?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user?: Maybe<AuthInputObject>;
};

export type ItemInput = {
  description: Scalars['String']['input'];
  forSale: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  type: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCredits?: Maybe<Scalars['Float']['output']>;
  createItem?: Maybe<Item>;
  createPurchase?: Maybe<Purchase>;
  login?: Maybe<AuthObject>;
  updateItem?: Maybe<Item>;
  updateProfilePicture?: Maybe<Scalars['String']['output']>;
};


export type MutationAddCreditsArgs = {
  creditChange: Scalars['Float']['input'];
};


export type MutationCreateItemArgs = {
  item: ItemInput;
};


export type MutationCreatePurchaseArgs = {
  buyerId: Scalars['Int']['input'];
  itemInputs: Array<Scalars['Int']['input']>;
};


export type MutationLoginArgs = {
  username: Scalars['String']['input'];
};


export type MutationUpdateItemArgs = {
  item: ItemInput;
  itemId: Scalars['Int']['input'];
};


export type MutationUpdateProfilePictureArgs = {
  picture: Scalars['String']['input'];
};

/** A record of a purchase */
export type Purchase = {
  __typename?: 'Purchase';
  buyerId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  sales?: Maybe<Array<Sale>>;
  time?: Maybe<Scalars['String']['output']>;
  transactions?: Maybe<Array<Transaction>>;
};

export type Query = {
  __typename?: 'Query';
  item?: Maybe<Item>;
  items?: Maybe<Array<Item>>;
  itemsByUser?: Maybe<Array<Item>>;
  itemsForSale?: Maybe<Array<Item>>;
  purchases?: Maybe<Array<Purchase>>;
  userLoggedIn?: Maybe<AuthInputObject>;
  userPurchase?: Maybe<Array<Purchase>>;
  userSales?: Maybe<Array<Sale>>;
  userTransactions?: Maybe<Array<Transaction>>;
  userWallet?: Maybe<Scalars['Float']['output']>;
  users?: Maybe<Array<AuthInputObject>>;
};


export type QueryItemArgs = {
  id: Scalars['Int']['input'];
};


export type QueryItemsByUserArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryUserPurchaseArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryUserSalesArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryUserTransactionsArgs = {
  userId: Scalars['Int']['input'];
};

/** A sale a user made */
export type Sale = {
  __typename?: 'Sale';
  historicItems?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  purchase?: Maybe<Purchase>;
  seller?: Maybe<AuthInputObject>;
  time?: Maybe<Scalars['String']['output']>;
};

/** A transaction associated with a purchase */
export type Transaction = {
  __typename?: 'Transaction';
  historicItem?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  purchase?: Maybe<Purchase>;
  time?: Maybe<Scalars['String']['output']>;
};

export type GetUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInfoQuery = { __typename?: 'Query', userLoggedIn?: { __typename?: 'AuthInputObject', id?: number | null, name?: string | null, role?: string | null, wallet?: number | null, picture?: string | null } | null };

export type CreateItemMutationVariables = Exact<{
  item: ItemInput;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem?: { __typename?: 'Item', id: number, name?: string | null, type?: string | null, price?: number | null, description?: string | null, forSale?: boolean | null } | null };

export type CreatePurchaseMutationVariables = Exact<{
  buyerId: Scalars['Int']['input'];
  itemInputs: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type CreatePurchaseMutation = { __typename?: 'Mutation', createPurchase?: { __typename?: 'Purchase', id?: string | null, time?: string | null, buyerId?: number | null, transactions?: Array<{ __typename?: 'Transaction', id?: string | null, time?: string | null, historicItem?: string | null }> | null } | null };

export type UpdateProfilePictureMutationVariables = Exact<{
  picture: Scalars['String']['input'];
}>;


export type UpdateProfilePictureMutation = { __typename?: 'Mutation', updateProfilePicture?: string | null };

export type ItemsForSaleQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsForSaleQuery = { __typename?: 'Query', itemsForSale?: Array<{ __typename?: 'Item', id: number, name?: string | null, type?: string | null, price?: number | null, description?: string | null }> | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthObject', token?: string | null, user?: { __typename?: 'AuthInputObject', id?: number | null, name?: string | null, role?: string | null, wallet?: number | null, picture?: string | null } | null } | null };

export type ItemsByUserQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type ItemsByUserQuery = { __typename?: 'Query', itemsByUser?: Array<{ __typename?: 'Item', id: number, name?: string | null, type?: string | null, price?: number | null, description?: string | null, forSale?: boolean | null }> | null };

export type UserPurchaseQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type UserPurchaseQuery = { __typename?: 'Query', userPurchase?: Array<{ __typename?: 'Purchase', id?: string | null, time?: string | null, transactions?: Array<{ __typename?: 'Transaction', id?: string | null, time?: string | null, historicItem?: string | null }> | null }> | null };

export type UserSalesQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type UserSalesQuery = { __typename?: 'Query', userSales?: Array<{ __typename?: 'Sale', id?: string | null, time?: string | null, historicItems?: string | null }> | null };

export type ItemQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ItemQuery = { __typename?: 'Query', item?: { __typename?: 'Item', id: number, name?: string | null, type?: string | null, price?: number | null, description?: string | null } | null };

export type UpdateItemMutationVariables = Exact<{
  item: ItemInput;
  itemId: Scalars['Int']['input'];
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem?: { __typename?: 'Item', id: number, name?: string | null, type?: string | null, price?: number | null, description?: string | null } | null };

export type UserWalletQueryVariables = Exact<{ [key: string]: never; }>;


export type UserWalletQuery = { __typename?: 'Query', userWallet?: number | null };

export type AddCreditsMutationVariables = Exact<{
  creditChange: Scalars['Float']['input'];
}>;


export type AddCreditsMutation = { __typename?: 'Mutation', addCredits?: number | null };


export const GetUserInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userLoggedIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]} as unknown as DocumentNode<GetUserInfoQuery, GetUserInfoQueryVariables>;
export const CreateItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"item"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"forSale"}}]}}]}}]} as unknown as DocumentNode<CreateItemMutation, CreateItemMutationVariables>;
export const CreatePurchaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPurchase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buyerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemInputs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPurchase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"buyerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buyerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemInputs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemInputs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"buyerId"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"historicItem"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePurchaseMutation, CreatePurchaseMutationVariables>;
export const UpdateProfilePictureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProfilePicture"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"picture"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfilePicture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"picture"},"value":{"kind":"Variable","name":{"kind":"Name","value":"picture"}}}]}]}}]} as unknown as DocumentNode<UpdateProfilePictureMutation, UpdateProfilePictureMutationVariables>;
export const ItemsForSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"itemsForSale"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemsForSale"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<ItemsForSaleQuery, ItemsForSaleQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ItemsByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"itemsByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemsByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"forSale"}}]}}]}}]} as unknown as DocumentNode<ItemsByUserQuery, ItemsByUserQueryVariables>;
export const UserPurchaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userPurchase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userPurchase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"historicItem"}}]}}]}}]}}]} as unknown as DocumentNode<UserPurchaseQuery, UserPurchaseQueryVariables>;
export const UserSalesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userSales"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userSales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"historicItems"}}]}}]}}]} as unknown as DocumentNode<UserSalesQuery, UserSalesQueryVariables>;
export const ItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"item"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<ItemQuery, ItemQueryVariables>;
export const UpdateItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"item"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateItemMutation, UpdateItemMutationVariables>;
export const UserWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userWallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userWallet"}}]}}]} as unknown as DocumentNode<UserWalletQuery, UserWalletQueryVariables>;
export const AddCreditsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addCredits"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"creditChange"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCredits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"creditChange"},"value":{"kind":"Variable","name":{"kind":"Name","value":"creditChange"}}}]}]}}]} as unknown as DocumentNode<AddCreditsMutation, AddCreditsMutationVariables>;