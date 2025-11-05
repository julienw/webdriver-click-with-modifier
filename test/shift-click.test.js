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
        // We need to send both keyboard and pointer actions in a single performActions call
        // to avoid releaseActions being called between them

        // Get element reference in WebDriver format
        const elementId = button.elementId;
        const elementRef = { 'element-6066-11e4-a52e-4f735466cecf': elementId };

        await browser.performActions([
            {
                type: 'key',
                id: 'keyboard',
                actions: [
                    { type: 'keyDown', value: Key.Shift }  // Shift key down
                ]
            },
            {
                type: 'pointer',
                id: 'pointer',
                parameters: { pointerType: 'mouse' },
                actions: [
                    { type: 'pointerMove', duration: 0, origin: elementRef, x: 0, y: 0 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);

        // Release the shift key
        await browser.performActions([
            {
                type: 'key',
                id: 'keyboard',
                actions: [
                    { type: 'keyUp', value: Key.Shift }  // Shift key up
                ]
            }
        ]);

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
});
