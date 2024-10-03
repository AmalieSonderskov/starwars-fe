import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Item } from "@/gql/graphql"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { Button } from "@/components/ui/button"
import { graphql } from "@/gql"
import { useMutation, useReactiveVar } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { userVar } from "@/state/userState"

const createPurchaseQuery = graphql(`
  mutation createPurchase($buyerId: Int!, $itemInputs: [Int!]!) {
    createPurchase(buyerId: $buyerId, itemInputs: $itemInputs) {
      id
      time
      buyerId
      transactions {
        id
        time
        historicItem
      }
    }
  }
`)

export const CartView = () => {
  const initialCart = localStorage.getItem("cart")
  const [cart, setCart] = useState<Item[]>(initialCart ? (JSON.parse(initialCart) ?? []) : [])
  const { toast } = useToast()
  //const [user, setUser] = useState()
  const [createPurchase] = useMutation(createPurchaseQuery)
  const navigate = useNavigate()
  const user = useReactiveVar(userVar)

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    //const storedUserData = localStorage.getItem("userData")

    if (storedCart) {
      const cartData = JSON.parse(storedCart)
      setCart(cartData)
    }
  }, [navigate])

  const handleRemoveItem = (itemToRemove: Item) => {
    const updatedCart = cart.filter((item) => item.id !== itemToRemove.id)
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    toast({
      title: "Item removed",
      description: `${itemToRemove.name} has been removed from your cart`,
      action: (
        <ToastAction
          altText='Undo'
          onClick={() => {
            const restoredCart = [...updatedCart, itemToRemove]
            setCart(restoredCart)
            localStorage.setItem("cart", JSON.stringify(restoredCart))
          }}
        >
          {" "}
          Undo{" "}
        </ToastAction>
      ),
    })

    console.log(itemToRemove.name)
  }

  const handlePurchase = () => {
    if (!user?.user?.id) {
      throw new Error("No user Id at handle purchase")
    }
    const transactionIds = cart.map((item: Item) => item.id)

    createPurchase({
      variables: {
        buyerId: user.user.id,
        itemInputs: transactionIds,
      },
    })
    console.log("transaction:", transactionIds)
    console.log("User id:", user.user.id)
    setCart([])
    localStorage.setItem("cart", JSON.stringify([]))
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to cart before purchasing",
      })
    } else {
      toast({
        title: "Purchase Successful",
        description: "Your items in cart has been purchased.",
      })
    }
  }

  return (
    <div className='p-8 text-[#8B4513]'>
      <div className='flex justify-center'>
        <header className='mb-10 bg-primary/50 px-5 py-2 text-center font-mono'>
          <h1 className='mb-2 text-5xl font-bold underline'>Your Cart</h1>
          <p className='text-xl italic'>Junk you have added to cart</p>
        </header>
      </div>
      <div className='grid max-h-[70vh] place-items-center overflow-auto'>
        <div className='m-3 grid w-[30vw] bg-primary/40 p-4'>
          <div className='max-h-[70vh] overflow-y-auto'></div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>ᖬ{item.price}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleRemoveItem(item)}
                        className='rounded bg-orange-200/80 px-1 py-2 text-white hover:bg-orange-300/80'
                      >
                        Remove item
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>Cart is empty</TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell className='underline'>
                  ᖬ{cart.reduce((acc: number, item: Item) => acc + item.price, 0)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <button
            onClick={() => handlePurchase()}
            className='w-full rounded bg-orange-200/80 px-3 py-2 font-mono text-lg text-white hover:bg-orange-300/80'
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  )
}
