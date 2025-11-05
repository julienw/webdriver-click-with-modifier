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

The key to making shift+click work is using `perform(true)` to skip the automatic release of actions between calls. This keeps the Shift key pressed during the click.

```javascript
const { Key } = require('webdriverio');

// Press Shift key down (skip release with perform(true))
await browser.action('key')
    .down(Key.Shift)
    .perform(true);

// Click while Shift is held (skip release with perform(true))
await browser.action('pointer')
    .move({ origin: button })
    .down({ button: 0 })
    .up({ button: 0 })
    .perform(true);

// Release Shift key
await browser.action('key')
    .up(Key.Shift)
    .perform();
```

### Why This Approach?

- By default, `perform()` calls `releaseActions()` which clears the action state
- Using `perform(true)` skips the automatic release, keeping the Shift key pressed between actions
- This allows the pointer click to happen while the Shift modifier is still active
- Much simpler than manually constructing `performActions()` with both keyboard and pointer actions

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
