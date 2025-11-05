const browser = process.env.BROWSER || 'chrome';

exports.config = {
    runner: 'local',

    specs: [
        './test/**/*.js'
    ],

    exclude: [],

    maxInstances: 1,

    capabilities: [{
        browserName: browser,
        'goog:chromeOptions': browser === 'chrome' ? {
            args: ['--disable-dev-shm-usage', '--no-sandbox']
        } : undefined,
        'moz:firefoxOptions': browser === 'firefox' ? {
            args: []
        } : undefined
    }],

    logLevel: 'info',

    bail: 0,

    baseUrl: 'http://localhost',

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    framework: 'mocha',

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};
