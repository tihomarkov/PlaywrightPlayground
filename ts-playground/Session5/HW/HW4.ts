const slaHours = 30;
const fullDays = Math.floor(slaHours / 24);
const remainingHours = slaHours % 24;
const totalMinutes = slaHours * 60;

console.log(`${fullDays} day(s) and ${remainingHours} hour(s)`); 
console.log(`Total minutes: ${totalMinutes}`); 

let openRequests = 5;
openRequests += 3; 
openRequests -= 2; 

console.log(`Open requests: ${openRequests}`);