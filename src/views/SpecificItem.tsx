import { FormType, SpecificItemForm } from "@/components/SpecificItemForm"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { graphql } from "@/gql"
import { userVar } from "@/state/userState"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const itemQuery = graphql(`
  query item($id: Int!) {
    item(id: $id) {
      id
      name
      type
      price
      description
    }
  }
`)

const updateItemQuery = graphql(`
  mutation updateItem($item: ItemInput!, $itemId: Int!) {
    updateItem(item: $item, itemId: $itemId) {
      id
      name
      type
      price
      description
    }
  }
`)

export const SpecificItemView = () => {
  const user = useReactiveVar(userVar)
  const [update] = useMutation(updateItemQuery, {})
  const { id } = useParams<{ id: string }>()
  const itemId = parseInt(id ?? "0")
  const { data } = useQuery(itemQuery, { variables: { id: itemId } })
  const navigate = useNavigate()

  const updateFunc = (vars: FormType) => {
    if (!data?.item?.id) return
    update({
      variables: {
        item: { ...vars, userId: Number(user?.user?.id) },
        itemId: Number(data.item.id),
      },
    })
    navigate("/")
  }

  return (
    <div className='min-w-screen grid min-h-screen place-items-center'>
      <Card>
        <CardHeader>
          <CardTitle className='text-center'>Update item details</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3'>
          <SpecificItemForm updateFunc={updateFunc} item={data?.item}></SpecificItemForm>
        </CardContent>
      </Card>
    </div>
  )
}
