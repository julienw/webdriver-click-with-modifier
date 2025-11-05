# WebDriver Click with Modifier

A WebDriver.io project demonstrating how to perform a click with the Shift modifier key on Chrome and Firefox.

## Installation

```bash
npm install
```

## Running Tests

Switch between Chrome and Firefox using the `BROWSER` environment variable:

```bash
# Run with Chrome (default)
npm test

# Run with Chrome explicitly
npm run test:chrome

# Run with Firefox
npm run test:firefox
```

## How it Works

The key to making shift+click work is using `browser.performActions()` to send both keyboard and pointer actions in a **single** call. This prevents the browser from releasing the action state between separate API calls.

```javascript
const { Key } = require('webdriverio');

// Get element reference in WebDriver format
const elementId = button.elementId;
const elementRef = { 'element-6066-11e4-a52e-4f735466cecf': elementId };

// Send keyboard and pointer actions together
await browser.performActions([
    {
        type: 'key',
        id: 'keyboard',
        actions: [
            { type: 'keyDown', value: Key.Shift }
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

// Release shift key
await browser.performActions([
    {
        type: 'key',
        id: 'keyboard',
        actions: [
            { type: 'keyUp', value: Key.Shift }
        ]
    }
]);
```

### Why This Approach?

- Using separate `browser.action('key').down().perform()` and `browser.action('pointer').click().perform()` calls doesn't work because WebDriver calls `releaseActions()` between each `perform()`
- `performActions()` with both keyboard and pointer actions in a single call ensures the Shift key stays pressed during the click
- The element reference must be in WebDriver's standard format: `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`

## Project Structure

- `wdio.conf.js` - WebDriver.io configuration with browser switching via `BROWSER` env variable
- `test/shift-click.test.js` - Test demonstrating shift+click functionality
- `test/test-page.html` - Sample HTML page for testing

## Dependencies

- @wdio/cli: ^9.20.0
- @wdio/local-runner: ^9.20.0
- @wdio/mocha-framework: ^9.20.0
- @wdio/spec-reporter: ^9.20.0
- chromedriver: ^142.0.0
- geckodriver: ^6.0.2
- webdriverio: ^9.20.0
