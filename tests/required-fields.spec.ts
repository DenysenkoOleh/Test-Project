import { test, expect } from "@playwright/test";
import { generateFormData } from "./generate-form-data";

test("should submit only required fields", async ({ page }) => {
  await page.goto("");

  const data = generateFormData();

  await page.getByPlaceholder("First Name").fill(data.firstName);
  await page.getByPlaceholder("Last Name").fill(data.lastName);
  await page.getByPlaceholder("name@example.com").fill(data.email);
  // HACK: label intercepts the click event
  await page.getByText(data.gender, { exact: true }).click();
  await expect(
    page.getByRole("radio", { name: data.gender, exact: true })
  ).toBeChecked();
  await page.getByPlaceholder("Mobile Number").fill(data.phoneNumber);

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Thanks for submitting the form")).toBeVisible();

  // Verify the form data
  const fullName = `${data.firstName} ${data.lastName}`;
  await expect(
    page.getByRole("row", { name: "Student Name" }).getByText(fullName)
  ).toBeVisible();

  await expect(
    page.getByRole("row", { name: "Student Email" }).getByText(data.email)
  ).toBeVisible();

  await expect(
    page.getByRole("row", { name: "Gender" }).getByText(data.gender)
  ).toBeVisible();

  await expect(
    page.getByRole("row", { name: "Mobile" }).getByText(data.phoneNumber)
  ).toBeVisible();
});
