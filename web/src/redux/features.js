const FEATURES = [
    {
        id: 1,
        image: "images/customer.jpg",
        imageAlt: "Customer Management",
        title: "Customer Management",
        highlights: [
            "Quickbooks integration: maintain customer information in just one location",
            "Schedule follow-up sales calls, e.g. bimonthly or seasonal sign rental reminders",
            "Maintain history of all past sign rentals (site photos captured via mobile application)",
        ]
    },
    {
        id: 2,
        image: "images/todo.jpg",
        imageAlt: "Scheduling Management",
        title: "Scheduling Management",
        highlights: [
            "One or multiple drivers - assistance with route planning",
            "Deliveries, Pickups, Changes",
            [
                "Color coded by category",
                "Grouped by driver",
                "Status updated via mobile application",
            ]
        ]
    },
    {
        id: 3,
        image: "images/mobapps.png",
        imageAlt: "Mobile Application",
        title: "Mobile Application",
        highlights: [
            "Map to help the driver get to the destination",
            "Instructions and layout to place and set up the sign correctly",
            "Camera integration for confirmation of placement and later verification of layout",
        ]
    },
    {
        id: 4,
        image: "images/reports.png",
        imageAlt: "Reports Management",
        title: "Reports",
        highlights: [
            "Inventory shows where all signs are currently located",
            "Customer history shows rental/payment history for a customer",
            "Collections - 30, 60, 90 days past due",
        ]
    }
];

export const Features = (state = FEATURES, action) => {
    switch (action.type) {
        default:
            return state;
    }
};