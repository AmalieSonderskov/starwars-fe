import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Item } from "@/gql/graphql"
import { ToastAction } from "@radix-ui/react-toast"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

interface ItemCardProps {
  item: Item
  loggedInUserId: number | null
  addToCart: (item: Item) => void
}

export const ItemComponent = ({ item, loggedInUserId, addToCart }: ItemCardProps) => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart(item)
    toast({
      title: "Item added",
      description: `${item.name} has been added to your cart`,
      action: (
        <ToastAction altText='View Cart' onClick={() => navigate("/cart")}>
          {" "}
          See cart{" "}
        </ToastAction>
      ),
    })
  }

  return (
    <Card key={item.id} className='w-100 border-2 border-[#8B4513] bg-primary/80 shadow-lg'>
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
          <CardTitle className='mb-2 text-2xl text-[#8B4513]'>{item.name}</CardTitle>
          <Badge variant='secondary' className='mb-2 bg-[#C19A6B] text-[#4A3933]'>
            {item.type}
          </Badge>
        </div>
        <div className='italic text-[#8B4513]'>Sold by: {item.user?.name}</div>
        <CardDescription className='mb-4 text-[#6B4423]'>{item.description}</CardDescription>
      </CardContent>
      <CardFooter className='flex items-center justify-between'>
        <span
          data-testid={`price-${item.name
            ?.split(" ")
            .map((s) => s.toLocaleLowerCase())
            .join("-")}`}
          className='text-2xl font-bold text-[#8B4513]'
        >
          {Math.floor(item.price)} credits
        </span>
        <Button
          data-testid={`add-to-cart-${item.name
            ?.split(" ")
            .map((s) => s.toLocaleLowerCase())
            .join("-")}`}
          variant='outline'
          className={`cursor-pointer border-[#8B4513] text-[#8B4513] transition-colors hover:bg-[#8B4513] hover:text-[#E6D2B5] ${loggedInUserId === item.user?.id ? "cursor-not-allowed bg-gray-300" : ""}`}
          onClick={handleAddToCart}
          disabled={loggedInUserId === item.user?.id}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  )
}
