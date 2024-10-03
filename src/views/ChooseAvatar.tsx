import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const updateProfilePicMutation = gql(`
  mutation updateProfilePicture($picture: String!) {
    updateProfilePicture(picture: $picture) 
    }
`)

export const ChooseAvatarView = () => {
  const avatars = [
    "/assets/darthVader.png",
    "/assets/WattoProfile.png",
    "/assets/yoda.png",
    "/assets/jarjar.png",
    "/assets/luke.png",
    "/assets/stormtrooper.png",
  ]
  const navigate = useNavigate()
  const [selectedAvatar, setSelectedAvatar] = useState("")
  const [updateProfilePic] = useMutation(updateProfilePicMutation)

  const handleAvatarClick = async (src: string) => {
    setSelectedAvatar(src)
    try {
      await updateProfilePic({
        variables: { picture: src },
        refetchQueries: ["getUserInfo"],
      })
    } catch (err) {
      console.log(err)
    }

    navigate("/myPage")
  }

  return (
    <div className='my-40 flex flex-row justify-center text-center text-white'>
      <Carousel className='w-full max-w-[80vw]'>
        <CarouselContent>
          {avatars.map((src, index) => (
            <CarouselItem key={index} className='basis-full md:basis-1/2 lg:basis-1/5'>
              <div className='p-1' onClick={() => handleAvatarClick(src)}>
                <img
                  src={src}
                  alt={`Avatar ${index + 1}`}
                  width={500}
                  height={500}
                  className='cursor-pointer rounded-full'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
