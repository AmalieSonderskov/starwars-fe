import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { gql, useSubscription } from "@apollo/client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Item } from "@/gql/graphql"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { userVar } from "@/state/userState"

const itemsSubscription = gql`
  subscription itemsForSale {
    itemsForSale {
      name
      id
      forSale
      weight
      price
      type
      user {
        id
        name
      }
    }
  }
`

export const ItemsForSaleView = () => {
  const { data: updatedItems } = useSubscription(itemsSubscription)
  const navigate = useNavigate()
  const initialCart = localStorage.getItem("cart")
  const [cart, setCart] = useState(initialCart ? (JSON.parse(initialCart) ?? []) : [])
  const { toast } = useToast()
  console.log("Initial:", cart)

  const addToCart = (product: Item) => {
    console.log("Adding product:", product)
    console.log("Current cart:", cart)
    const currentCart = [...cart]
    const isAlreadyInCart = currentCart.some((item) => item.id === product.id)
    if (!isAlreadyInCart) {
      const updatedCart = [...currentCart, product]
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      setCart(updatedCart)
      console.log("updated", updatedCart)
    } else {
      console.log("Item already in cart")
    }

    toast({
      title: "Item added",
      description: `${product.name} has been added to your cart`,
      action: (
        <ToastAction altText='View Cart' onClick={() => navigate("/cart")}>
          {" "}
          See cart{" "}
        </ToastAction>
      ),
    })
  }

  const updatedItemsList = updatedItems?.itemsForSale || []
  const loggedInUserId = userVar()?.user?.id

  return (
    <div className='min-h-screen p-8 text-[#8B4513]'>
      <div className='flex justify-center'>
        <header className='mb-10 bg-primary/80 px-5 py-2 text-center font-mono'>
          <h1 className='mb-2 text-5xl font-bold underline'>Watto's Junkshop</h1>
          <p className='text-xl italic'>The finest junk in Mos Espa!</p>
        </header>
      </div>
      <div className='flex max-h-[75vh] w-full flex-wrap gap-4 overflow-y-auto'>
        {updatedItemsList.map((updateditem: Item) => (
          <Card
            key={updateditem.id}
            className='w-[calc(20%_-_1rem)] border-2 border-[#8B4513] bg-primary/80 shadow-lg'
          >
            <CardHeader>
              <img
                src='src/assets/Watto.png'
                alt='item'
                width={200}
                height={200}
                className='h-48 w-full rounded-md object-cover'
              />
            </CardHeader>
            <CardContent>
              <div className='flex flex-row justify-between'>
                <CardTitle className='mb-2 text-2xl text-[#8B4513]'>{updateditem.name}</CardTitle>
                <Badge variant='secondary' className='mb-2 bg-[#C19A6B] text-[#4A3933]'>
                  {updateditem.type}
                </Badge>
              </div>
              <div className='italic text-[#8B4513]'>Sold by: {updateditem.user?.name}</div>
              <CardDescription className='mb-4 text-[#6B4423]'>
                {updateditem.description}
              </CardDescription>
            </CardContent>
            <CardFooter className='flex items-center justify-between'>
              <span className='text-2xl font-bold text-[#8B4513]'>
                {Math.floor(updateditem.price)} credits
              </span>
              <Button
                variant='outline'
                className={`cursor-pointer border-[#8B4513] text-[#8B4513] transition-colors hover:bg-[#8B4513] hover:text-[#E6D2B5] ${loggedInUserId === updateditem.user?.id ? "cursor-not-allowed bg-gray-300" : ""}`}
                onClick={() => loggedInUserId !== updateditem.user?.id && addToCart(updateditem)}
                disabled={loggedInUserId === updateditem.user?.id}
              >
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
