const currentStatus: string = 'Submitted';
const isAllowed: boolean = true;

switch (currentStatus) {
  case 'Submitted':
  case 'Waiting for Info':
    console.log('Next status: In Review');
    break;
  case 'In Review':
    console.log(`Next status: ${isAllowed ? 'Resolved' : 'Waiting for Info'}`);
    break;
  case 'Resolved':
    console.log('Resolved');
    break;
  default:
    console.log(`Unknown status: ${currentStatus}`);
    break;
}