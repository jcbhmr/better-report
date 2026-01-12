export type Report = ReportV5 | ReportV4 | ReportV3 | ReportV2 | ReportV1

export type ReportV1 = { header: { reportVersion: 1 } }
export type ReportV2 = { header: { reportVersion: 2 } }
export type ReportV3 = { header: { reportVersion: 3 } }
export type ReportV4 = { header: { reportVersion: 4 } }

export interface ReportV5 {
    header: Header
    javascriptStack: JavascriptStack
    javascriptHeap: JavascriptHeap
    nativeStack: NativeStack[]
    resourceUsage: ResourceUsage
    uvthreadResourceUsage: UvthreadResourceUsage
    libuv: Libuv[]
    workers: Report[]
    environmentVariables?: EnvironmentVariables
    userLimits: UserLimits
    sharedObjects: string[]
  }
  
  export interface Header {
    reportVersion: 5
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
    componentVersions: ComponentVersions
    release: Release
    osName: string
    osRelease: string
    osVersion: string
    osMachine: string
    cpus: Cpu[]
    networkInterfaces?: NetworkInterface[]
    host: string
  }
  
  export interface ComponentVersions {
    acorn: string
    ada: string
    amaro: string
    ares: string
    brotli: string
    cjs_module_lexer: string
    cldr: string
    icu: string
    llhttp: string
    modules: string
    napi: string
    nbytes: string
    ncrypto: string
    nghttp2: string
    node: string
    openssl: string
    simdjson: string
    simdutf: string
    sqlite: string
    tz: string
    undici: string
    unicode: string
    uv: string
    uvwasi: string
    v8: string
    zlib: string
    zstd: string
    [key: string]: string;
  }
  
  export interface Release {
    name: string
    headersUrl: string
    sourceUrl: string
  }
  
  export interface Cpu {
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
  
  export interface JavascriptStack {
    message: string
    stack: string[]
    errorProperties: ErrorProperties
  }
  
  export interface ErrorProperties {
    code: string
  }
  
  export interface JavascriptHeap {
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
    free_memory: number
    total_memory: number
    rss: number
    constrained_memory: number
    available_memory: number
    userCpuSeconds: number
    kernelCpuSeconds: number
    cpuConsumptionPercent: number
    userCpuConsumptionPercent: number
    kernelCpuConsumptionPercent: number
    maxRss: number
    pageFaults: PageFaults
    fsActivity: FsActivity
  }
  
  export interface PageFaults {
    IORequired: number
    IONotRequired: number
  }
  
  export interface FsActivity {
    reads: number
    writes: number
  }
  
  export interface UvthreadResourceUsage {
    userCpuSeconds: number
    kernelCpuSeconds: number
    cpuConsumptionPercent: number
    userCpuConsumptionPercent: number
    kernelCpuConsumptionPercent: number
    fsActivity: FsActivity
  }
  
  export interface Libuv {
    type: string
    is_active: boolean
    is_referenced?: boolean
    address: string
    repeat?: number
    firesInMsFromNow?: number
    expired?: boolean
    loopIdleTimeSeconds?: number
  }
  
  export type EnvironmentVariables = Record<string, string>;
  
  export interface UserLimits {
    core_file_size_blocks: UserLimitsValue
    data_seg_size_bytes: UserLimitsValue
    file_size_blocks: UserLimitsValue
    max_locked_memory_bytes: UserLimitsValue
    max_memory_size_bytes: UserLimitsValue
    open_files: UserLimitsValue
    stack_size_bytes: UserLimitsValue
    cpu_time_seconds: UserLimitsValue
    max_user_processes: UserLimitsValue
    virtual_memory_bytes: UserLimitsValue
  }
  
  export interface UserLimitsValue {
    soft: number | "unlimited"
    hard: number | "unlimited"
  }
  
export interface ReportOptions {
    error?: Error | undefined;
    excludeNetwork?: boolean | undefined;
    excludeEnv?: boolean | undefined;
}

export function getReport(options?: ReportOptions | undefined): Report;

export function writeReport(file?: string | undefined, options?: ReportOptions | undefined): void;

declare global {
    namespace NodeJS {
        interface ProcessReport {
            excludeNetwork: boolean;
        }
    }
}