import test from "node:test"
import assert from "node:assert/strict"
import { getReport } from "./index.js"

test("getReport", () => {
    const report = getReport();
    // assert.equal(report.header.reportVersion, 5)
    assert.notEqual(report.environmentVariables, undefined)
    assert.notEqual(report.header.networkInterfaces, undefined)
})

test("getReport no env", () => {
    const report = getReport({ excludeEnv: true })
    // assert.equal(report.header.reportVersion, 5)
    assert.equal(report.environmentVariables, undefined)
})

test("getReport no network", () => {
    const report = getReport({ excludeNetwork: true })
    // assert.equal(report.header.reportVersion, 5)
    assert.equal(report.header.networkInterfaces, undefined)
})
