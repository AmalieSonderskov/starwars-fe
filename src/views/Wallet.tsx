import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { gql, useMutation, useQuery } from "@apollo/client"

import { useState } from "react"

import "./Wallet.css"

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
  const [add] = useMutation(AddCreditsQuery)
  const [position, setPosition] = useState({ top: "30%", left: "50%" })
  const [opacity, setOpacity] = useState(0)
  const [count, setCount] = useState(1)
  const [wattoCount, setWattoCount] = useState(1)
  const [showWatto, setShowWatto] = useState(false)
  const [showCard, setShowCard] = useState(true)

  const handleAddCredits = () => {
    setCount((prevCount) => prevCount + 1)
    console.log(count)
    setOpacity((prevOpacity) => Math.min(prevOpacity + 0.33, 1))

    if (count === 3) {
      setWattoCount((prevCount) => prevCount + 1)
      if (wattoCount === 3) {
        setShowWatto(true)
        setWattoCount(1)
      }
      const randomTop = `${Math.random() * 90}%`
      const randomLeft = `${Math.random() * 90}%`
      setPosition({ top: randomTop, left: randomLeft })

      setCount(1)
      setOpacity(0)
      const creditAmount = 500
      add({
        variables: { creditChange: creditAmount },
        refetchQueries: ["userWallet"],
      })
    }
  }

  const handleOkClick = () => {
    setShowCard(false)
  }

  return (
    <div className='min-w-screen pickaxe-button1 bg-cave grid min-h-screen place-items-center'>
      {showCard && (
        <Card className='p-1'>
          <CardHeader>
            <CardTitle className='my-3 text-center'>Wattos crystal mine</CardTitle>
            <CardDescription className='text-center italic'>
              Help Watto mine crystals and earn extra credits! The crystals can be difficult to
              find.. so good luck!
            </CardDescription>
          </CardHeader>
          <div className='flex justify-center p-4'>
            <Button size={"lg"} variant={"default"} onClick={handleOkClick}>
              OK
            </Button>
          </div>
        </Card>
      )}

      <Button
        name='addCredits'
        className='w-50 h-50 pickaxe-button2 bg-transparent hover:bg-transparent'
        size={"lg"}
        variant={"default"}
        onClick={handleAddCredits}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src='/assets/crystal1.png'
          alt='item'
          width={50}
          height={50}
          className='rounded-md object-cover'
          style={{
            opacity: opacity,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
      </Button>
      {showWatto && (
        <img
          src='/assets/wattospeak.png'
          alt='Sliding Image'
          className='animate-slideIn absolute left-0 top-1/2 -translate-y-1/2 transform'
          onAnimationEnd={() => setShowWatto(false)}
        />
      )}
    </div>
  )
}
