import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useReactiveVar,
  HttpLink,
  split,
} from "@apollo/client"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import { adminRoutes, normalUserRoutes, notLoggedinRoutes } from "./router.tsx"
import { Toaster } from "./components/ui/toaster.tsx"
import { userVar } from "@/state/userState"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { getMainDefinition } from "@apollo/client/utilities"
import { createClient } from "graphql-ws"
import { setContext } from "@apollo/client/link/context"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token")
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  }
})

// const httpLink = new HttpLink({
//   uri: import.meta.env.VITE_API_URL + "/graphql",
// })

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:42069/graphql",
  }),
)

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query)
//     return definition.kind === "OperationDefinition" && definition.operation === "subscription"
//   },
//   wsLink,
//   httpLink,
// )

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL + "/graphql",
})

const authHttpLink = authLink.concat(httpLink)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === "OperationDefinition" && definition.operation === "subscription"
  },
  wsLink,
  authHttpLink, // Use the authenticated HTTP link
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`,
  // },
})

const RouterWrapper = () => {
  const user = useReactiveVar(userVar)

  return (
    <>
      {user ? (
        user.user?.role === "ADMIN" ? (
          <RouterProvider router={adminRoutes} />
        ) : (
          <RouterProvider router={normalUserRoutes} />
        )
      ) : (
        <RouterProvider router={notLoggedinRoutes} />
      )}
    </>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterWrapper />
    </ApolloProvider>
    <Toaster />
  </React.StrictMode>,
)
