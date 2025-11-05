const path = require('path');
const assert = require('assert');
const { Key } = require('webdriverio');

describe('Shift+Click Test', () => {
    it('should perform a click with shift modifier on a button', async () => {
        // Navigate to the test page
        const testPagePath = 'file://' + path.resolve(__dirname, 'test-page.html');
        await browser.url(testPagePath);

        // Wait for the button to be present
        const button = await $('#testButton');
        await button.waitForExist({ timeout: 5000 });

        // Perform shift+click using browser.action()
        // Use perform(true) to skip releasing actions between calls
        await browser.action('key')
            .down(Key.Shift)
            .perform(true);  // Skip release

        // Click with {} to use actions API
        await button.click({});

        // Release shift key
        await browser.action('key')
            .up(Key.Shift)
            .perform();

        // Verify that shift+click was detected
        const result = await $('#result');
        const resultText = await result.getText();
        const clickType = await result.getAttribute('data-click-type');

        console.log('Result text:', resultText);
        console.log('Click type:', clickType);

        // Assert that shift+click was detected
        assert.strictEqual(clickType, 'shift-click', 'Expected shift-click to be detected');
        assert.strictEqual(resultText, 'Shift+Click detected!', 'Expected shift+click message');
    });

    it('should perform a normal click without modifier', async () => {
        // Navigate to the test page
        const testPagePath = 'file://' + path.resolve(__dirname, 'test-page.html');
        await browser.url(testPagePath);

        // Wait for the button to be present
        const button = await $('#testButton');
        await button.waitForExist({ timeout: 5000 });

        // Perform normal click
        await button.click();

        // Verify that normal click was detected
        const result = await $('#result');
        const resultText = await result.getText();
        const clickType = await result.getAttribute('data-click-type');

        console.log('Result text:', resultText);
        console.log('Click type:', clickType);

        // Assert that normal click was detected
        assert.strictEqual(clickType, 'normal-click', 'Expected normal-click to be detected');
        assert.strictEqual(resultText, 'Normal click detected', 'Expected normal click message');
    });

    it('demonstrates browser difference with click() without empty object', async () => {
        // Navigate to the test page
        const testPagePath = 'file://' + path.resolve(__dirname, 'test-page.html');
        await browser.url(testPagePath);

        // Wait for the button to be present
        const button = await $('#testButton');
        await button.waitForExist({ timeout: 5000 });

        // Press shift key down but use click() without {}
        await browser.action('key')
            .down(Key.Shift)
            .perform(true);

        // Click WITHOUT {} - behavior differs by browser
        await button.click();

        // Release shift key
        await browser.action('key')
            .up(Key.Shift)
            .perform();

        // Check result
        const result = await $('#result');
        const resultText = await result.getText();
        const clickType = await result.getAttribute('data-click-type');

        console.log('Result text:', resultText);
        console.log('Click type:', clickType);
        console.log('Browser:', browser.capabilities.browserName);

        // Browser-specific behavior:
        // - Firefox: click() does NOT respect action state, normal click detected
        // - Chrome: click() DOES respect action state, shift+click detected
        // To ensure consistent behavior across browsers, always use click({})
        const browserName = browser.capabilities.browserName;
        if (browserName === 'firefox') {
            assert.strictEqual(clickType, 'normal-click', 'Firefox: click() without {} does not use action state');
        } else if (browserName === 'chrome') {
            assert.strictEqual(clickType, 'shift-click', 'Chrome: click() without {} respects action state');
        }
    });
});
