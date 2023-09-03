# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2023-09-03

### Changed
- Renamed the `params` option to `queryparams`.

### Fixed
- [#issue 2](https://github.com/adinan-cenci/http/issues/2) - Incorrect path resolution.

---


## [1.1.0] - 2023-08-27

### Added

- Added support to the `baseHref` property in the default options parameter.



## [1.0.4] - 2023-08-26

### Fixed

- Previously the library were using the `x-http-method-override` header to make beliefe POST requests 
  were something else, this has been removed.

---

## [1.0.3] - 2023-03-07

### Fixed

- There was no way of unsetting a header after setting a default value in the constructor's options.
  Now the `Http` object will automatically delete headers and properties overwritten as `undefined`.

---

## [1.0.2] - 2023-01-31

### Fixed

- Fixed an undefined property in the `Http.createRequest()` method.

---

## [1.0.1] - 2022-10-26

### Fixed

- The `Http.fetch()` method was made redundant in the last release, so I shortened it.
- Removed mocha from the dev requirements as it is being used for client side tests only.

---

## [1.0.0] - 2022-10-23

### Fixed

Several bugs.

### Added

- Added `defaultOptions` to the constructor method, this allow us to define default values
  to be used in every requests ( except when overwritten ofcourse ).
- Added unit tests with the help of [mochajs](https://mochajs.org/).

---

## [0.1.1] - 2022-03-02

### Fixed

- Fixed a bug regarding relative URLs.
- Fixed a bug that occured when you inform `options.body` or `options.params` as `null`.