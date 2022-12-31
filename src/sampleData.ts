import { HabitNode } from "./components/Habit"

export const tasks: HabitNode[] = [
    {
      name: "Write a blog post",
      description: "",
      goal: 1,
      timeframe: "week",
      progress: {
        dates: [],
        recordStreak: 0
      }
    },
    {
      name: "Take a walk",
      description: "",
      goal: 3,
      timeframe: "week",
      progress: {
        dates: [],
        recordStreak: 0
      }
    },
    {
      name: "Fix my bed",
      description: "Don't forget to fold lap blanket",
      goal: 1,
      timeframe: "day",
      progress: {
        dates: [
          {
            date: new Date(2022, 12, 30),
            count: 1,
            goal: 1
          },
          {
            date: new Date(2022, 12, 29),
            count: 1,
            goal: 1
          }

        ],
        recordStreak: 0
      }
    },
    {
      name: "Cook a healthy meal",
      description: "",
      goal: 3,
      timeframe: "week",
      progress: {
        dates: [],
        recordStreak: 0
      }
    },
    {
      name: "Read for 20 mins",
      description: "",
      goal: 1,
      timeframe: "day",
      progress: {
        dates: [],
        recordStreak: 0
      }
    },
    {
      name: "Visit parents",
      description: "",
      goal: 1,
      timeframe: "month",
      progress: {
        dates: [],
        recordStreak: 0
      }
    }
  ]