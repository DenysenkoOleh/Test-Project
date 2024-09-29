import { test, expect } from "@playwright/test";
import { generateFormData } from "./generate-form-data";

const data = generateFormData();

const invalidValues = {
  firstName: ["", 123],
  lastName: ["", 123],
  email: ["invalidEmail", "email@", "email.com"],
  gender: ["Alien", "", 123],
  subjects: [[], ["InvalidSubject"]],
  phoneNumber: ["12345", "abcdefghij", "1234ab5678", ""],
  dateOfBirth: [new Date(), "InvalidDate", ""],
  formattedDateOfBirth: ["InvalidDateFormat", ""],
  hobbies: ["Flying", ""],
  address: [""],
  state: ["UnknownState", ""],
  city: ["UnknownCity", ""],
};

test.describe("Form Negative Tests", () => {
  const formUrl = "";

  test("should not accept empty name", async ({ page }) => {
    await page.goto(formUrl);

    data.firstName = String(invalidValues["firstName"][0]);
    // Fill out the form fields with random data
    await page.getByPlaceholder("First Name").fill(data.firstName);

    await page.getByRole("button", { name: "Submit" }).click();

    await expect(
      page.locator('input[placeholder="First Name"]:invalid')
    ).toBeVisible();
  });

  test("should not accept numbers as name", async ({ page }) => {
    await page.goto(formUrl);

    data.firstName = String(invalidValues["firstName"][1]);
    // Fill out the form fields with random data
    await page.getByPlaceholder("First Name").fill(data.firstName);

    await page.getByRole("button", { name: "Submit" }).click();

    await expect(
      page.locator('input[placeholder="First Name"]:invalid')
    ).toBeVisible();
  });

  test("should not accept empty last name", async ({ page }) => {
    await page.goto(formUrl);

    data.lastName = String(invalidValues["lastName"][0]);
    // Fill out the form fields with random data
    await page.getByPlaceholder("Last Name").fill(data.lastName);

    await page.getByRole("button", { name: "Submit" }).click();

    await expect(
      page.locator('input[placeholder="Last Name"]:invalid')
    ).toBeVisible();
  });

  test("should not accept numbers as last name", async ({ page }) => {
    await page.goto(formUrl);

    data.lastName = String(invalidValues["lastName"][1]);
    // Fill out the form fields with random data
    await page.getByPlaceholder("Last Name").fill(data.firstName);

    await page.getByRole("button", { name: "Submit" }).click();

    await expect(
      page.locator('input[placeholder="Last Name"]:invalid')
    ).toBeVisible();
  });

  invalidValues.email.forEach((invalidEmail) => {
    test(`should not accept invalid email: ${invalidEmail}`, async ({
      page,
    }) => {
      await page.goto(formUrl);

      await page.getByPlaceholder("name@example.com").fill(invalidEmail);
      await page.getByRole("button", { name: "Submit" }).click();

      await expect(
        page.locator('input[placeholder="name@example.com"]:invalid')
      ).toBeVisible();
    });
  });
});
