import { AuthObject } from "@/gql/graphql"
import { makeVar } from "@apollo/client"

const storedUserData = localStorage.getItem("userData")
let parsedUserData: null | AuthObject = null

if (storedUserData) {
  try {
    parsedUserData = JSON.parse(storedUserData) as AuthObject // Add type assertion
  } catch (error) {
    console.error("Error parsing userData from localStorage:", error)
  }
}

export const userVar = makeVar<null | AuthObject>(parsedUserData)
