import type * as v4 from "./v4.ts"

export type { CPU, ErrorProperties, FSActivity, HeapSpaces, HeapSpacesValue, JavaScriptHeap, JavaScriptStack, NativeStack, NetworkInterface, PageFaults, Release, UserLimitsValue, UvthreadResourceUsage, ResourceUsage, Libuv } from "./v4.ts"

export type Report = Omit<v4.Report, "header" | "workers" | "userLimits"> & {
    header: Header
    workers: Report[]
    userLimits: UserLimits
}

export type Header = Omit<v4.Header, "reportVersion"> & {
    reportVersion: 5
}

export type UserLimits = Omit<v4.UserLimits, "data_seg_size_kbytes" | "max_memory_size_kbytes" | "virtual_memory_kbytes"> & {
    data_seg_size_bytes: v4.UserLimits["data_seg_size_kbytes"]
    max_memory_size_bytes: v4.UserLimits["max_memory_size_kbytes"]
    virtual_memory_bytes: v4.UserLimits["virtual_memory_kbytes"]
}