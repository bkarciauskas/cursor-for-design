export type ReviewStatus = "approved" | "changes" | "in-review" | "blocked";

export type Review = {
  id: string;
  title: string;
  project: string;
  status: ReviewStatus;
  author: string;
  reviewers: string[];
  comments: number;
  updated: string;
  coverage: number;
};

export const statusMeta: Record<
  ReviewStatus,
  { label: string; tone: "success" | "warning" | "info" | "danger" }
> = {
  approved: { label: "Approved", tone: "success" },
  changes: { label: "Changes requested", tone: "warning" },
  "in-review": { label: "In review", tone: "info" },
  blocked: { label: "Blocked", tone: "danger" },
};

export const reviews: Review[] = [
  {
    id: "LP-412",
    title: "Checkout — one-page flow",
    project: "Payments",
    status: "in-review",
    author: "Mara Ellis",
    reviewers: ["Dev Shah", "Ines Kova", "Tom Byrne"],
    comments: 14,
    updated: "12 minutes ago",
    coverage: 82,
  },
  {
    id: "LP-408",
    title: "Empty states for Insights",
    project: "Analytics",
    status: "changes",
    author: "Dev Shah",
    reviewers: ["Mara Ellis"],
    comments: 6,
    updated: "1 hour ago",
    coverage: 44,
  },
  {
    id: "LP-401",
    title: "Mobile nav — bottom sheet",
    project: "Core",
    status: "approved",
    author: "Ines Kova",
    reviewers: ["Mara Ellis", "Tom Byrne"],
    comments: 21,
    updated: "3 hours ago",
    coverage: 96,
  },
  {
    id: "LP-397",
    title: "Billing plan comparison table",
    project: "Payments",
    status: "blocked",
    author: "Tom Byrne",
    reviewers: ["Dev Shah", "Ines Kova"],
    comments: 9,
    updated: "Yesterday",
    coverage: 31,
  },
  {
    id: "LP-395",
    title: "Notification preferences",
    project: "Core",
    status: "approved",
    author: "Mara Ellis",
    reviewers: ["Ines Kova"],
    comments: 4,
    updated: "Yesterday",
    coverage: 88,
  },
  {
    id: "LP-390",
    title: "Onboarding checklist v2",
    project: "Growth",
    status: "in-review",
    author: "Dev Shah",
    reviewers: ["Mara Ellis", "Tom Byrne", "Ines Kova"],
    comments: 11,
    updated: "2 days ago",
    coverage: 67,
  },
];

export type ActivityItem = {
  id: string;
  person: string;
  action: string;
  target: string;
  time: string;
};

export const activity: ActivityItem[] = [
  {
    id: "a1",
    person: "Ines Kova",
    action: "approved",
    target: "Mobile nav — bottom sheet",
    time: "8m",
  },
  {
    id: "a2",
    person: "Dev Shah",
    action: "requested changes on",
    target: "Checkout — one-page flow",
    time: "24m",
  },
  {
    id: "a3",
    person: "Mara Ellis",
    action: "published 3 variants to",
    target: "Loop / Button",
    time: "1h",
  },
  {
    id: "a4",
    person: "Tom Byrne",
    action: "detached 2 instances in",
    target: "Billing plan comparison",
    time: "2h",
  },
  {
    id: "a5",
    person: "Dev Shah",
    action: "linked a code component to",
    target: "Loop / StatCard",
    time: "4h",
  },
];

export type LibraryComponent = {
  name: string;
  variants: number;
  instances: number;
  adoption: number;
  linked: boolean;
};

export const libraryComponents: LibraryComponent[] = [
  { name: "Button", variants: 12, instances: 486, adoption: 97, linked: true },
  { name: "Badge", variants: 6, instances: 312, adoption: 94, linked: true },
  { name: "Card", variants: 3, instances: 208, adoption: 91, linked: true },
  { name: "StatCard", variants: 2, instances: 64, adoption: 78, linked: true },
  { name: "Avatar", variants: 3, instances: 190, adoption: 88, linked: true },
  { name: "Progress", variants: 4, instances: 41, adoption: 62, linked: false },
  { name: "Table row", variants: 5, instances: 154, adoption: 71, linked: false },
];

export const teamMembers = ["Mara Ellis", "Dev Shah", "Ines Kova", "Tom Byrne"];

/* Weekly review throughput, used by the dashboard sparkline. */
export const throughput = [12, 18, 15, 24, 21, 30, 27, 34, 29, 38, 41, 36];
