/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getUserInfo {\n    userLoggedIn {\n      id\n      name\n      role\n      wallet\n      picture\n    }\n  }\n": types.GetUserInfoDocument,
    "\n  mutation createItem($item: ItemInput!) {\n    createItem(item: $item) {\n      id\n      name\n      type\n      price\n      description\n      forSale\n    }\n  }\n": types.CreateItemDocument,
    "\n  mutation createPurchase($buyerId: Int!, $itemInputs: [Int!]!) {\n    createPurchase(buyerId: $buyerId, itemInputs: $itemInputs) {\n      id\n      time\n      buyerId\n      transactions {\n        id\n        time\n        historicItem\n      }\n    }\n  }\n": types.CreatePurchaseDocument,
    "\n  mutation updateProfilePicture($picture: String!) {\n    updateProfilePicture(picture: $picture) \n    }\n": types.UpdateProfilePictureDocument,
    "\n    query itemsForSale {\n        itemsForSale {\n        id\n        name\n        type\n        price\n        description\n        }\n    }\n    ": types.ItemsForSaleDocument,
    "\n  mutation Login($username: String!) {\n    login(username: $username) {\n      token\n      user {\n        id\n        name\n        role\n        wallet\n        picture\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  query itemsByUser($userId: Int!) {\n    itemsByUser(userId: $userId) {\n      id\n      name\n      type\n      price\n      description\n      forSale\n    }\n  }\n": types.ItemsByUserDocument,
    "\n    query userPurchase($userId: Int!) {\n    userPurchase(userId: $userId) {\n      id\n      time\n      transactions {\n        id\n        time\n        historicItem\n      }\n    }\n    }\n  ": types.UserPurchaseDocument,
    "\n    query userSales($userId: Int!) {\n    userSales(userId: $userId) {\n      id\n      time\n      historicItems\n      }\n    }\n  ": types.UserSalesDocument,
    "\n  query item($id: Int!) {\n    item(id: $id) {\n      id\n      name\n      type\n      price\n      description\n    }\n  }\n": types.ItemDocument,
    "\n  mutation updateItem($item: ItemInput!, $itemId: Int!) {\n    updateItem(item: $item, itemId: $itemId) {\n      id\n      name\n      type\n      price\n      description\n    }\n  }\n": types.UpdateItemDocument,
    "\n    query userWallet {\n        userWallet\n    }\n  ": types.UserWalletDocument,
    "\n  mutation addCredits($creditChange: Float!) {\n    addCredits(creditChange: $creditChange) \n  } ": types.AddCreditsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getUserInfo {\n    userLoggedIn {\n      id\n      name\n      role\n      wallet\n      picture\n    }\n  }\n"): (typeof documents)["\n  query getUserInfo {\n    userLoggedIn {\n      id\n      name\n      role\n      wallet\n      picture\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createItem($item: ItemInput!) {\n    createItem(item: $item) {\n      id\n      name\n      type\n      price\n      description\n      forSale\n    }\n  }\n"): (typeof documents)["\n  mutation createItem($item: ItemInput!) {\n    createItem(item: $item) {\n      id\n      name\n      type\n      price\n      description\n      forSale\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPurchase($buyerId: Int!, $itemInputs: [Int!]!) {\n    createPurchase(buyerId: $buyerId, itemInputs: $itemInputs) {\n      id\n      time\n      buyerId\n      transactions {\n        id\n        time\n        historicItem\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createPurchase($buyerId: Int!, $itemInputs: [Int!]!) {\n    createPurchase(buyerId: $buyerId, itemInputs: $itemInputs) {\n      id\n      time\n      buyerId\n      transactions {\n        id\n        time\n        historicItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateProfilePicture($picture: String!) {\n    updateProfilePicture(picture: $picture) \n    }\n"): (typeof documents)["\n  mutation updateProfilePicture($picture: String!) {\n    updateProfilePicture(picture: $picture) \n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query itemsForSale {\n        itemsForSale {\n        id\n        name\n        type\n        price\n        description\n        }\n    }\n    "): (typeof documents)["\n    query itemsForSale {\n        itemsForSale {\n        id\n        name\n        type\n        price\n        description\n        }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($username: String!) {\n    login(username: $username) {\n      token\n      user {\n        id\n        name\n        role\n        wallet\n        picture\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($username: String!) {\n    login(username: $username) {\n      token\n      user {\n        id\n        name\n        role\n        wallet\n        picture\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query itemsByUser($userId: Int!) {\n    itemsByUser(userId: $userId) {\n      id\n      name\n      type\n      price\n      description\n      forSale\n    }\n  }\n"): (typeof documents)["\n  query itemsByUser($userId: Int!) {\n    itemsByUser(userId: $userId) {\n      id\n      name\n      type\n      price\n      description\n      forSale\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query userPurchase($userId: Int!) {\n    userPurchase(userId: $userId) {\n      id\n      time\n      transactions {\n        id\n        time\n        historicItem\n      }\n    }\n    }\n  "): (typeof documents)["\n    query userPurchase($userId: Int!) {\n    userPurchase(userId: $userId) {\n      id\n      time\n      transactions {\n        id\n        time\n        historicItem\n      }\n    }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query userSales($userId: Int!) {\n    userSales(userId: $userId) {\n      id\n      time\n      historicItems\n      }\n    }\n  "): (typeof documents)["\n    query userSales($userId: Int!) {\n    userSales(userId: $userId) {\n      id\n      time\n      historicItems\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query item($id: Int!) {\n    item(id: $id) {\n      id\n      name\n      type\n      price\n      description\n    }\n  }\n"): (typeof documents)["\n  query item($id: Int!) {\n    item(id: $id) {\n      id\n      name\n      type\n      price\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateItem($item: ItemInput!, $itemId: Int!) {\n    updateItem(item: $item, itemId: $itemId) {\n      id\n      name\n      type\n      price\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation updateItem($item: ItemInput!, $itemId: Int!) {\n    updateItem(item: $item, itemId: $itemId) {\n      id\n      name\n      type\n      price\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query userWallet {\n        userWallet\n    }\n  "): (typeof documents)["\n    query userWallet {\n        userWallet\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addCredits($creditChange: Float!) {\n    addCredits(creditChange: $creditChange) \n  } "): (typeof documents)["\n  mutation addCredits($creditChange: Float!) {\n    addCredits(creditChange: $creditChange) \n  } "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;