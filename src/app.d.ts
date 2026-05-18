// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			pasteShortId?: string;
			pasteTitle?: string | null;
			pasteCreatedAt?: string;
			pasteExpiresAt?: string;
		}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
