const requests = [
  { id: 'REQ-1003', title: 'Server down', priority: 1, status: 'Waiting for Info' },
  { id: 'REQ-1004', title: 'Password reset', priority: 2, status: 'Resolved' },
  { id: 'REQ-1001', title: 'VPN connection issue', priority: 3, status: 'In Review' },
  { id: 'REQ-1002', title: 'Printer not responding', priority: 4, status: 'Submitted' },
];

console.log(`${'ID'.padEnd(10)} | ${'Title'.padEnd(25)} | ${'Priority'.padEnd(8)} | Status`);
console.log('-'.repeat(68));

for (const req of requests) {
  const id = req.id.padEnd(10);
  const title = req.title.padEnd(25);
  const priority = `P${req.priority}`.padEnd(8);

  console.log(`${id} | ${title} | ${priority} | ${req.status}`);
}