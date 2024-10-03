import { createBrowserRouter } from "react-router-dom"
import { LoginView } from "./views/Login"
import { SpecificItemView } from "./views/SpecificItem"
import { AddItemView } from "./views/AddItem"
import { MyItemsView } from "./views/MyItems"
import { ItemsForSaleView } from "./views/ItemsForSale"

import { CartView } from "./views/Cart"
import App from "./app"
import { WalletView } from "./views/Wallet"
import { MyProfileView } from "./views/MyProfile"
import { ChooseAvatarView } from "./views/ChooseAvatar"
import { MyPurchasesView } from "./views/MyPurchases"
import { MySales } from "./views/MySales"
import { NotFoundView } from "./views/NotFound"

export const adminRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MyItemsView />,
      },
      {
        path: "/item/:id",
        element: <SpecificItemView />,
      },
      {
        path: "/addItem",
        element: <AddItemView />,
      },
      {
        path: "/saleItems",
        element: <ItemsForSaleView />,
      },
      {
        path: "/cart",
        element: <CartView />,
      },
      {
        path: "/wallet",
        element: <WalletView />,
      },
      {
        path: "/myPage",
        element: <MyProfileView />,
      },
      {
        path: "/myPage/avatars",
        element: <ChooseAvatarView />,
      },
      {
        path: "/purchases",
        element: <MyPurchasesView />,
      },
      {
        path: "/sales",
        element: <MySales />,
      },
      {
        path: "*",
        element: <NotFoundView />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
  },
])

export const normalUserRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MyItemsView />,
      },
      {
        path: "/item/:id",
        element: <SpecificItemView />,
      },
      {
        path: "/saleItems",
        element: <ItemsForSaleView />,
      },
      {
        path: "/cart",
        element: <CartView />,
      },
      {
        path: "/wallet",
        element: <WalletView />,
      },
      {
        path: "/myPage",
        element: <MyProfileView />,
      },
      {
        path: "/myPage/avatars",
        element: <ChooseAvatarView />,
      },
      {
        path: "/purchases",
        element: <MyPurchasesView />,
      },
      {
        path: "/sales",
        element: <MySales />,
      },
      {
        path: "*",
        element: <NotFoundView />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
  },
])

export const notLoggedinRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
])
