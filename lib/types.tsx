interface Event {
	id: number;
	attributes: {
		title: string;
		description: string;
		startDate: string;
		endDate: string;
		startTime: string;
		endTime?: string;
		location?: string;
	};
}

//singular form of News
interface New {
	id: number;
	attributes: {
		title: string;
		description: string;
		rank: number;
		link: string;
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
		principal: string;
		caption: string;
		text: string;
		text2: string;
		Resources: string;
		Directions: string;
		Calendar: string;
		Achievements: string;
		SCO: string;
		video: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
	};
}

interface AboutPage {
	id: number;
	attributes: {
		text: string;
		image: {
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
		phone: string;
		overrideLink: string;
		resource: {
			data: Staff;
		};
		staff: {
			data: Staff[];
		};
		image: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
	};
}

interface Resource {
	id: number;
	attributes: {
		name: string;
		link: string;
		description: string;
		rank: number;
		student: boolean;
		parent: boolean;
		staff: boolean;
	};
}

interface Staff {
	id: number;
	attributes: {
		name: string;
		email: string;
		title: string;
		phone: string;
		departments: {
			data: Department[];
		};
		rank: number;
		image: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
	};
}

interface Link {
	id: number;
	attributes: {
		name: string;
		link: string;
		quicklink: boolean;
		order: number | null;
	};
}

interface Badge {
	id: number;
	attributes: {
		name: string;
		link: string;
		image: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
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

interface Admin {
	id: number;
	attributes: {
		admin: {
			data: Staff[];
		};
		resources: {
			data: Staff[];
		};
		other: {
			data: Staff[];
		};
	};
}

interface Days { //multiple days (the whole content-type)
	id: number;
	attributes: {
		startDate: string;
		startDateType: string;
		endDate: string;
		endDateType: string;
		days: {
			id: number;
			title: string;
			date: string;
			endDate: string;
			type: string;
		}[];
	}
}

interface Day { //one day (the component)
	id: number;
	type: string;
	title: string;
	date: string;
	endDate: string;
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
	AboutPage,
	BusRoute,
	Department,
	Resource,
	Staff,
	Link,
	Badge,
	Admin,
	Days,
	Day,
};
