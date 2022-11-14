interface Event {
	id: number;
	attributes: {
		title: string;
		description: string;
		startDate: string;
		endDate: string;
	};
}

export type { Event };
