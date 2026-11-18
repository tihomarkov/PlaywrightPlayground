const testRequests: { title: string; priority: number }[] = [];

for (let i = 1; i <= 10; i++) {
  const num = String(i).padStart(2, '0');
  const priority = ((i - 1) % 5) + 1;

  testRequests.push({
    title: `Test request ${num}`,
    priority,
  });
}

for (const req of testRequests) {
  console.log(`${req.title} - Priority: P${req.priority}`);
}
