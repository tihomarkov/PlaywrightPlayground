const statuses = ['Submitted', 'In Review', 'Waiting for Info', 'Resolved'];

let header = 'From \\ To'.padEnd(18);
for (const to of statuses) {
  header += to.padEnd(18);
}
console.log(header);
console.log('-'.repeat(header.length));

for (const from of statuses) {
  let row = from.padEnd(18);

  for (const to of statuses) {
    const isAllowed =
      ((from === 'Submitted' || from === 'Waiting for Info') && to === 'In Review') ||
      (from === 'In Review' && (to === 'Resolved' || to === 'Waiting for Info'));

    row += (isAllowed ? 'Yes' : '-').padEnd(18);
  }

  console.log(row);
}