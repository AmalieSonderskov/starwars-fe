import { test, expect } from "@playwright/test"

// test("has title", async ({ page }) => {
//   await page.goto("https://playwright.dev/")

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/)
// })

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/")

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click()

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible()
// })

test("login and access homepage as admin", async ({ page }) => {
  await page.goto("http://localhost:5173/login")
  await page.getByPlaceholder("Enter username").click()
  await page.getByPlaceholder("Enter username").fill("Watto")
  await page.getByRole("button", { name: "Login" }).click()
  await page.goto("http://localhost:5173/")
})

test.use({
  storageState: "auth_admin.json",
})

test("add item successful", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/addItem")
  await page.getByPlaceholder("Name").click()
  await page.getByPlaceholder("Name").fill("Test Item")
  await page.getByPlaceholder("Type").click()
  await page.getByPlaceholder("Type").fill("Item")
  await page.getByPlaceholder("Price").click()
  await page.getByPlaceholder("Price").fill("1000")
  await page.getByPlaceholder("Description").click()
  await page.getByPlaceholder("Description").fill("Test Item description")
  await page.getByLabel("For Sale").check()
  await page.getByRole("button", { name: "Add" }).click()
  const notification = await page.getByText("Item added", { exact: true })
  await expect(notification).toBeVisible()
})

test("add item with name that already exists", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/addItem")
  await page.getByPlaceholder("Name").click()
  await page.getByPlaceholder("Name").fill("Blue crystal")
  await page.getByPlaceholder("Type").click()
  await page.getByPlaceholder("Type").fill("Item")
  await page.getByPlaceholder("Price").click()
  await page.getByPlaceholder("Price").fill("1000")
  await page.getByPlaceholder("Description").click()
  await page.getByPlaceholder("Description").fill("Test item description")
  await page.getByLabel("For Sale").check()
  await page.getByRole("button", { name: "Add" }).click()
  const notification = await page.getByText("Item already exists", { exact: true })
  await expect(notification).toBeVisible()
})

test("add item with missing field(s)", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/addItem")
  await page.getByPlaceholder("Name").click()
  await page.getByPlaceholder("Name").fill("Name")
  await page.getByPlaceholder("Type").click()
  await page.getByPlaceholder("Type").fill("Type")
  await page.getByPlaceholder("Price").click()
  await page.getByPlaceholder("Price").fill("10")
  await page.getByRole("button", { name: "Add" }).click()
  const notification = await page.getByText("Missing fields", { exact: true })
  await expect(notification).toBeVisible()
  await page.getByPlaceholder("Description").click()
  await page.getByPlaceholder("Description").fill("Description")
  await page.getByPlaceholder("Price").click()
  await page.getByPlaceholder("Price").fill("")
  await page.getByRole("button", { name: "Add" }).click()
  await expect(notification).toBeVisible()
  await page.getByPlaceholder("Price").click()
  await page.getByPlaceholder("Price").fill("10")
  await page.getByPlaceholder("Type").click()
  await page.getByPlaceholder("Type").fill("")
  await page.getByRole("button", { name: "Add" }).click()
  await expect(notification).toBeVisible()
  await page.getByPlaceholder("Type").click()
  await page.getByPlaceholder("Type").fill("Type")
  await page.getByPlaceholder("Name").click()
  await page.getByPlaceholder("Name").fill("")
  await page.getByRole("button", { name: "Add" }).click()
  await expect(notification).toBeVisible()
  await page.getByPlaceholder("Type").click()
  await page.getByPlaceholder("Type").fill("")
  await page.getByPlaceholder("Price").click()
  await page.getByPlaceholder("Price").fill("")
  await page.getByPlaceholder("Description").click()
  await page.getByPlaceholder("Description").fill("")
  await page.getByRole("button", { name: "Add" }).click()
  await expect(notification).toBeVisible()
})
