const raw = '   broken STREET light   ';

const trimmed = raw.trim();
const lower = trimmed.toLowerCase();
const upper = trimmed.toUpperCase();
const capitalized = lower.charAt(0).toUpperCase() + lower.slice(1);
const hasLight = lower.includes('light');
const replaced = lower.replace('street', 'road');

console.log(trimmed);    
console.log(lower);       
console.log(upper);       
console.log(capitalized); 
console.log(hasLight);    
console.log(replaced);