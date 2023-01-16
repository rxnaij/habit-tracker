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
      description: "Go to the park and back",
      goal: 3,
      timeframe: "week",
      progress: {
        dates: [],
        recordStreak: 0
      }
    },
    {
      name: "Fix my bed",
      description: "Don't forget to fold lap blanket. Also, this is a long description. We're going to test out how long the text goes in order to see the line height.",
      goal: 1,
      timeframe: "day",
      progress: {
        // only store dates when count > 0 (this means a habit was tracked on that day)
        dates: [
          {
            date: new Date(2022, 11, 30),
            count: 1,
            goal: 1
          },
          {
            date: new Date(2022, 11, 29),
            count: 2,
            goal: 1
          },
          {
            date: new Date(2022, 11, 26),
            count: 3,
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