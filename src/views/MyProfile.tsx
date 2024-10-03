import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { graphql } from "@/gql"
import { useQuery, useReactiveVar } from "@apollo/client"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { useNavigate } from "react-router-dom"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { userVar } from "@/state/userState"

const userQuery = graphql(`
  query getUserInfo {
    userLoggedIn {
      id
      name
      role
      wallet
      picture
    }
  }
`)

export const MyProfileView = () => {
  const { data } = useQuery(userQuery)
  const user = useReactiveVar(userVar)
  const navigate = useNavigate()

  const handleAvatarClick = () => {
    navigate("/myPage/avatars")
  }

  return (
    <div className='m-6 flex flex-row justify-center text-center'>
      <Card className='w-1/4'>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3 font-mono'>
          <Popover>
            <PopoverTrigger className='focus:outline-none'>
              <Avatar>
                <AvatarImage
                  className='rounded-full'
                  src={data?.userLoggedIn?.picture || "/src/assets/darthVader.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent
              onClick={handleAvatarClick}
              className='cursor-pointer bg-stone-900 text-white'
              align='center'
              side='left'
            >
              Change avatar
            </PopoverContent>
          </Popover>
          <div className='mt-6 flex flex-row justify-center'>
            <p className='px-2 font-bold'>Username:</p>
            <p>{user?.user?.name} </p>
          </div>
          <div className='flex flex-row justify-center'>
            <p className='px-2 font-bold'>Current balance:</p>
            <p>ᖬ{data?.userLoggedIn?.wallet}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
