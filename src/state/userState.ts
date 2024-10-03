import { AuthObject } from "@/gql/graphql"
import { makeVar } from "@apollo/client"

const storedUserData = localStorage.getItem("userData")
export const userVar = makeVar<null | AuthObject>(
  storedUserData ? JSON.parse(storedUserData) : null,
)
