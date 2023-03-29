# FullFabric Public API

This package exports API wrappers for public API endpoints from FullFabric.

## Usage

Add a reference to our registry to your project's `.npmrc`.

`@fullfabric:registry=https://npm.pkg.github.com/`

Then install this package:

`$ npm i @fullfabric/public-api`

## APIs

### `getForm(formId)`

Fetches the data for a given form.

### `getCountries({ withCode } = {})`

Returns a list of countries, optionally including each country code.

## Publishing to NPM

Create a new release with the package's version, GitHub Actions will publish the package to our registry.
