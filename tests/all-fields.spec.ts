import { test, expect } from "@playwright/test";
import { generateFormData } from "./generate-form-data";

test("should submit all fields", async ({ page }) => {
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
  await page.locator("#dateOfBirthInput").fill(data.formattedDateOfBirth);

  await page.getByText(data.hobbies).click();
  await expect(
    page.getByRole("checkbox", { name: data.hobbies })
  ).toBeChecked();

  for (const subject of data.subjects) {
    await page.locator("#subjectsInput").fill(subject);
    await page.locator("#subjectsInput").press("Enter");
  }

  await page.getByLabel("Select picture").setInputFiles({
    name: "file.png",
    mimeType: "image/png",
    buffer: Buffer.from("this is test"),
  });
  await page.getByPlaceholder("Current Address").fill(data.address);

  // Custom dropdown
  const stateInput = page
    .locator("#stateCity-wrapper")
    .locator("input")
    .first();
  await stateInput.fill(data.state);
  await stateInput.press("Enter");

  const cityInput = page.locator("#stateCity-wrapper").locator("input").last();
  await cityInput.fill(data.city);
  await cityInput.press("Enter");

  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Thanks for submitting the form")).toBeVisible();

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

  await expect(
    page
      .getByRole("row", { name: "Date of Birth" })
      .getByText(data.dateOfBirthReport)
  ).toBeVisible();

  await expect(
    page
      .getByRole("row", { name: "Subjects" })
      .getByText(data.subjects.join(", "))
  ).toBeVisible();

  await expect(
    page.getByRole("row", { name: "Hobbies" }).getByText(data.hobbies)
  ).toBeVisible();

  await expect(
    page.getByRole("row", { name: "Address" }).getByText(data.address)
  ).toBeVisible();

  await expect(
    page
      .getByRole("row", { name: "State and City" })
      .getByText(`${data.state} ${data.city}`)
  ).toBeVisible();

  await expect(
    page.getByRole("row", { name: "Picture" }).getByText("file.png")
  ).toBeVisible();
});
