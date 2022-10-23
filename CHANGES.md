# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2022-10-23
### Fixed
Several bugs.

### Added
- Added `defaultOptions` to the constructor method, this allow us to define default values
  to be used in every requests ( except when overwritten ofcourse ).
- Added unit tests with the help of [mochajs](https://mochajs.org/).

## [0.1.1] - 2022-03-02
### Fixed
 - Fixed a bug regarding relative URLs.
 - Fixed a bug that occured when you inform `options.body` or `options.params` as `null`.
 