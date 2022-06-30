# DeadHappy Chrome Tools

Chrome extension for common daily tasks written in TypeScript and React using Tailwind

## Project Structure

* `src/components`: TypeScript component files
* `src/__tests__`: this is where all tests live
* `public/assets`: static files including icons etc.
* `dist`: Chrome Extension directory (use this when 'loading unpacked' extension in Chrome)

## Development
To get it set up run

```
npm install
```

#### Build in watch mode


```
npm run watch
```
#### Build

```
npm run build
```

#### Run Test

```
npm run test
```


## Load extension in Chrome

In Chrome extensions, click 'Load Unpacked' and select the `dist` directory of this project.
