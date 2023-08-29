# dashboard


## Installation

Before installing the dependencies you have to modify the .npmrc file in order to add a private repository
In MacOs the file should be  ~/.npmrc
add ad the Beginning the following lines:
@smartcommunitylab:registry=https://npm.pkg.github.com/
//registry.npmjs.org/:_authToken= xxxxx

You could reach the same result using the npm commands:
npm config set @smartcommunitylab:registry https://npm.pkg.github.com/
npm config set //https://npm.pkg.github.com/:_authToken xxxxxxxx
Install the application dependencies by running:

```sh
npm install
```

## Development

Start the application in development mode by running:

```sh
npm run dev
```

## Production

Build the application in production mode by running:

```sh
npm run build
```

## DataProvider

The included data provider use [ra-data-json-server](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-json-server). It fits REST APIs powered by [JSON Server](https://github.com/typicode/json-server), such as [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

You'll find an `.env` file at the project root that includes a `VITE_JSON_SERVER_URL` variable. Set it to the URL of your backend. By default, we set it to targets [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

