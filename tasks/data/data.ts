export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: "radix-icons:question-mark-circled",
    amount: 10,
  },
  {
    value: "todo",
    label: "Todo",
    icon: `material-symbols:circle-outline`,
    amount: 20,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: `solar:stopwatch-linear`,
    amount: 12,
  },
  {
    value: "done",
    label: "Done",
    icon: `iconoir:check-circled-outline`,
    amount: 12,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: `radix-icons:cross-circled`,
    amount: 12,
  },
];

export const priorities = [
  {
    value: "low",
    label: "Low",
    icon: `formkit:arrowdown`,
    amount: 5,
  },
  {
    value: "medium",
    label: "Medium",
    icon: `formkit:arrowright`,
    amount: 15,
  },
  {
    value: "high",
    label: "High",
    icon: `formkit:arrowup`,
    amount: 25,
  },
];
