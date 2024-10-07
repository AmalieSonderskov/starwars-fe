import { gql, useLazyQuery, useReactiveVar } from "@apollo/client"
import { userVar } from "@/state/userState"
import { useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StarWarsTimeZones } from "@/enums"

interface HistoricItem {
  id: number
  name: string
  type: string
  price: number
  description: string
  userId: number
  forSale: boolean
  weight: number
}

const testQuery = gql(`
    query userPurchase($userId: Int!) {
    userPurchase(userId: $userId) {
      id
      time
      transactions {
        id
        time
        historicItem
      }
    }
    }
  `)

export const MyPurchasesView = () => {
  // const navigate = useNavigate()
  const user = useReactiveVar(userVar)
  const [fetchPurcheases, { data, error, loading }] = useLazyQuery(testQuery, {
    variables: { userId: user?.user?.id },
  })

  useEffect(() => {
    if (!user?.user) {
      console.log("no user")
      return
    }
    fetchPurcheases({ variables: { userId: user.user.id } })
  }, [user?.user])

  if (!data) {
    return <div>loading</div>
  }

  return (
    <div className='p-8 text-[#8B4513]'>
      <div className='flex justify-center'>
        <header className='mb-10 bg-primary/50 px-5 py-2 text-center font-mono'>
          <h1 className='mb-2 text-5xl font-bold underline'>Previous purchases</h1>
          <p className='text-xl italic'>One entity's junk another's treasure</p>
        </header>
      </div>
      <div className='m-3 grid place-items-center bg-primary/40 p-3'>
        <div className='max-h-[70vh] w-full overflow-y-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className='text-right'>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.userPurchase.length > 0 ? (
                data.userPurchase.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell>{replaceTimeZoneWithStarWars(purchase.time)}</TableCell>

                    <TableCell>
                      {purchase.transactions.map((transaction) => {
                        const parsedItem = parseHistoricItem(transaction.historicItem)
                        return (
                          <div key={transaction.id}>
                            {parsedItem
                              ? `${parsedItem.name}: ᖬ${parsedItem.price}`
                              : "No item available"}
                          </div>
                        )
                      })}
                    </TableCell>

                    <TableCell className='text-right'>
                      {"ᖬ" +
                        purchase.transactions.reduce((total, transaction) => {
                          const parsedItem = parseHistoricItem(transaction.historicItem)
                          return total + (parsedItem?.price || 0)
                        }, 0)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No purchases to show</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

const parseHistoricItem = (historicItem: string | null): HistoricItem | null => {
  if (!historicItem) return null
  try {
    return JSON.parse(historicItem)
  } catch (error) {
    console.error("Error parsing historicItem JSON:", error)
    return null
  }
}

function replaceTimeZoneWithStarWars(dateString: string): string {
  const timeZoneRegex = /GMT([+-]\d{4})/
  const match = dateString.match(timeZoneRegex)

  if (match) {
    const gmtOffset = match[1] // f.eks. "+0200"
    let starWarsTimeZone: string | undefined

    switch (gmtOffset) {
      case "+0100":
        starWarsTimeZone = StarWarsTimeZones.GMT_PLUS_1
        break
      case "+0200":
        starWarsTimeZone = StarWarsTimeZones.GMT_PLUS_2
        break
      case "+0300":
        starWarsTimeZone = StarWarsTimeZones.GMT_PLUS_3
        break
      case "+0400":
        starWarsTimeZone = StarWarsTimeZones.GMT_PLUS_4
        break
      case "+0500":
        starWarsTimeZone = StarWarsTimeZones.GMT_PLUS_5
        break
      case "+0600":
        starWarsTimeZone = StarWarsTimeZones.GMT_PLUS_6
        break
      case "+0700":
        starWarsTimeZone = StarWarsTimeZones.GMT_PLUS_7
        break
      case "+0800":
        starWarsTimeZone = StarWarsTimeZones.GMT_PLUS_8
        break
      case "+0900":
        starWarsTimeZone = StarWarsTimeZones.GMT_PLUS_9
        break
      case "+1000":
        starWarsTimeZone = StarWarsTimeZones.GMT_PLUS_10
        break
      case "-0100":
        starWarsTimeZone = StarWarsTimeZones.GMT_MINUS_1
        break
      case "-0200":
        starWarsTimeZone = StarWarsTimeZones.GMT_MINUS_2
        break
      case "-0300":
        starWarsTimeZone = StarWarsTimeZones.GMT_MINUS_3
        break
      case "-0400":
        starWarsTimeZone = StarWarsTimeZones.GMT_MINUS_4
        break
      case "-0500":
        starWarsTimeZone = StarWarsTimeZones.GMT_MINUS_5
        break
      case "-0600":
        starWarsTimeZone = StarWarsTimeZones.GMT_MINUS_6
        break
      case "-0700":
        starWarsTimeZone = StarWarsTimeZones.GMT_MINUS_7
        break
      case "-0800":
        starWarsTimeZone = StarWarsTimeZones.GMT_MINUS_8
        break
      case "-0900":
        starWarsTimeZone = StarWarsTimeZones.GMT_MINUS_9
        break
      case "-1000":
        starWarsTimeZone = StarWarsTimeZones.GMT_MINUS_10
        break
      default:
        starWarsTimeZone = StarWarsTimeZones.GMT
    }
    const withSStarwarsTime = dateString.replace(timeZoneRegex, starWarsTimeZone)
    const finalDate = withSStarwarsTime.split("(")[0]
    return finalDate
  }
  return dateString
}
