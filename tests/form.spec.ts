import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Form', () => {
    test('should submit form', async ({page}) => {
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
        await expect(page.getByRole('radio', {name: 'Other'})).toBeChecked();
        // await page.click('#gender-radio-3');
        await page.getByPlaceholder('Mobile Number').fill(phoneNumber);

        await page.click('#submit');

        await expect(page.locator('.modal-title')).toHaveText('Thanks for submitting the form');
    });
});
