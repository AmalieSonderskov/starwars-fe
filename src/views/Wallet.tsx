import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { userVar } from "@/state/userState"
import { gql, useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const walletQuery = gql(`
    query userWallet {
        userWallet
    }
  `)

const AddCreditsQuery = gql(`
  mutation addCredits($creditChange: Float!) {
    addCredits(creditChange: $creditChange) 
  } `)

export const WalletView = () => {
  const { data } = useQuery(walletQuery)
  //const navigate = useNavigate()
  const [add] = useMutation(AddCreditsQuery)
  const [creditAmount, setCreditAmount] = useState("")
  const { toast } = useToast()

  // useEffect(() => {
  //   const storedUserData = localStorage.getItem("userData")
  //   if (storedUserData) {
  //     const userData = JSON.parse(storedUserData)
  //     userVar(userData)
  //   } else {
  //     navigate("/login")
  //   }
  // }, [navigate])

  const handleAddCredits = () => {
    const parsedCreditAmount = parseFloat(creditAmount)
    if (!isNaN(parsedCreditAmount)) {
      add({
        variables: { creditChange: parsedCreditAmount },
      })
      toast({
        title: "Credits added",
        description: `You have added ${parsedCreditAmount} credits to your account`,
      })
    } else {
      toast({
        title: "Invalid input",
        description: "Please enter a valid number",
      })
    }
  }

  return (
    <div className='min-w-screen grid min-h-screen place-items-center'>
      <Card>
        <CardHeader>
          <CardTitle className='text-center'>Add credit to account</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3'>
          <Input
            id='creditAmount'
            placeholder='Enter amount'
            value={creditAmount}
            onChange={(e) => setCreditAmount(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button size={"lg"} variant={"default"} onClick={handleAddCredits}>
            Add
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
