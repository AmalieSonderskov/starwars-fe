import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { graphql } from "@/gql"
import { userVar } from "@/state/userState"
import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const testQuery = graphql(`
  mutation Login($username: String!) {
    login(username: $username) {
      token
      user {
        id
        name
        role
        wallet
        picture
      }
    }
  }
`)

export const LoginView = () => {
  const [username, setUsername] = useState("")
  const [login] = useMutation(testQuery)
  const navigate = useNavigate()

  const submitClick = () => {
    login({
      onCompleted: console.log,
      variables: { username },
    }).then((x) => {
      if (x.data?.login) {
        // const userData = {
        //   id: x.data.login?.user?.id || -1,
        //   token: x.data.login.token || "",
        //   username: x.data?.login?.user?.name || "",
        //   role: x.data?.login?.user?.role || "",
        //   wallet: x.data?.login?.user?.wallet || 0,
        // }
        if (x.data.login?.token) {
          localStorage.setItem("token", x.data.login.token)
        }
        localStorage.setItem("userData", JSON.stringify(x.data.login))
        userVar(x.data?.login)
        navigate("/")
      }
    })
  }
  return (
    <div className='min-w-screen grid min-h-screen place-items-center bg-junkshop'>
      <Card>
        <CardHeader>
          <CardTitle className='text-center'>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            onChange={(x) => setUsername(x.target.value)}
            id='username'
            placeholder='Enter username'
          />
        </CardContent>
        <CardFooter>
          <Button size={"lg"} variant={"default"} onClick={submitClick}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
