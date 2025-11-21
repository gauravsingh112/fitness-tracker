export const masterPlan = {
    user: {
        name: "Gaurav Singh",
        startWeight: 90,
        goalWeight: 75,
        startDate: new Date().toISOString(),
    },
    diet: {
        meals: [
            {
                id: 1,
                name: "Morning Kickstart",
                time: "08:00 AM",
                options: [
                    "Warm Water + 1/2 Lemon + Salt",
                    "5-6 Soaked Almonds + 1 Walnut"
                ]
            },
            {
                id: 2,
                name: "Breakfast",
                time: "09:30 AM",
                options: [
                    "3 Whole Eggs + 1 Toast + Black Coffee",
                    "1 Scoop Whey + Oatmeal (40g)",
                    "Paneer Bhurji (100g) + 1 Roti"
                ]
            },
            {
                id: 3,
                name: "Lunch",
                time: "01:30 PM",
                options: [
                    "2 Rotis + Dal + 100g Paneer/Chicken + Salad",
                    "Rice + Rajma + Curd + Salad"
                ]
            },
            {
                id: 4,
                name: "Pre-Workout",
                time: "06:00 PM",
                options: [
                    "1 Banana OR Toast + Peanut Butter",
                    "Black Coffee + Creatine"
                ]
            },
            {
                id: 5,
                name: "Post-Workout",
                time: "09:15 PM",
                options: [
                    "1 Scoop Whey Protein Isolate (Water)"
                ]
            },
            {
                id: 6,
                name: "Dinner",
                time: "10:00 PM",
                options: [
                    "Big Salad + 100g Grilled Paneer/Chicken",
                    "Dal (Moong) + Sautéed Veggies",
                    "3 Egg Whites + 1 Whole Egg Bhurji + Salad"
                ]
            }
        ]
    },
    workout: {
        schedule: [
            { day: "Monday", focus: "PUSH (Chest, Shoulders, Triceps)", exercises: ["Flat Press", "Incline Press", "OH Press", "Lateral Raises", "Tricep Pushdowns", "Push-ups", "15m Incline Walk"] },
            { day: "Tuesday", focus: "PULL (Back, Biceps)", exercises: ["Lat Pulldowns", "Cable Row", "DB Row", "Face Pulls", "Bicep Curls", "Hammer Curls", "15m Elliptical"] },
            { day: "Wednesday", focus: "LEGS (Quads, Hams)", exercises: ["Squats", "Leg Press", "Leg Ext", "Leg Curls", "Calf Raises", "Plank"] },
            { day: "Thursday", focus: "PUSH (Upper Chest/Delts)", exercises: ["Incline Press", "Flys", "Arnold Press", "Front Raises", "Skull Crushers", "15m Incline Walk"] },
            { day: "Friday", focus: "PULL (Thickness/Arms)", exercises: ["Pull-ups/Lat Pulls", "T-Bar Row", "Shrugs", "Preacher Curls", "Reverse Curls", "15m Elliptical"] },
            { day: "Saturday", focus: "LEGS (Posterior Chain)", exercises: ["Deadlifts", "Walking Lunges", "Heavy Leg Press", "Seated Leg Curls", "Calf Raises", "Leg Raises"] },
            { day: "Sunday", focus: "REST / Active Recovery", exercises: ["Light Walk", "Stretching", "Meal Prep"] }
        ]
    },
    habits: [
        { id: "h1", name: "Sleep 6 Hours", target: 1 },
        { id: "h2", name: "Drink 3L Water", target: 1 },
        { id: "h3", name: "Creatine (5g)", target: 1 },
        { id: "h4", name: "No Sugar", target: 1 }
    ]
};
