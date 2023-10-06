export const transform = {
    '^.+\\.ts?$': 'ts-jest',
};
export const testEnvironment = "node";
export const testRegex = './src/.*\\.(test|spec)?\\.(js|ts)$';
export const moduleFileExtensions = ['ts', 'js', 'json'];
export const roots = ['<rootDir>/src'];