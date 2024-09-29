import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Form', () => {
    test('should submit only required fields', async ({ page }) => {
        await page.goto('https://demoqa.com/automation-practice-form/');

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const phoneNumber = faker.string.numeric(10);

        await page.getByPlaceholder('First Name').fill(firstName);
        await page.getByPlaceholder('Last Name').fill(lastName);
        await page.getByPlaceholder('name@example.com').fill(email);
        // HACK: label intercepts the click event
        await page.getByText('Other').click();
        await expect(page.getByRole('radio', { name: 'Other' })).toBeChecked();
        await page.getByPlaceholder('Mobile Number').fill(phoneNumber);

        await page.getByRole('button', { name: 'Submit' }).click();

        await expect(page.getByText('Thanks for submitting the form')).toBeVisible();
    });

});
