const issuesData = {
  1: {
    id: 1,
    name: "Issue A: Bug in login module",
    project: "Project Alpha",
    projectId: "ALPHA-001",
    status: "Open",
    priority: "High",
    type: "Bug",
    assignedTo: "Developer 1",
    reportedBy: "Tester 1",
    description:
      "Users are unable to log in after the recent update. The login button is unresponsive, and no error messages are displayed. This is a critical bug affecting all users.",
    implementationPlan:
      "Investigate login module code. Check recent changes. Debug authentication flow. Implement fix and test thoroughly.",
    comments: [
      {
        id: 1,
        author: "User 1",
        text: "I am also experiencing this issue. It started yesterday.",
      },
      {
        id: 2,
        author: "User 2",
        text: "Confirmed. Affects both Chrome and Firefox.",
      },
    ],
    attachedDocuments: ["login_bug_report.pdf", "auth_flow_diagram.png"],
  },
  2: {
    id: 2,
    name: "Issue B: Database connection error",
    project: "Project Beta",
    projectId: "BETA-002",
    status: "Closed",
    priority: "Medium",
    type: "Bug",
    assignedTo: "Developer 2",
    reportedBy: "Tester 2",
    description:
      "The application occasionally loses connection to the database, resulting in data retrieval failures. This was resolved by restarting the database server.",
    implementationPlan:
      "Review database connection pooling. Monitor database server logs for anomalies. Optimize queries if necessary.",
    comments: [
      {
        id: 3,
        author: "User 3",
        text: "This happened to me last week as well.",
      },
    ],
    attachedDocuments: ["db_error_logs.txt"],
  },
  3: {
    id: 3,
    name: "Issue C: Performance degradation on dashboard",
    project: "Project Alpha",
    projectId: "ALPHA-001",
    status: "In Progress",
    priority: "High",
    type: "Performance",
    assignedTo: "Developer 3",
    reportedBy: "Tester 1",
    description:
      "The dashboard loading time has significantly increased, especially for users with a large amount of data. Investigation is ongoing to identify the bottleneck.",
    implementationPlan:
      "Profile dashboard performance. Identify slow queries/components. Implement caching mechanisms. Optimize data fetching.",
    comments: [],
    attachedDocuments: [],
  },
  4: {
    id: 4,
    name: "Issue D: UI alignment issue",
    project: "Project Gamma",
    projectId: "GAMMA-003",
    status: "Open",
    priority: "Low",
    type: "UI/UX",
    assignedTo: "Developer 1",
    reportedBy: "Tester 2",
    description:
      "Minor UI alignment issues have been observed on various pages, affecting the visual consistency of the application. This is a low-priority cosmetic issue.",
    implementationPlan:
      "Adjust CSS properties for misaligned elements. Ensure responsiveness across different screen sizes.",
    comments: [],
    attachedDocuments: ["ui_screenshot_1.png", "ui_screenshot_2.png"],
  },
  5: {
    id: 5,
    name: "Issue E: API response time slow",
    project: "Project Beta",
    projectId: "BETA-002",
    status: "Open",
    priority: "High",
    type: "Performance",
    assignedTo: "Developer 2",
    reportedBy: "Tester 1",
    description:
      "The API response times are consistently slow, impacting the overall responsiveness of the application. This is a high-priority performance issue.",
    implementationPlan:
      "Analyze API endpoints for bottlenecks. Optimize database queries. Implement rate limiting if necessary.",
    comments: [],
    attachedDocuments: ["api_performance_report.pdf"],
  },
};

const developers = [
  { id: 1, name: "Developer 1" },
  { id: 2, name: "Developer 2" },
  { id: 3, name: "Developer 3" },
];

export { issuesData, developers };
