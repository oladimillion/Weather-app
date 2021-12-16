module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    name: require("./package.json").name,
    verbose: true,
    clearMocks: true,
    collectCoverageFrom: [
        "<rootDir>/*.{ts, tsx}",
        "!**/node_modules/**",
    ],
    moduleDirectories: ["<rootDir>", "node_modules", "test-utils", "src"],
    notify: true,
    notifyMode: "failure",
    rootDir: "src",
    setupFilesAfterEnv: [
        "<rootDir>/../jest.setup.js"
    ],
}