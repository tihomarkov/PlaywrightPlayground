// id formatting
function formatRequestId(id: number, prefix = 'REQ'): string {
  return `${prefix}-${String(id)}`;
}

// SLA calculation
function calculateSlaHours(priority: string): string {
  switch (priority) {
    case '1':
      return 'SLA up to 4h!';
    case '2':
      return 'SLA up to 24!';
    case '3':
      return 'SLA up to 72h!';
    default:
      return 'SLA up to 168h!';
  }
}

// overdue check
function isOverdue(elapsedHours: number, slaHours: number): boolean {
  return elapsedHours > slaHours;
}

// title validation (5–100 characters)
function isValidTitle(title: string): boolean {
  const length = title.trim().length;
  return length >= 5 && length <= 100;
}

// category check against an allowed list
function isAllowedCategory(category: string, allowedCategories: string[]): boolean {
  return allowedCategories.includes(category);
}

// summary text
function buildRequestSummary(formattedId: string, title: string, status: string): string {
  return `[${formattedId}] ${title} (${status})`;
}

// Hard-coded Requests & Report
const allowedCategories = ['Network', 'Hardware', 'Access', 'Software'];

const requests = [
  { id: 101, title: 'Server down in main office', category: 'Network', priority: '1', elapsedHours: 6, slaHours: 4, status: 'In Review' },
  { id: 102, title: 'Password reset for new user', category: 'Access', priority: '2', elapsedHours: 5, slaHours: 24, status: 'Resolved' },
  { id: 103, title: 'VPN connection issue', category: 'Network', priority: '2', elapsedHours: 30, slaHours: 24, status: 'Waiting for Info' },
  { id: 104, title: 'Help', category: 'Hardware', priority: '3', elapsedHours: 10, slaHours: 72, status: 'Submitted' },
  { id: 105, title: 'Printer not responding on 3rd floor', category: 'Hardware', priority: '4', elapsedHours: 48, slaHours: 168, status: 'In Review' },
  { id: 106, title: 'Install Photoshop license', category: 'Software', priority: '3', elapsedHours: 80, slaHours: 72, status: 'In Review' },
  { id: 107, title: 'Broken office chair', category: 'Furniture', priority: '4', elapsedHours: 12, slaHours: 168, status: 'Submitted' },
  { id: 108, title: 'Wi-Fi drops in conference room', category: 'Network', priority: '1', elapsedHours: 2, slaHours: 4, status: 'Submitted' },
];

console.log('= REQUESTS REPORT =\n');

for (const req of requests) {
  const formattedId = formatRequestId(req.id);
  const summary = buildRequestSummary(formattedId, req.title, req.status);
  const slaText = calculateSlaHours(req.priority);
  const overdue = isOverdue(req.elapsedHours, req.slaHours);
  const validTitle = isValidTitle(req.title);
  const validCategory = isAllowedCategory(req.category, allowedCategories);

 console.log(summary);
  console.log(
    `  Category: ${req.category} (${validCategory ? 'Valid' : 'Invalid'}) | ` +
    `Title: ${validTitle ? 'Valid' : 'Invalid'} | ` +
    `${slaText} (Elapsed: ${req.elapsedHours}h) | ` +
    `Overdue: ${overdue ? 'YES' : 'No'}`
  );
}

