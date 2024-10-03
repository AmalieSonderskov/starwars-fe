import { AddItemForm } from "@/components/AddItemForm"
import { userVar } from "@/state/userState"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { graphql } from "@/gql"
import { useMutation, useReactiveVar } from "@apollo/client"
import { FormType } from "@/components/SpecificItemForm"

const addItemQuery = graphql(`
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

  const createItem = (data: FormType) => {
    if (!user?.user?.id) {
      throw new Error("No or incorrect user in create item")
    }
    create({
      variables: {
        item: {
          ...data,
          userId: user.user.id,
        },
      },
    })
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
