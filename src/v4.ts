import type * as v3 from "./v3.ts"

export type { CPU, ErrorProperties, FSActivity, HeapSpaces, HeapSpacesValue, JavaScriptHeap, JavaScriptStack, NativeStack, NetworkInterface, PageFaults, Release, UserLimits, UserLimitsValue, UvthreadResourceUsage, ResourceUsage } from "./v3.ts"

export type Report = Omit<v3.Report, "header" | "workers" | "libuv"> & {
    header: Header
    workers: Report[]
    libuv: Libuv[]
}

export type Header = Omit<v3.Header, "reportVersion"> & {
    reportVersion: 4
}

export type { Libuv }
type Libuv =
    | Libuv.Loop
    | Libuv.File
    | Libuv.Async
    | Libuv.Check
    | Libuv.FSEvent
    | Libuv.FSPoll
    | Libuv.Handle
    | Libuv.Idle
    | Libuv.Pipe
    | Libuv.Poll
    | Libuv.Prepare
    | Libuv.Process
    | Libuv.Stream
    | Libuv.TCP
    | Libuv.Timer
    | Libuv.TTY
    | Libuv.UDP
    | Libuv.Signal
declare namespace Libuv {
    export type Loop = v3.Libuv.Loop
    export type File = v3.Libuv.File
    export type Async = v3.Libuv.Async
    export type Check = v3.Libuv.Check
    export type FSEvent = v3.Libuv.FSEvent
    export type FSPoll = v3.Libuv.FSPoll
    export type Handle = v3.Libuv.Handle
    export type Idle = v3.Libuv.Idle
    export type Pipe = v3.Libuv.Pipe
    export type Poll = v3.Libuv.Poll
    export type Prepare = v3.Libuv.Prepare
    export type Process = v3.Libuv.Process
    export type Stream = v3.Libuv.Stream
    export type Timer = v3.Libuv.Timer
    export type TTY = v3.Libuv.TTY
    export type Signal = v3.Libuv.Signal

    export type TCP = Omit<v3.Libuv.TCP, "localEndpoint" | "remoteEndpoint"> & {
        localEndpoint: ({ host?: string; port: number } & ({ ip4: string } | { ip6: string })) | null
        remoteEndpoint: ({ host?: string; port: number } & ({ ip4: string } | { ip6: string })) | null
    }

    export type UDP = Omit<v3.Libuv.UDP, "localEndpoint" | "remoteEndpoint"> & {
        localEndpoint: ({ host?: string; port: number } & ({ ip4: string } | { ip6: string })) | null
        remoteEndpoint: ({ host?: string; port: number } & ({ ip4: string } | { ip6: string })) | null
    }
}
