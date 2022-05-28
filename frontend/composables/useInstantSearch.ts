export interface SearchResult {
	uid: string;
	name: string;
}

export const useInstantSearch = () => {
	const searchResults = ref<SearchResult[]>([]);

	const query = async (query: string) => {
		const projectId = 'P1PDUUXBC5';
		const indexName = 'user_name';
		const url = `https://${projectId}-dsn.algolia.net/1/indexes/${indexName}/query`;

		const headers = new Headers();
		headers.append('X-Algolia-Application-Id', projectId);
		headers.append('X-Algolia-API-Key', 'd211df24e7860c3fc5a294e20f6a1ee8');
		headers.append('Content-Type', 'application/json; charset=UTF-8');

		const res = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				params: `query=${query}`,
			}),
		});

		const json: {
			hits: { name: string; objectID: string }[];
		} = await res.json();

		searchResults.value = json.hits.map(({ name, objectID }) => ({
			uid: objectID,
			name,
		}));
	};

	return { query, searchResults };
};
