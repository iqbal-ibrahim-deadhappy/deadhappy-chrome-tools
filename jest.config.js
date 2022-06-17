module.exports = {
    roots: [
        "src"
    ],
    preset: 'ts-jest',
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    transformIgnorePatterns: ["/node_modules/", "/build/"],
    setupFilesAfterEnv: [ "@testing-library/jest-dom/extend-expect" ]
}; 
