declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"artist-statement": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "artist-statement";
  data: any
} & { render(): Render[".md"] };
};
"cinema": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "cinema";
  data: any
} & { render(): Render[".md"] };
"partyofone.mdx": {
	id: "partyofone.mdx";
  slug: "partyofone";
  body: string;
  collection: "cinema";
  data: any
} & { render(): Render[".mdx"] };
"tv-emmering.mdx": {
	id: "tv-emmering.mdx";
  slug: "tv-emmering";
  body: string;
  collection: "cinema";
  data: any
} & { render(): Render[".mdx"] };
};
"filmgespraech": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "filmgespraech";
  data: any
} & { render(): Render[".md"] };
"125-jahre-tv-emmering-film.mdx": {
	id: "125-jahre-tv-emmering-film.mdx";
  slug: "125-jahre-tv-emmering-film";
  body: string;
  collection: "filmgespraech";
  data: any
} & { render(): Render[".mdx"] };
"partyofone.mdx": {
	id: "partyofone.mdx";
  slug: "partyofone";
  body: string;
  collection: "filmgespraech";
  data: any
} & { render(): Render[".mdx"] };
};
"gilching": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "gilching";
  data: any
} & { render(): Render[".md"] };
"KuKuWo17.mdx": {
	id: "KuKuWo17.mdx";
  slug: "kukuwo17";
  body: string;
  collection: "gilching";
  data: any
} & { render(): Render[".mdx"] };
"KuKuWo18.mdx": {
	id: "KuKuWo18.mdx";
  slug: "kukuwo18";
  body: string;
  collection: "gilching";
  data: any
} & { render(): Render[".mdx"] };
"KuKuWo19.mdx": {
	id: "KuKuWo19.mdx";
  slug: "kukuwo19";
  body: string;
  collection: "gilching";
  data: any
} & { render(): Render[".mdx"] };
"KuKuWo20.mdx": {
	id: "KuKuWo20.mdx";
  slug: "kukuwo20";
  body: string;
  collection: "gilching";
  data: any
} & { render(): Render[".mdx"] };
"KuKuWo21.mdx": {
	id: "KuKuWo21.mdx";
  slug: "kukuwo21";
  body: string;
  collection: "gilching";
  data: any
} & { render(): Render[".mdx"] };
"KuKuWo22.mdx": {
	id: "KuKuWo22.mdx";
  slug: "kukuwo22";
  body: string;
  collection: "gilching";
  data: any
} & { render(): Render[".mdx"] };
"KuKuWo23.mdx": {
	id: "KuKuWo23.mdx";
  slug: "kukuwo23";
  body: string;
  collection: "gilching";
  data: any
} & { render(): Render[".mdx"] };
};
"hochzeitsfotos": {
"-config.md": {
	id: "-config.md";
  slug: "-config";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".md"] };
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".md"] };
"-info-zur-sortierung.mdx": {
	id: "-info-zur-sortierung.mdx";
  slug: "-info-zur-sortierung";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1001-shooting-julia-martin1.mdx": {
	id: "1001-shooting-julia-martin1.mdx";
  slug: "1001-shooting-julia-martin1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1002-shooting-babett-alex1.mdx": {
	id: "1002-shooting-babett-alex1.mdx";
  slug: "1002-shooting-babett-alex1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1003-shooting-julia-martin2.mdx": {
	id: "1003-shooting-julia-martin2.mdx";
  slug: "1003-shooting-julia-martin2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1004-shooting-deborah-philipp.mdx": {
	id: "1004-shooting-deborah-philipp.mdx";
  slug: "1004-shooting-deborah-philipp";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1005-shooting-tanja-taylan1.mdx": {
	id: "1005-shooting-tanja-taylan1.mdx";
  slug: "1005-shooting-tanja-taylan1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1007-mayumi-lennart2.mdx": {
	id: "1007-mayumi-lennart2.mdx";
  slug: "1007-mayumi-lennart2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1008-mayumi-lennart1.mdx": {
	id: "1008-mayumi-lennart1.mdx";
  slug: "1008-mayumi-lennart1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1009-shooting-babett-alex8.mdx": {
	id: "1009-shooting-babett-alex8.mdx";
  slug: "1009-shooting-babett-alex8";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1010-shooting-babett-alex5.mdx": {
	id: "1010-shooting-babett-alex5.mdx";
  slug: "1010-shooting-babett-alex5";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1011-shooting-carmen-flo.mdx": {
	id: "1011-shooting-carmen-flo.mdx";
  slug: "1011-shooting-carmen-flo";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1029-shooting-peter-martin1.mdx": {
	id: "1029-shooting-peter-martin1.mdx";
  slug: "1029-shooting-peter-martin1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1030-shooting-peter-martin2.mdx": {
	id: "1030-shooting-peter-martin2.mdx";
  slug: "1030-shooting-peter-martin2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1040-shooting-conny-hannes.mdx": {
	id: "1040-shooting-conny-hannes.mdx";
  slug: "1040-shooting-conny-hannes";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1102-shooting-babett-alex2.mdx": {
	id: "1102-shooting-babett-alex2.mdx";
  slug: "1102-shooting-babett-alex2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1103-shooting-babett-alex3.mdx": {
	id: "1103-shooting-babett-alex3.mdx";
  slug: "1103-shooting-babett-alex3";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1104-shooting-babett-alex4.mdx": {
	id: "1104-shooting-babett-alex4.mdx";
  slug: "1104-shooting-babett-alex4";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1106-shooting-babett-alex6.mdx": {
	id: "1106-shooting-babett-alex6.mdx";
  slug: "1106-shooting-babett-alex6";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1107-shooting-babett-alex7.mdx": {
	id: "1107-shooting-babett-alex7.mdx";
  slug: "1107-shooting-babett-alex7";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1109-shooting-babett-alex9.mdx": {
	id: "1109-shooting-babett-alex9.mdx";
  slug: "1109-shooting-babett-alex9";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1110-shooting-babett-alex10.mdx": {
	id: "1110-shooting-babett-alex10.mdx";
  slug: "1110-shooting-babett-alex10";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1111-shooting-babett-alex11.mdx": {
	id: "1111-shooting-babett-alex11.mdx";
  slug: "1111-shooting-babett-alex11";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1112-shooting-babett-alex12.mdx": {
	id: "1112-shooting-babett-alex12.mdx";
  slug: "1112-shooting-babett-alex12";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"1201-shooting-julia-martin3.mdx": {
	id: "1201-shooting-julia-martin3.mdx";
  slug: "1201-shooting-julia-martin3";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"analoge-elisabeth-oliver1.mdx": {
	id: "analoge-elisabeth-oliver1.mdx";
  slug: "analoge-elisabeth-oliver1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"analoge-elisabeth-oliver2.mdx": {
	id: "analoge-elisabeth-oliver2.mdx";
  slug: "analoge-elisabeth-oliver2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"analoge-elisabeth-oliver3.mdx": {
	id: "analoge-elisabeth-oliver3.mdx";
  slug: "analoge-elisabeth-oliver3";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"analoge-elisabeth-oliver4.mdx": {
	id: "analoge-elisabeth-oliver4.mdx";
  slug: "analoge-elisabeth-oliver4";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"analoge-friederike-christian1.mdx": {
	id: "analoge-friederike-christian1.mdx";
  slug: "analoge-friederike-christian1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"analoge-friederike-christian2.mdx": {
	id: "analoge-friederike-christian2.mdx";
  slug: "analoge-friederike-christian2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"analoge-friederike-christian3.mdx": {
	id: "analoge-friederike-christian3.mdx";
  slug: "analoge-friederike-christian3";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"analoge-friederike-christian4.mdx": {
	id: "analoge-friederike-christian4.mdx";
  slug: "analoge-friederike-christian4";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"analoge-friederike-christian5.mdx": {
	id: "analoge-friederike-christian5.mdx";
  slug: "analoge-friederike-christian5";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"analoge-friederike-christian6.mdx": {
	id: "analoge-friederike-christian6.mdx";
  slug: "analoge-friederike-christian6";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"analoge-michaela-niko.mdx": {
	id: "analoge-michaela-niko.mdx";
  slug: "analoge-michaela-niko";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"analoge-sabrina-stefano1.mdx": {
	id: "analoge-sabrina-stefano1.mdx";
  slug: "analoge-sabrina-stefano1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"analoge-sabrina-stefano2.mdx": {
	id: "analoge-sabrina-stefano2.mdx";
  slug: "analoge-sabrina-stefano2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"analoge-susann-bernhard.mdx": {
	id: "analoge-susann-bernhard.mdx";
  slug: "analoge-susann-bernhard";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-conny-hannes21.mdx": {
	id: "black-conny-hannes21.mdx";
  slug: "black-conny-hannes21";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-conny-hannes22.mdx": {
	id: "black-conny-hannes22.mdx";
  slug: "black-conny-hannes22";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-conny-hannes23.mdx": {
	id: "black-conny-hannes23.mdx";
  slug: "black-conny-hannes23";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-conny-hannes24.mdx": {
	id: "black-conny-hannes24.mdx";
  slug: "black-conny-hannes24";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-conny-hannes25.mdx": {
	id: "black-conny-hannes25.mdx";
  slug: "black-conny-hannes25";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-conny-hannes26.mdx": {
	id: "black-conny-hannes26.mdx";
  slug: "black-conny-hannes26";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-conny-hannes27.mdx": {
	id: "black-conny-hannes27.mdx";
  slug: "black-conny-hannes27";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-conny-hannes28.mdx": {
	id: "black-conny-hannes28.mdx";
  slug: "black-conny-hannes28";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-conny-hannes29.mdx": {
	id: "black-conny-hannes29.mdx";
  slug: "black-conny-hannes29";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-conny-hannes30.mdx": {
	id: "black-conny-hannes30.mdx";
  slug: "black-conny-hannes30";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-conny-hannes31.mdx": {
	id: "black-conny-hannes31.mdx";
  slug: "black-conny-hannes31";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-johanna-kevin1.mdx": {
	id: "black-johanna-kevin1.mdx";
  slug: "black-johanna-kevin1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-johanna-kevin2.mdx": {
	id: "black-johanna-kevin2.mdx";
  slug: "black-johanna-kevin2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-johanna-kevin3.mdx": {
	id: "black-johanna-kevin3.mdx";
  slug: "black-johanna-kevin3";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-johanna-kevin4.mdx": {
	id: "black-johanna-kevin4.mdx";
  slug: "black-johanna-kevin4";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-johanna-kevin5.mdx": {
	id: "black-johanna-kevin5.mdx";
  slug: "black-johanna-kevin5";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-johanna-kevin6.mdx": {
	id: "black-johanna-kevin6.mdx";
  slug: "black-johanna-kevin6";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-sandra-uwe13.mdx": {
	id: "black-sandra-uwe13.mdx";
  slug: "black-sandra-uwe13";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-sandra-uwe14.mdx": {
	id: "black-sandra-uwe14.mdx";
  slug: "black-sandra-uwe14";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-sandra-uwe15.mdx": {
	id: "black-sandra-uwe15.mdx";
  slug: "black-sandra-uwe15";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-sandra-uwe16.mdx": {
	id: "black-sandra-uwe16.mdx";
  slug: "black-sandra-uwe16";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-sandra-uwe17.mdx": {
	id: "black-sandra-uwe17.mdx";
  slug: "black-sandra-uwe17";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-sandra-uwe18.mdx": {
	id: "black-sandra-uwe18.mdx";
  slug: "black-sandra-uwe18";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-sandra-uwe19.mdx": {
	id: "black-sandra-uwe19.mdx";
  slug: "black-sandra-uwe19";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-sandra-uwe20.mdx": {
	id: "black-sandra-uwe20.mdx";
  slug: "black-sandra-uwe20";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-viola-dirk10.mdx": {
	id: "black-viola-dirk10.mdx";
  slug: "black-viola-dirk10";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-viola-dirk11.mdx": {
	id: "black-viola-dirk11.mdx";
  slug: "black-viola-dirk11";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-viola-dirk12.mdx": {
	id: "black-viola-dirk12.mdx";
  slug: "black-viola-dirk12";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-viola-dirk7.mdx": {
	id: "black-viola-dirk7.mdx";
  slug: "black-viola-dirk7";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-viola-dirk8.mdx": {
	id: "black-viola-dirk8.mdx";
  slug: "black-viola-dirk8";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"black-viola-dirk9.mdx": {
	id: "black-viola-dirk9.mdx";
  slug: "black-viola-dirk9";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"details-babett-alex1.mdx": {
	id: "details-babett-alex1.mdx";
  slug: "details-babett-alex1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"details-babett-alex2.mdx": {
	id: "details-babett-alex2.mdx";
  slug: "details-babett-alex2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"details-babett-alex3.mdx": {
	id: "details-babett-alex3.mdx";
  slug: "details-babett-alex3";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"details-babett-alex4.mdx": {
	id: "details-babett-alex4.mdx";
  slug: "details-babett-alex4";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"details-babett-alex5.mdx": {
	id: "details-babett-alex5.mdx";
  slug: "details-babett-alex5";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"details-babett-alex6.mdx": {
	id: "details-babett-alex6.mdx";
  slug: "details-babett-alex6";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"details-deborah-philipp.mdx": {
	id: "details-deborah-philipp.mdx";
  slug: "details-deborah-philipp";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"details-julia-martin1.mdx": {
	id: "details-julia-martin1.mdx";
  slug: "details-julia-martin1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"details-julia-martin2.mdx": {
	id: "details-julia-martin2.mdx";
  slug: "details-julia-martin2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"details-julia-martin3.mdx": {
	id: "details-julia-martin3.mdx";
  slug: "details-julia-martin3";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"details-julia-martin4.mdx": {
	id: "details-julia-martin4.mdx";
  slug: "details-julia-martin4";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"details-julia-martin5.mdx": {
	id: "details-julia-martin5.mdx";
  slug: "details-julia-martin5";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-anita-alex1.mdx": {
	id: "kennenlern-anita-alex1.mdx";
  slug: "kennenlern-anita-alex1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-anita-alex2.mdx": {
	id: "kennenlern-anita-alex2.mdx";
  slug: "kennenlern-anita-alex2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-anita-alex3.mdx": {
	id: "kennenlern-anita-alex3.mdx";
  slug: "kennenlern-anita-alex3";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-annemarie-reda1.mdx": {
	id: "kennenlern-annemarie-reda1.mdx";
  slug: "kennenlern-annemarie-reda1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-annemarie-reda2.mdx": {
	id: "kennenlern-annemarie-reda2.mdx";
  slug: "kennenlern-annemarie-reda2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-annemarie-reda3.mdx": {
	id: "kennenlern-annemarie-reda3.mdx";
  slug: "kennenlern-annemarie-reda3";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-babara-flo.mdx": {
	id: "kennenlern-babara-flo.mdx";
  slug: "kennenlern-babara-flo";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-babett-alex1.mdx": {
	id: "kennenlern-babett-alex1.mdx";
  slug: "kennenlern-babett-alex1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-babett-alex2.mdx": {
	id: "kennenlern-babett-alex2.mdx";
  slug: "kennenlern-babett-alex2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-babett-alex3.mdx": {
	id: "kennenlern-babett-alex3.mdx";
  slug: "kennenlern-babett-alex3";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-deborah-philipp1.mdx": {
	id: "kennenlern-deborah-philipp1.mdx";
  slug: "kennenlern-deborah-philipp1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-deborah-philipp2.mdx": {
	id: "kennenlern-deborah-philipp2.mdx";
  slug: "kennenlern-deborah-philipp2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-deborah-philipp3.mdx": {
	id: "kennenlern-deborah-philipp3.mdx";
  slug: "kennenlern-deborah-philipp3";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-michaela-niko.mdx": {
	id: "kennenlern-michaela-niko.mdx";
  slug: "kennenlern-michaela-niko";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-peter-martin.mdx": {
	id: "kennenlern-peter-martin.mdx";
  slug: "kennenlern-peter-martin";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"kennenlern-verena-jonas1.mdx": {
	id: "kennenlern-verena-jonas1.mdx";
  slug: "kennenlern-verena-jonas1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"party-peter-martin1.mdx": {
	id: "party-peter-martin1.mdx";
  slug: "party-peter-martin1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"party-peter-martin2.mdx": {
	id: "party-peter-martin2.mdx";
  slug: "party-peter-martin2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"party-peter-martin3.mdx": {
	id: "party-peter-martin3.mdx";
  slug: "party-peter-martin3";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-babett-alex1.mdx": {
	id: "trauung-babett-alex1.mdx";
  slug: "trauung-babett-alex1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-babett-alex10.mdx": {
	id: "trauung-babett-alex10.mdx";
  slug: "trauung-babett-alex10";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-babett-alex11.mdx": {
	id: "trauung-babett-alex11.mdx";
  slug: "trauung-babett-alex11";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-babett-alex12.mdx": {
	id: "trauung-babett-alex12.mdx";
  slug: "trauung-babett-alex12";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-babett-alex13.mdx": {
	id: "trauung-babett-alex13.mdx";
  slug: "trauung-babett-alex13";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-babett-alex2.mdx": {
	id: "trauung-babett-alex2.mdx";
  slug: "trauung-babett-alex2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-babett-alex3.mdx": {
	id: "trauung-babett-alex3.mdx";
  slug: "trauung-babett-alex3";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-babett-alex4.mdx": {
	id: "trauung-babett-alex4.mdx";
  slug: "trauung-babett-alex4";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-babett-alex5.mdx": {
	id: "trauung-babett-alex5.mdx";
  slug: "trauung-babett-alex5";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-babett-alex6.mdx": {
	id: "trauung-babett-alex6.mdx";
  slug: "trauung-babett-alex6";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-babett-alex7.mdx": {
	id: "trauung-babett-alex7.mdx";
  slug: "trauung-babett-alex7";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-babett-alex8.mdx": {
	id: "trauung-babett-alex8.mdx";
  slug: "trauung-babett-alex8";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-babett-alex9.mdx": {
	id: "trauung-babett-alex9.mdx";
  slug: "trauung-babett-alex9";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-peter-martin1.mdx": {
	id: "trauung-peter-martin1.mdx";
  slug: "trauung-peter-martin1";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-peter-martin2.mdx": {
	id: "trauung-peter-martin2.mdx";
  slug: "trauung-peter-martin2";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-peter-martin3.mdx": {
	id: "trauung-peter-martin3.mdx";
  slug: "trauung-peter-martin3";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-peter-martin4.mdx": {
	id: "trauung-peter-martin4.mdx";
  slug: "trauung-peter-martin4";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-peter-martin5.mdx": {
	id: "trauung-peter-martin5.mdx";
  slug: "trauung-peter-martin5";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
"trauung-peter-martin6.mdx": {
	id: "trauung-peter-martin6.mdx";
  slug: "trauung-peter-martin6";
  body: string;
  collection: "hochzeitsfotos";
  data: any
} & { render(): Render[".mdx"] };
};
"homepage": {
"-index.mdx": {
	id: "-index.mdx";
  slug: "-index";
  body: string;
  collection: "homepage";
  data: InferEntrySchema<"homepage">
} & { render(): Render[".mdx"] };
};
"igotshot": {
"-index.mdx": {
	id: "-index.mdx";
  slug: "-index";
  body: string;
  collection: "igotshot";
  data: any
} & { render(): Render[".mdx"] };
};
"igotshot-lifetime": {
"KuKuWo17.mdx": {
	id: "KuKuWo17.mdx";
  slug: "kukuwo17";
  body: string;
  collection: "igotshot-lifetime";
  data: any
} & { render(): Render[".mdx"] };
"KuKuWo18.mdx": {
	id: "KuKuWo18.mdx";
  slug: "kukuwo18";
  body: string;
  collection: "igotshot-lifetime";
  data: any
} & { render(): Render[".mdx"] };
"KuKuWo19.mdx": {
	id: "KuKuWo19.mdx";
  slug: "kukuwo19";
  body: string;
  collection: "igotshot-lifetime";
  data: any
} & { render(): Render[".mdx"] };
"KuKuWo20.mdx": {
	id: "KuKuWo20.mdx";
  slug: "kukuwo20";
  body: string;
  collection: "igotshot-lifetime";
  data: any
} & { render(): Render[".mdx"] };
"KuKuWo21.mdx": {
	id: "KuKuWo21.mdx";
  slug: "kukuwo21";
  body: string;
  collection: "igotshot-lifetime";
  data: any
} & { render(): Render[".mdx"] };
"KuKuWo22.mdx": {
	id: "KuKuWo22.mdx";
  slug: "kukuwo22";
  body: string;
  collection: "igotshot-lifetime";
  data: any
} & { render(): Render[".mdx"] };
"KuKuWo23.mdx": {
	id: "KuKuWo23.mdx";
  slug: "kukuwo23";
  body: string;
  collection: "igotshot-lifetime";
  data: any
} & { render(): Render[".mdx"] };
"mmt-big-band.mdx": {
	id: "mmt-big-band.mdx";
  slug: "mmt-big-band";
  body: string;
  collection: "igotshot-lifetime";
  data: any
} & { render(): Render[".mdx"] };
"tv-emmering.mdx": {
	id: "tv-emmering.mdx";
  slug: "tv-emmering";
  body: string;
  collection: "igotshot-lifetime";
  data: any
} & { render(): Render[".mdx"] };
};
"igotshot-photo": {
"bildwerk-olympia-s-bahn.mdx": {
	id: "bildwerk-olympia-s-bahn.mdx";
  slug: "bildwerk-olympia-s-bahn";
  body: string;
  collection: "igotshot-photo";
  data: any
} & { render(): Render[".mdx"] };
"gilchinger-lange-nacht-der-kunst-kultur.mdx": {
	id: "gilchinger-lange-nacht-der-kunst-kultur.mdx";
  slug: "gilchinger-lange-nacht-der-kunst-kultur";
  body: string;
  collection: "igotshot-photo";
  data: any
} & { render(): Render[".mdx"] };
"graffiti-gegen-bomben-auf-wohngebiete.mdx": {
	id: "graffiti-gegen-bomben-auf-wohngebiete.mdx";
  slug: "graffiti-gegen-bomben-auf-wohngebiete";
  body: string;
  collection: "igotshot-photo";
  data: any
} & { render(): Render[".mdx"] };
"guichinger-brauchtum-beach-party-2024.mdx": {
	id: "guichinger-brauchtum-beach-party-2024.mdx";
  slug: "guichinger-brauchtum-beach-party-2024";
  body: string;
  collection: "igotshot-photo";
  data: any
} & { render(): Render[".mdx"] };
"irisfotografie.mdx": {
	id: "irisfotografie.mdx";
  slug: "irisfotografie";
  body: string;
  collection: "igotshot-photo";
  data: any
} & { render(): Render[".mdx"] };
"lichtmalerei-mit-pixelstick-denkmalsommer-in-der-alten-muenze.mdx": {
	id: "lichtmalerei-mit-pixelstick-denkmalsommer-in-der-alten-muenze.mdx";
  slug: "lichtmalerei-mit-pixelstick-denkmalsommer-in-der-alten-muenze";
  body: string;
  collection: "igotshot-photo";
  data: any
} & { render(): Render[".mdx"] };
"maibaum-emmering-2024.mdx": {
	id: "maibaum-emmering-2024.mdx";
  slug: "maibaum-emmering-2024";
  body: string;
  collection: "igotshot-photo";
  data: any
} & { render(): Render[".mdx"] };
"maibaum-gilching-2022.mdx": {
	id: "maibaum-gilching-2022.mdx";
  slug: "maibaum-gilching-2022";
  body: string;
  collection: "igotshot-photo";
  data: any
} & { render(): Render[".mdx"] };
"mind-the-gap-art-beat-revised.mdx": {
	id: "mind-the-gap-art-beat-revised.mdx";
  slug: "mind-the-gap-art-beat-revised";
  body: string;
  collection: "igotshot-photo";
  data: any
} & { render(): Render[".mdx"] };
"return-of-the-boomletters.mdx": {
	id: "return-of-the-boomletters.mdx";
  slug: "return-of-the-boomletters";
  body: string;
  collection: "igotshot-photo";
  data: any
} & { render(): Render[".mdx"] };
"stadtwerke-ffb.mdx": {
	id: "stadtwerke-ffb.mdx";
  slug: "stadtwerke-ffb";
  body: string;
  collection: "igotshot-photo";
  data: any
} & { render(): Render[".mdx"] };
"unruly-ghosts.mdx": {
	id: "unruly-ghosts.mdx";
  slug: "unruly-ghosts";
  body: string;
  collection: "igotshot-photo";
  data: any
} & { render(): Render[".mdx"] };
};
"kontakt": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "kontakt";
  data: any
} & { render(): Render[".md"] };
};
"kreativarchiv": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "kreativarchiv";
  data: any
} & { render(): Render[".md"] };
"filmstation-livestream.mdx": {
	id: "filmstation-livestream.mdx";
  slug: "filmstation-livestream";
  body: string;
  collection: "kreativarchiv";
  data: any
} & { render(): Render[".mdx"] };
"gauting-live.mdx": {
	id: "gauting-live.mdx";
  slug: "gauting-live";
  body: string;
  collection: "kreativarchiv";
  data: any
} & { render(): Render[".mdx"] };
"leuchtkraft.mdx": {
	id: "leuchtkraft.mdx";
  slug: "leuchtkraft";
  body: string;
  collection: "kreativarchiv";
  data: any
} & { render(): Render[".mdx"] };
"peterchens-mondfahrt.mdx": {
	id: "peterchens-mondfahrt.mdx";
  slug: "peterchens-mondfahrt";
  body: string;
  collection: "kreativarchiv";
  data: any
} & { render(): Render[".mdx"] };
"rosezaddach-genesis.mdx": {
	id: "rosezaddach-genesis.mdx";
  slug: "rosezaddach-genesis";
  body: string;
  collection: "kreativarchiv";
  data: any
} & { render(): Render[".mdx"] };
"we-art-one.mdx": {
	id: "we-art-one.mdx";
  slug: "we-art-one";
  body: string;
  collection: "kreativarchiv";
  data: any
} & { render(): Render[".mdx"] };
};
"kundenbereich": {
"-index.mdx": {
	id: "-index.mdx";
  slug: "-index";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"1demoAktuel.mdx": {
	id: "1demoAktuel.mdx";
  slug: "1demoaktuel";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"2demoAlt.mdx": {
	id: "2demoAlt.mdx";
  slug: "2demoalt";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"alex-ricardo.mdx": {
	id: "alex-ricardo.mdx";
  slug: "alex-ricardo";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"alex-tobi.mdx": {
	id: "alex-tobi.mdx";
  slug: "alex-tobi";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"angelina-varol.mdx": {
	id: "angelina-varol.mdx";
  slug: "angelina-varol";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"anita-alex.mdx": {
	id: "anita-alex.mdx";
  slug: "anita-alex";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"ann-kahtrin-bernd.mdx": {
	id: "ann-kahtrin-bernd.mdx";
  slug: "ann-kahtrin-bernd";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"ann-kathrin-chris.mdx": {
	id: "ann-kathrin-chris.mdx";
  slug: "ann-kathrin-chris";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"anne-patrick.mdx": {
	id: "anne-patrick.mdx";
  slug: "anne-patrick";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"anne-stefan.mdx": {
	id: "anne-stefan.mdx";
  slug: "anne-stefan";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"annemarie-reda.mdx": {
	id: "annemarie-reda.mdx";
  slug: "annemarie-reda";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"babara-flo.mdx": {
	id: "babara-flo.mdx";
  slug: "babara-flo";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"babett-alex.mdx": {
	id: "babett-alex.mdx";
  slug: "babett-alex";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"bea-tomislav.mdx": {
	id: "bea-tomislav.mdx";
  slug: "bea-tomislav";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"britta-klaus.mdx": {
	id: "britta-klaus.mdx";
  slug: "britta-klaus";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"carina-thomas.mdx": {
	id: "carina-thomas.mdx";
  slug: "carina-thomas";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"carmen-flo.mdx": {
	id: "carmen-flo.mdx";
  slug: "carmen-flo";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"christian-lisa.mdx": {
	id: "christian-lisa.mdx";
  slug: "christian-lisa";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"corinna-valentin.mdx": {
	id: "corinna-valentin.mdx";
  slug: "corinna-valentin";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"cornelia-hannes.mdx": {
	id: "cornelia-hannes.mdx";
  slug: "cornelia-hannes";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"debbie-philipp.mdx": {
	id: "debbie-philipp.mdx";
  slug: "debbie-philipp";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"dilara-patrick.mdx": {
	id: "dilara-patrick.mdx";
  slug: "dilara-patrick";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"elena-johannes.mdx": {
	id: "elena-johannes.mdx";
  slug: "elena-johannes";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"elisabeth-oliver.mdx": {
	id: "elisabeth-oliver.mdx";
  slug: "elisabeth-oliver";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"emine-hueseyin.mdx": {
	id: "emine-hueseyin.mdx";
  slug: "emine-hueseyin";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"evelyn-matthias.mdx": {
	id: "evelyn-matthias.mdx";
  slug: "evelyn-matthias";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"franzi-moritz.mdx": {
	id: "franzi-moritz.mdx";
  slug: "franzi-moritz";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"franziska-christoph.mdx": {
	id: "franziska-christoph.mdx";
  slug: "franziska-christoph";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"friederike-christian.mdx": {
	id: "friederike-christian.mdx";
  slug: "friederike-christian";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"hanna-anne.mdx": {
	id: "hanna-anne.mdx";
  slug: "hanna-anne";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"hannah-peter.mdx": {
	id: "hannah-peter.mdx";
  slug: "hannah-peter";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"helena-herbert.mdx": {
	id: "helena-herbert.mdx";
  slug: "helena-herbert";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"isabella-romulo.mdx": {
	id: "isabella-romulo.mdx";
  slug: "isabella-romulo";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"jenny-chris.mdx": {
	id: "jenny-chris.mdx";
  slug: "jenny-chris";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"johanna-kevin.mdx": {
	id: "johanna-kevin.mdx";
  slug: "johanna-kevin";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"judith-manfred.mdx": {
	id: "judith-manfred.mdx";
  slug: "judith-manfred";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"julia-martin.mdx": {
	id: "julia-martin.mdx";
  slug: "julia-martin";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"lisa-daniel.mdx": {
	id: "lisa-daniel.mdx";
  slug: "lisa-daniel";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"maike-normen.mdx": {
	id: "maike-normen.mdx";
  slug: "maike-normen";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"mareike-niklas.mdx": {
	id: "mareike-niklas.mdx";
  slug: "mareike-niklas";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"mariana-mario.mdx": {
	id: "mariana-mario.mdx";
  slug: "mariana-mario";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"marianne-andreas.mdx": {
	id: "marianne-andreas.mdx";
  slug: "marianne-andreas";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"marion-rainer.mdx": {
	id: "marion-rainer.mdx";
  slug: "marion-rainer";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"marion-veit.mdx": {
	id: "marion-veit.mdx";
  slug: "marion-veit";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"mayumi-lennart.mdx": {
	id: "mayumi-lennart.mdx";
  slug: "mayumi-lennart";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"michaela-nico.mdx": {
	id: "michaela-nico.mdx";
  slug: "michaela-nico";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"monika-andrew.mdx": {
	id: "monika-andrew.mdx";
  slug: "monika-andrew";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"monika-marc.mdx": {
	id: "monika-marc.mdx";
  slug: "monika-marc";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"monika-stephan.mdx": {
	id: "monika-stephan.mdx";
  slug: "monika-stephan";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"neolie-thomas.mdx": {
	id: "neolie-thomas.mdx";
  slug: "neolie-thomas";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"nicola-wassim.mdx": {
	id: "nicola-wassim.mdx";
  slug: "nicola-wassim";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"niculina-michael.mdx": {
	id: "niculina-michael.mdx";
  slug: "niculina-michael";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"patricia-markus.mdx": {
	id: "patricia-markus.mdx";
  slug: "patricia-markus";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"peter-martin.mdx": {
	id: "peter-martin.mdx";
  slug: "peter-martin";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"roswitha-edgar.mdx": {
	id: "roswitha-edgar.mdx";
  slug: "roswitha-edgar";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"sabine-andreas.mdx": {
	id: "sabine-andreas.mdx";
  slug: "sabine-andreas";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"sabine-guenter.mdx": {
	id: "sabine-guenter.mdx";
  slug: "sabine-guenter";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"sabine-markus.mdx": {
	id: "sabine-markus.mdx";
  slug: "sabine-markus";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"sabrina-florian.mdx": {
	id: "sabrina-florian.mdx";
  slug: "sabrina-florian";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"sabrina-stefano.mdx": {
	id: "sabrina-stefano.mdx";
  slug: "sabrina-stefano";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"sandra-uwe.mdx": {
	id: "sandra-uwe.mdx";
  slug: "sandra-uwe";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"sandra.mdx": {
	id: "sandra.mdx";
  slug: "sandra";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"selina-fredi.mdx": {
	id: "selina-fredi.mdx";
  slug: "selina-fredi";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"simone-michael.mdx": {
	id: "simone-michael.mdx";
  slug: "simone-michael";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"steffi-felix.mdx": {
	id: "steffi-felix.mdx";
  slug: "steffi-felix";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"stephie-tobi.mdx": {
	id: "stephie-tobi.mdx";
  slug: "stephie-tobi";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"susann-bernhard.mdx": {
	id: "susann-bernhard.mdx";
  slug: "susann-bernhard";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"susanne-michael.mdx": {
	id: "susanne-michael.mdx";
  slug: "susanne-michael";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"taiana-michael.mdx": {
	id: "taiana-michael.mdx";
  slug: "taiana-michael";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"tanja-franz.mdx": {
	id: "tanja-franz.mdx";
  slug: "tanja-franz";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"tanja-johannes.mdx": {
	id: "tanja-johannes.mdx";
  slug: "tanja-johannes";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"tanja-taylan.mdx": {
	id: "tanja-taylan.mdx";
  slug: "tanja-taylan";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"tanja-tobi.mdx": {
	id: "tanja-tobi.mdx";
  slug: "tanja-tobi";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"tatjana-fabian.mdx": {
	id: "tatjana-fabian.mdx";
  slug: "tatjana-fabian";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"tetyana-vladimir.mdx": {
	id: "tetyana-vladimir.mdx";
  slug: "tetyana-vladimir";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"uwe-sandra.mdx": {
	id: "uwe-sandra.mdx";
  slug: "uwe-sandra";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"uwe.mdx": {
	id: "uwe.mdx";
  slug: "uwe";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"viola-dirk.mdx": {
	id: "viola-dirk.mdx";
  slug: "viola-dirk";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
"yvonne-daniel.mdx": {
	id: "yvonne-daniel.mdx";
  slug: "yvonne-daniel";
  body: string;
  collection: "kundenbereich";
  data: any
} & { render(): Render[".mdx"] };
};
"landingpage": {
"hochzeitsfotograf-fuerstenfeldbruck.mdx": {
	id: "hochzeitsfotograf-fuerstenfeldbruck.mdx";
  slug: "hochzeitsfotograf-fuerstenfeldbruck";
  body: string;
  collection: "landingpage";
  data: any
} & { render(): Render[".mdx"] };
"hochzeitsfotograf-germering.mdx": {
	id: "hochzeitsfotograf-germering.mdx";
  slug: "hochzeitsfotograf-germering";
  body: string;
  collection: "landingpage";
  data: any
} & { render(): Render[".mdx"] };
"hochzeitsfotograf-gilching.mdx": {
	id: "hochzeitsfotograf-gilching.mdx";
  slug: "hochzeitsfotograf-gilching";
  body: string;
  collection: "landingpage";
  data: any
} & { render(): Render[".mdx"] };
"hochzeitsfotograf-olching.mdx": {
	id: "hochzeitsfotograf-olching.mdx";
  slug: "hochzeitsfotograf-olching";
  body: string;
  collection: "landingpage";
  data: any
} & { render(): Render[".mdx"] };
"hochzeitsfotograf-starnberg.mdx": {
	id: "hochzeitsfotograf-starnberg.mdx";
  slug: "hochzeitsfotograf-starnberg";
  body: string;
  collection: "landingpage";
  data: any
} & { render(): Render[".mdx"] };
};
"pages": {
"datenschutz.mdx": {
	id: "datenschutz.mdx";
  slug: "datenschutz";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdx"] };
"privacy-policy.md": {
	id: "privacy-policy.md";
  slug: "privacy-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
"sitemap.mdx": {
	id: "sitemap.mdx";
  slug: "sitemap";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdx"] };
"w50jahre.mdx": {
	id: "w50jahre.mdx";
  slug: "w50jahre";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdx"] };
};
"partyofone-timeline": {
"2024.02.02.mdx": {
	id: "2024.02.02.mdx";
  slug: "20240202";
  body: string;
  collection: "partyofone-timeline";
  data: any
} & { render(): Render[".mdx"] };
};
"preise": {
"wedding-all.md": {
	id: "wedding-all.md";
  slug: "wedding-all";
  body: string;
  collection: "preise";
  data: any
} & { render(): Render[".md"] };
"wedding-one.md": {
	id: "wedding-one.md";
  slug: "wedding-one";
  body: string;
  collection: "preise";
  data: any
} & { render(): Render[".md"] };
};
"sections": {
"InfoBilderAusgelagert.mdx": {
	id: "InfoBilderAusgelagert.mdx";
  slug: "infobilderausgelagert";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".mdx"] };
"InfoBilderHochzeit.mdx": {
	id: "InfoBilderHochzeit.mdx";
  slug: "infobilderhochzeit";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".mdx"] };
"call-to-action-kennenlern.mdx": {
	id: "call-to-action-kennenlern.mdx";
  slug: "call-to-action-kennenlern";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".mdx"] };
"impressum.md": {
	id: "impressum.md";
  slug: "impressum";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"testimonial.md": {
	id: "testimonial.md";
  slug: "testimonial";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
};
"testimonial": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "testimonial";
  data: any
} & { render(): Render[".md"] };
};
"tv-emmering": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "tv-emmering";
  data: any
} & { render(): Render[".md"] };
"bayerische-u16-blockwettkampf.mdx": {
	id: "bayerische-u16-blockwettkampf.mdx";
  slug: "bayerische-u16-blockwettkampf";
  body: string;
  collection: "tv-emmering";
  data: any
} & { render(): Render[".mdx"] };
"freies-training.mdx": {
	id: "freies-training.mdx";
  slug: "freies-training";
  body: string;
  collection: "tv-emmering";
  data: any
} & { render(): Render[".mdx"] };
"geraeteturnen-c-jugend-1-liga.mdx": {
	id: "geraeteturnen-c-jugend-1-liga.mdx";
  slug: "geraeteturnen-c-jugend-1-liga";
  body: string;
  collection: "tv-emmering";
  data: any
} & { render(): Render[".mdx"] };
"geraeteturnen-c-jugend-3-liga.mdx": {
	id: "geraeteturnen-c-jugend-3-liga.mdx";
  slug: "geraeteturnen-c-jugend-3-liga";
  body: string;
  collection: "tv-emmering";
  data: any
} & { render(): Render[".mdx"] };
"geraeteturnen-d-jugend-2-liga.mdx": {
	id: "geraeteturnen-d-jugend-2-liga.mdx";
  slug: "geraeteturnen-d-jugend-2-liga";
  body: string;
  collection: "tv-emmering";
  data: any
} & { render(): Render[".mdx"] };
"leichtathletik-wettkampf-6bis11-jahren.mdx": {
	id: "leichtathletik-wettkampf-6bis11-jahren.mdx";
  slug: "leichtathletik-wettkampf-6bis11-jahren";
  body: string;
  collection: "tv-emmering";
  data: any
} & { render(): Render[".mdx"] };
"portraits-und-gruppenbilder-leichtathletik.mdx": {
	id: "portraits-und-gruppenbilder-leichtathletik.mdx";
  slug: "portraits-und-gruppenbilder-leichtathletik";
  body: string;
  collection: "tv-emmering";
  data: any
} & { render(): Render[".mdx"] };
"taekwondo-training-2.mdx": {
	id: "taekwondo-training-2.mdx";
  slug: "taekwondo-training-2";
  body: string;
  collection: "tv-emmering";
  data: any
} & { render(): Render[".mdx"] };
"taekwondo-training.mdx": {
	id: "taekwondo-training.mdx";
  slug: "taekwondo-training";
  body: string;
  collection: "tv-emmering";
  data: any
} & { render(): Render[".mdx"] };
};
"tv-emmering-timline": {
"2024.02.02.mdx": {
	id: "2024.02.02.mdx";
  slug: "20240202";
  body: string;
  collection: "tv-emmering-timline";
  data: any
} & { render(): Render[".mdx"] };
"2024.02.04.mdx": {
	id: "2024.02.04.mdx";
  slug: "20240204";
  body: string;
  collection: "tv-emmering-timline";
  data: any
} & { render(): Render[".mdx"] };
"2024.11.03.mdx": {
	id: "2024.11.03.mdx";
  slug: "20241103";
  body: string;
  collection: "tv-emmering-timline";
  data: any
} & { render(): Render[".mdx"] };
"2025.01.01.mdx": {
	id: "2025.01.01.mdx";
  slug: "20250101";
  body: string;
  collection: "tv-emmering-timline";
  data: any
} & { render(): Render[".mdx"] };
};
"weristcv": {
"-index.mdx": {
	id: "-index.mdx";
  slug: "-index";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"7welle1.mdx": {
	id: "7welle1.mdx";
  slug: "7welle1";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"7welle2.mdx": {
	id: "7welle2.mdx";
  slug: "7welle2";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"7welle3.mdx": {
	id: "7welle3.mdx";
  slug: "7welle3";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"7welle4.mdx": {
	id: "7welle4.mdx";
  slug: "7welle4";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"7welle5.mdx": {
	id: "7welle5.mdx";
  slug: "7welle5";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"demo.mdx": {
	id: "demo.mdx";
  slug: "demo";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"frank.mdx": {
	id: "frank.mdx";
  slug: "frank";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"kukuwo.mdx": {
	id: "kukuwo.mdx";
  slug: "kukuwo";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"maibaum-emmering.mdx": {
	id: "maibaum-emmering.mdx";
  slug: "maibaum-emmering";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"mazal-alianz.mdx": {
	id: "mazal-alianz.mdx";
  slug: "mazal-alianz";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"mazal-neunkirchen.mdx": {
	id: "mazal-neunkirchen.mdx";
  slug: "mazal-neunkirchen";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"mazal-neunkirchen2.mdx": {
	id: "mazal-neunkirchen2.mdx";
  slug: "mazal-neunkirchen2";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"mazal-pinakothek.mdx": {
	id: "mazal-pinakothek.mdx";
  slug: "mazal-pinakothek";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"mfvc.mdx": {
	id: "mfvc.mdx";
  slug: "mfvc";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"mfvc2.mdx": {
	id: "mfvc2.mdx";
  slug: "mfvc2";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"mfvc3.mdx": {
	id: "mfvc3.mdx";
  slug: "mfvc3";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"mfvc4.mdx": {
	id: "mfvc4.mdx";
  slug: "mfvc4";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"mfvc5.mdx": {
	id: "mfvc5.mdx";
  slug: "mfvc5";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"mmt.mdx": {
	id: "mmt.mdx";
  slug: "mmt";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"stadwerke.mdx": {
	id: "stadwerke.mdx";
  slug: "stadwerke";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"tve1.mdx": {
	id: "tve1.mdx";
  slug: "tve1";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"tve2.mdx": {
	id: "tve2.mdx";
  slug: "tve2";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"wolf1.mdx": {
	id: "wolf1.mdx";
  slug: "wolf1";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
"wolf2.mdx": {
	id: "wolf2.mdx";
  slug: "wolf2";
  body: string;
  collection: "weristcv";
  data: any
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
