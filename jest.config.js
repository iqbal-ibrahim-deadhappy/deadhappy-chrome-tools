module.exports = {
    roots: [
        "src"
    ],
    preset: 'ts-jest',
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/", "/build/"],
    setupFilesAfterEnv: [ "<rootDir>/setupTests.js" ]
}; 
