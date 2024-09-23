import { graphql } from "@/gql"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery, useReactiveVar } from "@apollo/client"
import { Label } from "@radix-ui/react-label"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { userVar } from "@/state/userState"

const testQuery = graphql(`
  query items {
    items {
      id
      name
      type
      price
      description
    }
  }
`)

export const HomeView = () => {
  const { loading, error, data } = useQuery(testQuery)
  const navigate = useNavigate()
  const user = useReactiveVar(userVar)

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      const userData = JSON.parse(storedUserData)
      userVar(userData)
    } else {
      navigate("/login")
    }
  }, [navigate])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const items = data?.items || []

  const handleButtonClick = (id: number) => {
    navigate(`/item/${id}`)
  }

  return (
    <div className=''>
      <Label className='mx-4 text-center font-mono text-5xl font-bold text-stone-950'>
        Junk for sale
      </Label>
      <div className='/80 m-3 grid place-items-center bg-stone-600/80 p-3'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className='text-right'>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length > 0 ? (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className='text-right'>ᖬ{item.price}</TableCell>
                  <TableCell colSpan={5}>
                    <button
                      onClick={() => handleButtonClick(item.id)}
                      className='w-full rounded bg-orange-200/80 px-1 py-2 text-white hover:bg-orange-300/80'
                    >
                      Update
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No items found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
