import type * as v1 from "./v1.ts"

export type { CPU, ErrorProperties, FSActivity, HeapSpaces, HeapSpacesValue, JavaScriptHeap, JavaScriptStack, Libuv, NativeStack, NetworkInterface, PageFaults, Release, ResourceUsage, UserLimits, UserLimitsValue, UvthreadResourceUsage } from "./v1.ts"

export type Report = Omit<v1.Report, "header"> & {
    header: Header
    workers: Report[]
}

export type Header = Omit<v1.Header, "reportVersion"> & {
    reportVersion: 2
}
