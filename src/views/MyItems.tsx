import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery, useReactiveVar } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { userVar } from "@/state/userState"

import { gql } from "@apollo/client"

const testQuery = gql(`
  query itemsByUser($userId: Int!) {
    itemsByUser(userId: $userId) {
      id
      name
      type
      price
      description
      forSale
    }
  }
`)
export const MyItemsView = () => {
  const navigate = useNavigate()
  const user = useReactiveVar(userVar)

  const { data } = useQuery(testQuery, {
    variables: { userId: user?.user?.id },
  })

  const items = data?.itemsByUser || []

  const handleButtonClick = (id: number) => {
    navigate(`/item/${id}`)
  }

  return (
    <div className='p-8 text-[#8B4513]'>
      <div className='flex justify-center'>
        <header className='mb-10 bg-primary/50 px-5 py-2 text-center font-mono'>
          <h1 className='mb-2 text-5xl font-bold underline'>All items in stock</h1>
          <p className='text-xl italic'>Get an overview of all your items!</p>
        </header>
      </div>
      <div className='/80 m-3 grid place-items-center bg-primary/40 p-3'>
        <div className='max-h-[70vh] w-full overflow-y-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Currently for sale?</TableHead>
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
                    <TableCell>{item.forSale ? "Yes" : "No"}</TableCell>
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
    </div>
  )
}
