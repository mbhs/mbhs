interface Event {
	id: number;
	attributes: {
		title: string;
		description: string;
		startDate: string;
		endDate: string;
	};
}

//singular form of News
interface New {
	id: number;
	attributes: {
		title: string;
		description: string;
	};
}

export type { Event, New };
