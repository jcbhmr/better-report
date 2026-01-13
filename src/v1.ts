export interface Report {
    header: Header
    javascriptStack: JavaScriptStack
    javascriptHeap: JavaScriptHeap
    nativeStack: NativeStack[]
    resourceUsage: ResourceUsage
    uvthreadResourceUsage: UvthreadResourceUsage
    libuv: Libuv[]
    environmentVariables?: Record<string, string>
    userLimits: UserLimits
    sharedObjects: string[]
}

export interface Header {
    reportVersion: 1
    event: string
    trigger: string
    filename: string | null
    dumpEventTime: string
    dumpEventTimeStamp: string
    processId: number
    threadId: number
    cwd: string
    commandLine: string[]
    nodejsVersion: string
    glibcVersionRuntime: string
    glibcVersionCompiler: string
    wordSize: number
    arch: string
    platform: string
    componentVersions: Record<string, string>
    release: Release
    osName: string
    osRelease: string
    osVersion: string
    osMachine: string
    cpus: CPU[]
    networkInterfaces?: NetworkInterface[]
    host: string
}

export interface Release {
    name: string
    headersUrl: string
    sourceUrl: string
  }

  export interface CPU {
    model: string
    speed: number
    user: number
    nice: number
    sys: number
    idle: number
    irq: number
  }


  export interface NetworkInterface {
    name: string
    internal: boolean
    mac: string
    address: string
    netmask: string
    family: string
    scopeid?: number
  }
  
  export interface JavaScriptStack {
    message: string
    stack: string[]
    errorProperties: ErrorProperties
  }
  
  export interface ErrorProperties {
    code: string
  }
  
  export interface JavaScriptHeap {
    totalMemory: number
    executableMemory: number
    totalCommittedMemory: number
    availableMemory: number
    totalGlobalHandlesMemory: number
    usedGlobalHandlesMemory: number
    usedMemory: number
    memoryLimit: number
    mallocedMemory: number
    externalMemory: number
    peakMallocedMemory: number
    nativeContextCount: number
    detachedContextCount: number
    doesZapGarbage: number
    heapSpaces: HeapSpaces
  }
  
  export interface HeapSpaces {
    read_only_space: HeapSpacesValue
    new_space: HeapSpacesValue
    old_space: HeapSpacesValue
    code_space: HeapSpacesValue
    shared_space: HeapSpacesValue
    trusted_space: HeapSpacesValue
    shared_trusted_space: HeapSpacesValue
    new_large_object_space: HeapSpacesValue
    large_object_space: HeapSpacesValue
    code_large_object_space: HeapSpacesValue
    shared_large_object_space: HeapSpacesValue
    shared_trusted_large_object_space: HeapSpacesValue
    trusted_large_object_space: HeapSpacesValue
  }
  
  export interface HeapSpacesValue {
    memorySize: number
    committedMemory: number
    capacity: number
    used: number
    available: number
  }
  
  export interface NativeStack {
    pc: string
    symbol: string
  }

  export interface ResourceUsage {
    userCpuSeconds: number
    kernelCpuSeconds: number
    cpuConsumptionPercent: number
    userCpuConsumptionPercent: number
    kernelCpuConsumptionPercent: number
    maxRss: number
    pageFaults: PageFaults
    fsActivity: FSActivity
  }
  
  export interface PageFaults {
    IORequired: number
    IONotRequired: number
  }
  
  export interface FSActivity {
    reads: number
    writes: number
  }
  
  export interface UvthreadResourceUsage {
    userCpuSeconds: number
    kernelCpuSeconds: number
    cpuConsumptionPercent: number
    userCpuConsumptionPercent: number
    kernelCpuConsumptionPercent: number
    fsActivity: FSActivity
  }

  export interface UserLimits {
    core_file_size_blocks: UserLimitsValue
    data_seg_size_kbytes: UserLimitsValue
    file_size_blocks: UserLimitsValue
    max_locked_memory_bytes: UserLimitsValue
    max_memory_size_kbytes: UserLimitsValue
    open_files: UserLimitsValue
    stack_size_bytes: UserLimitsValue
    cpu_time_seconds: UserLimitsValue
    max_user_processes: UserLimitsValue
    virtual_memory_kbytes: UserLimitsValue
  }
  
  export interface UserLimitsValue {
    soft: number | "unlimited"
    hard: number | "unlimited"
  }

  export type { Libuv }
  type Libuv = Libuv.Loop
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
    

          export interface Loop {
            type: "loop"
            is_active: boolean;
            address: string;
            loopIdleTimeSeconds: number;
          }

          interface HandleBase {
            type: string;
            is_active: boolean
            is_referenced: boolean
            address: string
          }

          export interface File extends HandleBase {
            type: "file"
          }

          export interface Async extends HandleBase {
            type: "async"
          }

          export interface Check extends HandleBase {
            type: "check"
          }

          interface FilenameProps {
            filename: string | null
          }

          export interface FSEvent extends HandleBase, FilenameProps {
            type: "fs_event"
          }

          export interface FSPoll extends HandleBase, FilenameProps {
            type: "fs_poll"
          }

          export interface Handle extends HandleBase {
            type: "handle"
          }

          export interface Idle extends HandleBase {
            type: "idle"
          }

          interface BufferSizeProps {
            sendBufferSize: number
            recvBufferSize: number
          }

          type FDProps = {} | {
            fd: number;
            stdio?: "stdin" | "stdout" | "stderr"
          }

          interface RWProps {
            writeQueueSize: number
            readable: boolean
            writable: boolean
          }

          interface PipeEndpointsProps {
            localEndpoint: string | null
            remoteEndpoint: string | null
          }

          export type Pipe = HandleBase & PipeEndpointsProps & FDProps & ({} | BufferSizeProps) & RWProps & {
            type: "pipe"
          }

          export type Poll = HandleBase & FDProps & {
            type: "poll"
          }

          export interface Prepare extends HandleBase {
            type: "prepare"
          }

          export interface Process extends HandleBase {
            type: "process"
            pid: number
          }

          export interface Stream extends HandleBase {
            type: "stream"
          }

          type Endpoint = {
            host?: string
            port: number
          } // & ({ ip4: string } | { ip6: string })

          interface EndpointsProps {
            localEndpoint: Endpoint | null
            remoteEndpoint: Endpoint | null
          }

          export type TCP = HandleBase & EndpointsProps & BufferSizeProps & FDProps & RWProps & {
            type: "tcp"
          }

          export interface Timer extends HandleBase {
            type: "timer"
            repeat: number
            firesInMsFromNow: number
            expired: boolean
          }

          export type TTY = HandleBase & FDProps & RWProps & {
            type: "tty"
          } & ({} | { width: number; height: number })

          interface WriteQueueProps {
            writeQueueSize: number
            writeQueueCount: number
          }

          export type UDP = HandleBase & EndpointsProps & BufferSizeProps & FDProps & WriteQueueProps & {
            type: "udp"
          }

          export interface Signal extends HandleBase {
            type: "signal"
            signum: number
            signal: string
          }

  }
