import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import { ApolloClient, InMemoryCache, ApolloProvider, useReactiveVar } from "@apollo/client"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import { adminRoutes, normalUserRoutes, notLoggedinRoutes } from "./router.tsx"
import { Toaster } from "./components/ui/toaster.tsx"
import { userVar } from "@/state/userState"

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL + "/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
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
