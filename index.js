/**
 * @template {{}} T
 * @template {any} R
 * @param {T} object 
 * @param {Partial<T>} tempProps 
 * @param {(value: T) => R} fn 
 * @returns 
 */
function withAssign(object, tempProps, fn) {
    const oldProps = /** @type {typeof tempProps} */(/** @type {unknown} */({ __proto__: null }));
    for (const key of Object.keys(tempProps)) {
        // @ts-ignore
        oldProps[key] = object[key];
    }
    Object.assign(object, tempProps);
    const result = fn(object);
    Object.assign(object, oldProps);
    return result;
}

/**
 * @param {import("./index.d.ts").GetReportOptions} [options] 
 * @returns {import("./index.d.ts").Report}
 */
export function getReport(options = {}) {
    const error = options.error;
    const excludeEnv = !!options.excludeEnv;
    const excludeNetwork = !!options.excludeNetwork;
    const report = withAssign(process.report, { excludeEnv, excludeNetwork }, (report) => /** @type {import("./index.d.ts").Report} */(report.getReport(error)));
    return report
}

/**
 * @param {string | undefined} [file]
 * @param {import("./index.d.ts").WriteReportOptions} [options] 
 * @returns {void}
 */
export function writeReport(file = undefined, options = {}) {
    const error = options.error;
    const excludeEnv = !!options.excludeEnv;
    const excludeNetwork = !!options.excludeNetwork;
    withAssign(process.report, { excludeEnv, excludeNetwork }, (report) => {
        report.writeReport(file, error);
    })
}

import * as fsPromises from "node:fs/promises"
import assert from "node:assert/strict"

/**
 * @param {string} path
 * @returns {import("./index.d.ts").Report}
 */
export async function readReport(path) {
    const text = await fsPromises.readFile(path)
    const json = JSON.parse(text)
    assert(typeof json?.header?.reportVersion === "number", `${json?.header?.reportVersion} is not ${"number"}`)
    return /** @type {import("./index.d.ts").Report} */(json);
}