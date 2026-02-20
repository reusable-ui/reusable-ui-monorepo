import config from '../../playwright.react.config'
config.projects = (
    (config.projects ?? [])
    .filter(({ name }) => (name !== 'firefox'))
    // .map((project) => ({ ...project, workers: 1 })) // disable parallelism
);
export default config;
