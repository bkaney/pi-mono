declare module "@anthropic-ai/sandbox-runtime" {
	export interface NetworkConfig {
		allowedDomains: string[];
		deniedDomains: string[];
		allowUnixSockets?: string[];
		allowAllUnixSockets?: boolean;
		allowLocalBinding?: boolean;
		allowMachLookup?: string[];
		httpProxyPort?: number;
		socksProxyPort?: number;
		mitmProxy?: {
			socketPath: string;
			domains: string[];
		};
		parentProxy?: {
			http?: string;
			https?: string;
			noProxy?: string;
		};
	}

	export interface FilesystemConfig {
		denyRead: string[];
		allowRead?: string[];
		allowWrite: string[];
		denyWrite: string[];
		allowGitConfig?: boolean;
	}

	export interface SandboxRuntimeConfig {
		network: NetworkConfig;
		filesystem: FilesystemConfig;
		ignoreViolations?: Record<string, string[]>;
		enableWeakerNestedSandbox?: boolean;
		enableWeakerNetworkIsolation?: boolean;
		ripgrep?: {
			command: string;
			args?: string[];
			argv0?: string;
		};
		mandatoryDenySearchDepth?: number;
		allowPty?: boolean;
		seccomp?: {
			argv0?: string;
			applyPath?: string;
		};
	}

	export interface ISandboxManager {
		initialize(
			runtimeConfig: SandboxRuntimeConfig,
			sandboxAskCallback?: (...args: unknown[]) => unknown,
			enableLogMonitor?: boolean,
		): Promise<void>;
		wrapWithSandbox(
			command: string,
			binShell?: string,
			customConfig?: Partial<SandboxRuntimeConfig>,
			abortSignal?: AbortSignal,
		): Promise<string>;
		reset(): Promise<void>;
	}

	export const SandboxManager: ISandboxManager;
}
