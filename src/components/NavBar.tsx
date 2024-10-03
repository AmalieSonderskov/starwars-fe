import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useNavigate } from "react-router-dom"
import { useLazyQuery, useQuery, useReactiveVar } from "@apollo/client"
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
import { userVar } from "@/state/userState"
import { useEffect } from "react"

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
  const [fetchProfile, { data }] = useLazyQuery(userQuery)
  const navigate = useNavigate()
  const user = useReactiveVar(userVar)

  useEffect(() => {
    console.log("fetching profiles")
    fetchProfile()
  }, [user])

  const handleLogout = () => {
    localStorage.removeItem("userData")
    localStorage.removeItem("token")
    userVar(null)
    navigate("/login")
  }
  return (
    <Navbar expand='lg' className='bg-body-tertiary mx-6 text-lg text-white'>
      <Container>
        {user && (
          <Navbar.Collapse id='basic-navbar-nav' className='flex flex-row items-center py-2'>
            <Nav.Link className='cursor-pointer' href='/myPage'>
              <Avatar>
                <AvatarImage src={data?.userLoggedIn?.picture || "/src/assets/darthVader.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Nav.Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Nav.Link className='flex flex-row px-2 font-bold hover:text-stone-400'>
                  {user?.user?.name}
                </Nav.Link>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-stone-900 text-white'>
                <DropdownMenuLabel>
                  Current balance: ᖬ{data?.userLoggedIn?.wallet}
                </DropdownMenuLabel>
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
                    Add balance
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
            {user?.user?.role === "ADMIN" && (
              <Nav.Link className='px-4 hover:text-stone-400' href='/addItem'>
                Add new item
              </Nav.Link>
            )}
            <Nav.Link className='px-4 hover:text-stone-400' href='/saleItems'>
              Items for sale
            </Nav.Link>
            <Nav.Link className='px-4 hover:text-stone-400' href='/sales'>
              My sales
            </Nav.Link>
            <Nav.Link className='px-4 hover:text-stone-400' href='/purchases'>
              My purchases
            </Nav.Link>
            <Nav.Link className='px-4 hover:text-stone-400' href='/cart'>
              Cart
            </Nav.Link>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  )
}

export default NavBar
