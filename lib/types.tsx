interface Event {
	id: number;
	attributes: {
		title: string;
		description: string;
		startDate: string;
		endDate: string;
		startTime: string;
		endTime?: string;
	};
}

//singular form of News
interface New {
	id: number;
	attributes: {
		title: string;
		description: string;
		image: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
		updatedAt: string;
	};
}

interface Schedule {
	id: number;
	attributes: {
		name: string;
		periods: {
			name: string;
			startTime: string;
			endTime: string;
		}[];
	};
}

interface Carousel {
	id: number;
	attributes: {
		description: string;
		image: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
	};
}

interface NavLink {
	id: number;
	attributes: {
		name: string;
		link: string;
		links: NavDropdownLink[];
		image: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
	};
}

interface NavDropdownLink {
	id: number;
	attributes: {
		text: string;
		link: string;
	};
}

interface FooterBadge {
	id: number;
	attributes: {
		image: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
		link: string;
	};
}

interface Page {
	id: number;
	attributes: {
		slug: string;
		title: string;
		content: string;
	};
}

interface HomePage {
	id: number;
	attributes: {
		title: string;
		caption: string;
		video: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
	};
}

interface BusRoute {
	attributes: {
		image: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
		routes: {
			data: {
				attributes: {
					name: string;
					description: string;
					url: string;
				};
			}[];
		};
	};
}

interface Department {
	id: number;
	attributes: {
		name: string;
		rank: number;
		slug: string;
		content: string;
		image: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
	};
}

export type {
	Event,
	New,
	Carousel,
	Schedule,
	NavLink,
	NavDropdownLink,
	FooterBadge,
	Page,
	HomePage,
	BusRoute,
	Department,
};
