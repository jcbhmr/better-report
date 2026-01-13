# Better `process.report`

📄 Typed & ergonomic `process.report` wrapper

<table align=center><td>

```js
import * as betterReport from "@jcbhmr/better-report";
const report = betterReport.getReport({
    excludeEnv: true,
    excludeNetwork: true
});
console.log(report);
//          ^? Report
// Original process.report.* configuration is untouched
```

</table>

## Installation

You can install this package using your favorite [npm](https://www.npmjs.com/) package manager.

```sh
npm install @jcbhmr/better-report
```

## Usage

This package currently offers only two methods that are better than their `process.report.*` originals: `getReport()` and `writeReport()`.

```js
import * as betterReport from "@jcbhmr/better-report";

betterReport.getReport({ excludeEnv, excludeNetwork, error });
betterReport.writeReport(filePath, { excludeEnv, excludeNetwork, error, compact });
```

Instead of relying on settings like `process.report.excludeEnv` and `process.report.excludeNetwork` to be configured before invocation, these better functions accept an optional `options` argument with those properties instead.

`betterReport.writeReport()` also is made better. It creates the directory that would contain the `filePath` before invoking the native `process.report.writeReport()` function. It will also throw an error if it fails to write the file; the native `process.report.writeReport()` returns an empty string.

[📚 Read the documentation for more information](#https://docsjs.example/@jcbhmr/better-report)

## Development

TODO
