import { test, expect } from "@playwright/test"

test("login and access homepage as admin", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/login")
  await page.getByPlaceholder("Enter username").click()
  await page.getByPlaceholder("Enter username").fill("Luke")
  await page.getByRole("button", { name: "Login" }).click()
  await page.goto("http://127.0.0.1:5173/")
})

test.use({
  storageState: "auth_user.json",
})

test("purchase item succesfully", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/saleItems")
  await page.getByTestId("add-to-cart-test-item").scrollIntoViewIfNeeded()
  await page.getByTestId("add-to-cart-test-item").click()
  const itemAddedNotification = await page.getByText("Item added", { exact: true })
  await expect(itemAddedNotification).toBeVisible()

  await page.getByRole("link", { name: "Cart" }).click()
  await page.getByRole("button", { name: "Purchase" }).click()
  const purchaseSuccesfulNotification = await page.getByText("Purchase Successful", { exact: true })
  await expect(purchaseSuccesfulNotification).toBeVisible()

  await page.getByRole("link", { name: "My items" }).click()
  const itemInStock = await page.getByRole("cell", { name: "Test Item", exact: true })
  await expect(itemInStock).toBeVisible()
})

test("purchase item empty cart", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/cart")
  await page.getByRole("button", { name: "Purchase" }).click()
  const emptyCartNotification = await page.getByText("Your cart is empty", { exact: true })
  await expect(emptyCartNotification).toBeVisible()
})

test("purchage item insufficient funds", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/saleItems")
  await page.getByTestId("add-to-cart-blue-crystal").scrollIntoViewIfNeeded()
  await page.getByTestId("add-to-cart-blue-crystal").click()

  const itemAddedNotification = await page.getByText("Item added", { exact: true })
  await expect(itemAddedNotification).toBeVisible()
  await page.getByRole("link", { name: "Cart" }).click()
  await page.getByRole("button", { name: "Purchase" }).click()
  const insufficientFundsNotification = await page.getByText("Insufficient funds", { exact: true })
  await expect(insufficientFundsNotification).toBeVisible()
})

test("update item", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/")
  await page.getByRole("button", { name: "Update" }).click()
  await page.getByPlaceholder("shadcn").click()
  await page.getByPlaceholder("shadcn").fill("Test Item Updated")
  await page.getByPlaceholder("00").click()
  await page.getByPlaceholder("00").fill("1500")
  await page.getByLabel("Description").click()
  await page.getByLabel("Description").fill("Test Item description updated")
  await page.getByLabel("For Sale").uncheck()
  await page.getByRole("button", { name: "Update" }).click()
  await page.getByRole("cell", { name: "Test Item Updated" }).click()
})

test("delete item", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/")
  const item = await page.getByRole("cell", { name: "Test Item", exact: true })
  await expect(item).toBeVisible()
  await page.getByTestId("delete-test-item").scrollIntoViewIfNeeded()
  await page.getByTestId("delete-test-item").click()

  const notification = await page.getByText("Item deleted", { exact: true })
  await expect(notification).toBeVisible()
  await page.goto("http://127.0.0.1:5173/")
  await expect(item).not.toBeVisible()
})

test("check if item price updates", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/saleItems")
  const initalPrice = await page.getByTestId("price-blue-crystal").textContent()
  await page.waitForTimeout(11000)
  const updatedPrice = await page.getByTestId("price-blue-crystal").textContent()
  expect(initalPrice).not.toBe(updatedPrice)
})

test("user not able to access add items", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/addItems")
  const notPassNotification = await page.getByText("You shall not pass WATTO xD")
  expect(notPassNotification).toBeVisible()
})
