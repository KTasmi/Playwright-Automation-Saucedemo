import { test, expect } from '@playwright/test'; // Import Playwright's test runner and assertion library

test('User logs in, adds a product to cart, verifies it, and logs out', async ({ page }) => { // Define a test case with a descriptive title; 'page' is a fixture providing a browser page instance

  // Navigate to login page
  await page.goto('https://www.saucedemo.com/'); // Open the SauceDemo website in the browser
  await page.waitForTimeout(1000); // Pause execution for 1 second to ensure the page fully loads

  // Login
  await page.fill('#user-name', 'standard_user'); // Locate the username input field by ID and enter 'standard_user'
  await page.waitForTimeout(1000); // Wait 1 second for the field to accept input and any animations

  await page.fill('#password', 'secret_sauce'); // Locate the password input field by ID and enter 'secret_sauce'
  await page.waitForTimeout(1000); // Wait 1 second to mimic real user typing delay

  await page.click('#login-button'); // Click the login button using its ID selector
  await page.waitForTimeout(1000); // Wait 1 second for the dashboard to load after login

  // Add first product to cart
  const productName = await page.locator('.inventory_item_name').first().innerText(); // Get the name of the first product from the inventory list
  await page.waitForTimeout(1000); // Wait 1 second before interacting with the product

  await page.locator('.btn_inventory').first().click(); // Click the "Add to Cart" button of the first product
  await page.waitForTimeout(1000); // Wait 1 second for the cart badge to update

  // Go to cart
  await page.click('.shopping_cart_link'); // Click the shopping cart icon/link in the header
  await page.waitForTimeout(1000); // Wait 1 second for the cart page to load

  // Verify product name in cart
  const cartProduct = await page.locator('.inventory_item_name').innerText(); // Extract the product name displayed inside the cart
  await page.waitForTimeout(1000); // Wait 1 second before making the assertion

  await expect(cartProduct).toBe(productName); // Assert that the product name in the cart matches the one added earlier
  await page.waitForTimeout(1000); // Wait 1 second after assertion for stability

  // Open menu and logout
  await page.click('#react-burger-menu-btn'); // Click the hamburger menu button to open the sidebar
  await page.waitForTimeout(1000); // Wait 1 second for the sidebar menu to slide in

  await page.click('#logout_sidebar_link'); // Click the "Logout" link inside the sidebar menu
  await page.waitForTimeout(1000); // Wait 1 second for the logout process and redirect

  // Verify redirected to login page
  await expect(page.locator('#login-button')).toBeVisible(); // Confirm that the login button is visible again, proving we're back on the login screen
  await page.waitForTimeout(1000); // Final wait to ensure full page transition before test ends

});