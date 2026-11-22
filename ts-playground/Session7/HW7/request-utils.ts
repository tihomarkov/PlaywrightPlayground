//id formatting
function formatRequestId(id: number, prefix = 'REQ'): string {
  return `${prefix}-${String(id)}`;
}
console.log(formatRequestId(10, 'request'));

//SLA calculation
function calculateSlaHours(priority: string): string {
  switch (priority) {
    case '1':
      return "SLA up to 4h!";
    case "2":
      return 'SLA up to 24!';
    case '3':
      return 'SLA up to 72h!';
    default:
      return 'SLA up to 168h!';
  }
}
console.log(calculateSlaHours('0'));

//overdue check
function isOverdue(elapsedHours: number, slaHours: number): boolean {
  return elapsedHours > slaHours;
}
console.log(isOverdue(5, 4));

//title validation (5–100 characters)
function isValidTitle(title: string): boolean {
  const length = title.trim().length;
  return length >= 5 && length <= 100;
}
console.log(isValidTitle('Tiho M'))

//category check against an allowed list
function isAllowedCategory(category: string, allowedCategories: string[]): boolean {
  return allowedCategories.includes(category);
}
console.log(isAllowedCategory('0', ['1', '2', '3']));

//summary text
function buildRequestSummary(formattedId: string, title: string, status: string): string {
  return `[${formattedId}] ${title} (${status})`;
}''
console.log(buildRequestSummary('010', 'Request', 'Not Allowed'));
