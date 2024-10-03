import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useNavigate } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import { graphql } from "@/gql"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const walletQuery = gql(`
  query userWallet {
      userWallet
  }
`)

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

function NavBar() {
  const navigate = useNavigate()
  const { data } = useQuery(walletQuery)
  const { data: userData } = useQuery(userQuery)
  console.log("data", userData)
  const handleLogout = () => {
    localStorage.removeItem("userData")
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <Navbar expand='lg' className='bg-body-tertiary mx-6 text-lg text-white'>
      <Container>
        <Navbar.Collapse id='basic-navbar-nav' className='flex flex-row items-center py-2'>
          <Nav.Link className='cursor-pointer' href='/myPage'>
            <Avatar>
              <AvatarImage src={userData?.userLoggedIn?.picture || "/src/assets/darthVader.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Nav.Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Nav.Link className='flex flex-row px-2 font-bold hover:text-stone-400'>
                {userData?.userLoggedIn?.name}
              </Nav.Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-stone-900 text-white'>
              <DropdownMenuLabel>Credits: ᖬ{data?.userWallet}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <Nav.Link className='hover:text-stone-400' href='/myPage'>
                  My profile
                </Nav.Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Nav.Link className='hover:text-stone-400' href='/wallet'>
                  Earn extra credits
                </Nav.Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                {" "}
                <Nav.Link
                  className='hover:text-stone-400'
                  onClick={() => handleLogout()}
                  href='/login'
                >
                  Logout
                </Nav.Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Nav.Link className='px-4 hover:text-stone-400' href='/'>
            My items
          </Nav.Link>
          {userData?.userLoggedIn?.role === "ADMIN" && (
            <Nav.Link className='px-4 hover:text-stone-400' href='/addItem'>
              Add new item
            </Nav.Link>
          )}
          <Nav.Link className='px-4 hover:text-stone-400' href='/saleItems'>
            Items for sale
          </Nav.Link>
          <Nav.Link className='px-4 hover:text-stone-400' href='/cart'>
            Cart
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
function useMutaion(userQuery: unknown): { data: any } {
  throw new Error("Function not implemented.")
}
