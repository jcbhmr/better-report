import * as path from "node:path";
import * as fs from "node:fs";
import * as util from "node:util"

declare global {
    namespace NodeJS {
        interface ProcessReport {
            excludeNetwork: boolean;
        }
    }
}

import type * as v1 from "./v1.ts"
import type * as v2 from "./v2.ts"
import type * as v3 from "./v3.ts"
import type * as v4 from "./v4.ts"
import type * as v5 from "./v5.ts"

export type { v1, v2, v3, v4, v5 }
export type Report = v1.Report | v2.Report | v3.Report | v4.Report | v5.Report

const defaultInspectOptions = {
    showHidden: false,
    depth: 2,
    colors: false,
    customInspect: true,
    showProxy: false,
    maxArrayLength: 100,
    maxStringLength: 10000,
    breakLength: 80,
    compact: true,
    sorted: false,
    getters: false,
    numericSeparator: false,
}

function stringInspect(strings: TemplateStringsArray, ...substitutions: unknown[]): string {
    const inspectedSubstitutions = substitutions.map(x => util.inspect(x, defaultInspectOptions))
    return String.raw({ raw: strings }, ...inspectedSubstitutions)
}

function withAssign<T extends object, R>(object: T, tempProps: Partial<T>, callback: (value: T) => R): R {
    const oldProps = { __proto__: null! } as unknown as Partial<T>
    for (const key of Object.keys(tempProps)) {
        oldProps[key] = object[key];
    }
    Object.assign(object, tempProps);
    const result = callback(object)
    Object.assign(object, oldProps)
    return result;
}

export interface GetReportOptions {
    excludeEnv?: boolean | undefined;
    excludeNetwork?: boolean | undefined;
    error?: Error | undefined;
}

export function getReport({
    error,
    excludeEnv = false,
    excludeNetwork = false,
}: GetReportOptions = {}): Report {
    return withAssign(process.report, { excludeEnv, excludeNetwork }, (report) => report.getReport(error) as Report);
}

export interface WriteReportOptions extends GetReportOptions {
    compact?: boolean | undefined;
}

/**
 * 
 * @param filePath 
 * @param options 
 * @throws {NodeJS.ErrnoException} if cannot create directory that would contain {@link filePath}
 * @throws {Error} if `process.report.writeReport()` returns `""`
 */
export function writeReport(filePath: string | undefined = undefined, {
    compact = false,
    error,
    excludeEnv = false,
    excludeNetwork = false,
}: WriteReportOptions = {}): string {
    if (filePath != null) {
        fs.mkdirSync(path.dirname(filePath))
    }
    const outputFilePath = withAssign(process.report, { compact, excludeEnv, excludeNetwork }, (report) => report.writeReport(filePath, error))
    if (outputFilePath === "") {
        throw new Error(stringInspect`process.report.writeReport() returned ${outputFilePath}`)
    }
    return outputFilePath
}
