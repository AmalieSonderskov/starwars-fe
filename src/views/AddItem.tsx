import { AddItemForm } from "@/components/AddItemForm"
import { userVar } from "@/state/userState"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import { gql, useMutation, useReactiveVar } from "@apollo/client"
import { FormType } from "@/components/SpecificItemForm"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"

const addItemQuery = gql(`
  mutation createItem($item: ItemInput!) {
    createItem(item: $item) {
      id
      name
      type
      price
      description
      forSale
    }
  }
`)

export const AddItemView = () => {
  const user = useReactiveVar(userVar)
  const [create] = useMutation(addItemQuery)
  const { toast } = useToast()
  const navigate = useNavigate()

  const createItem = async (data: FormType) => {
    if (!user?.user?.id) {
      throw new Error("No or incorrect user in create item")
    }

    if (!data.type || !data.description || !data.name || !data.price) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
      })
      return
    }

    try {
      await create({
        variables: {
          item: {
            ...data,
            userId: user.user.id,
          },
        },
      })

      toast({
        title: "Item added",
        description: `Item has been added to your stock`,
      })

      navigate("/")
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message)
        if (error.message.includes("already exists")) {
          toast({
            title: "Item already exists",
            description: "Item with this name already exists, please choose a different name.",
          })
        } else {
          toast({
            title: "Error",
            description: "An unexpected error occurred. Please try again.",
          })
        }
      }
    }
  }

  return (
    <div className='min-w-screen grid min-h-screen place-items-center'>
      <Card>
        <CardHeader>
          <CardTitle className='text-center'>Add a new item</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3'>
          <AddItemForm addFunc={createItem}></AddItemForm>
        </CardContent>
      </Card>
    </div>
  )
}
