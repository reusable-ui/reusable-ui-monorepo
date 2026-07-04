import jestRoot from '../../jest.config.js'
export default {
    ...jestRoot,
    testEnvironment: 'jsdom', // Required for testing React hooks
}
