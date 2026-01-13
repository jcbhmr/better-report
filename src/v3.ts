import type * as v2 from "./v2.ts"

export type { CPU, ErrorProperties, FSActivity, HeapSpaces, HeapSpacesValue, JavaScriptHeap, JavaScriptStack, Libuv, NativeStack, NetworkInterface, PageFaults, Release, UserLimits, UserLimitsValue, UvthreadResourceUsage } from "./v2.ts"

export type Report = Omit<v2.Report, "header" | "workers" | "resourceUsage"> & {
    header: Header
    workers: Report[]
    resourceUsage: ResourceUsage
}

export type Header = Omit<v2.Header, "reportVersion"> & {
    reportVersion: 3
}

export interface ResourceUsage extends v2.ResourceUsage {
    free_memory: number
    total_memory: number
    rss: number
    constrained_memory: number
    available_memory: number
}
