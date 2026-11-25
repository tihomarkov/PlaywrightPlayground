type RequestDetails = {
  title: string;
  description: string;
  dateOfRequest: string;
  category:
    | 'Roads & Infrastructure'
    | 'Waste Management'
    | 'Water & Utilities'
    | 'Parks & Recreation'
    | 'Public Safety';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  isEmergency: boolean;
  severity?: number;
  isRecurringIssue?: boolean;
  hasRelevantPermits?: boolean;
};

type Location = {
  streetAddress: string;
  city: string;
  postalCode: string;
  locationDescription: string;
  latitude?: number;
  longitude?: number;
};

type ContactDetails = {
  preferredContactMethod: 'Phone' | 'Email';
  phone: string;
  email?: string;
  alternatePhone?: string;
  mailingAddress?: {
    streetAddress?: string;
    city?: string;
    postalCode?: string;
  };
  affectedServices?: string[];
};

type Attachment = {
  fileName: string;
  fileSizeKb: number;
  mimeType: string;
};

type NewRequest = {
  details: RequestDetails;
  location: Location;
  contact: ContactDetails;
  attachments?: Attachment[];
  agreedToTerms: boolean;
};


// 1. Valid request with only required fields
const validMinimalRequest: NewRequest = {
  details: {
    title: 'Garbage overflow near stadium',
    description: 'Garbage bins are overflowing next to the main entrance.',
    dateOfRequest: '11/24/2026',
    category: 'Waste Management',
    priority: 'Medium',
    isEmergency: false,
  },
  location: {
    streetAddress: 'Saborna 1',
    city: 'Sofia',
    postalCode: '1000',
    locationDescription: 'Next to the main entrance gate',
  },
  contact: {
    preferredContactMethod: 'Phone',
    phone: '+359885524555',
  },
  agreedToTerms: true,
};

// 2. Valid emergency request with GPS coordinates, alternate phone, and attachment
const validEmergencyRequest: NewRequest = {
  details: {
    title: 'Burst water pipe on main road',
    description: 'Large water leak flooding the right lane and sidewalk.',
    dateOfRequest: '11/24/2026',
    category: 'Water & Utilities',
    priority: 'Urgent',
    isEmergency: true,
    severity: 9,
    isRecurringIssue: false,
    hasRelevantPermits: false,
  },
  location: {
    streetAddress: 'Vitosha Blvd 45',
    city: 'Sofia',
    postalCode: '1000',
    locationDescription: 'Intersection with Patriarch Evtimiy Blvd',
    latitude: 42.696398,
    longitude: 23.32308,
  },
  contact: {
    preferredContactMethod: 'Phone',
    phone: '+359885524555',
    email: 'citizen@example.com',
    alternatePhone: '+359885524556',
    affectedServices: ['Water Supply'],
  },
  attachments: [
    {
      fileName: 'water-leak.jpg',
      fileSizeKb: 1420,
      mimeType: 'image/jpeg',
    },
  ],
  agreedToTerms: true,
};

// 3. Valid request with optional mailing address and multiple attachments
const validFullRequest: NewRequest = {
  details: {
    title: 'Broken street lamps in park',
    description: 'Three consecutive street lamps are not working along the main alley.',
    dateOfRequest: '11/23/2026',
    category: 'Parks & Recreation',
    priority: 'Low',
    isEmergency: false,
    severity: 3,
    isRecurringIssue: true,
    hasRelevantPermits: true,
  },
  location: {
    streetAddress: 'Borisova Gradina',
    city: 'Sofia',
    postalCode: '1164',
    locationDescription: 'Main alley near the lake',
  },
  contact: {
    preferredContactMethod: 'Email',
    phone: '+359888112233',
    email: 'park.visitor@example.com',
    mailingAddress: {
      streetAddress: 'Graf Ignatiev 12',
      city: 'Sofia',
      postalCode: '1000',
    },
    affectedServices: ['Public Lighting'],
  },
  attachments: [
    {
      fileName: 'lamp-1.png',
      fileSizeKb: 850,
      mimeType: 'image/png',
    },
    {
      fileName: 'map-pin.pdf',
      fileSizeKb: 310,
      mimeType: 'application/pdf',
    },
  ],
  agreedToTerms: true,
};


// 1. Invalid: missing required 'location' object on NewRequest
// @ts-expect-error - Property 'location' is required in type 'NewRequest'
const invalidMissingLocationRequest: NewRequest = {
  details: {
    title: 'Pothole on main street',
    description: 'Deep pothole causing traffic delays in the right lane.',
    dateOfRequest: '11/24/2026',
    category: 'Roads & Infrastructure',
    priority: 'High',
    isEmergency: false,
  },
  contact: {
    preferredContactMethod: 'Email',
    phone: '+359885524555',
    email: 'driver@example.com',
  },
  agreedToTerms: true,
};

// 2. Invalid: 'priority' uses a value outside the allowed union ('Low' | 'Medium' | 'High' | 'Urgent')
const invalidPriorityRequest: NewRequest = {
  details: {
    title: 'Fallen tree blocking sidewalk',
    description: 'A large tree branch fell after the storm and blocks pedestrian access.',
    dateOfRequest: '11/24/2026',
    category: 'Public Safety',
    // @ts-expect-error - 'Critical' is not assignable to type 'Low' | 'Medium' | 'High' | 'Urgent'
    priority: 'Critical',
    isEmergency: true,
  },
  location: {
    streetAddress: 'Oborishte 15',
    city: 'Sofia',
    postalCode: '1504',
    locationDescription: 'In front of the residential building',
  },
  contact: {
    preferredContactMethod: 'Phone',
    phone: '+359885524555',
  },
  agreedToTerms: true,
};

// 3. Invalid: 'agreedToTerms' is given a string instead of a boolean
const invalidFieldTypeRequest: NewRequest = {
  details: {
    title: 'Illegal dumping site',
    description: 'Construction waste dumped next to the municipal containers.',
    dateOfRequest: '11/24/2026',
    category: 'Waste Management',
    priority: 'Medium',
    isEmergency: false,
  },
  location: {
    streetAddress: 'Cherni Vrah Blvd 67',
    city: 'Sofia',
    postalCode: '1407',
    locationDescription: 'Behind the supermarket parking lot',
  },
  contact: {
    preferredContactMethod: 'Phone',
    phone: '+359885524555',
  },
  // @ts-expect-error - Type 'string' is not assignable to type 'boolean'
  agreedToTerms: 'yes',
};

class TestDataFactory {
  validRequest(overrides?: Partial<NewRequest>): NewRequest {
    const defaultRequest: NewRequest = {
      details: {
        title: 'Garbage overflow near stadium',
        description: 'Garbage bins are overflowing next to the main entrance.',
        dateOfRequest: '24/11/2026',
        category: 'Waste Management',
        priority: 'Medium',
        isEmergency: false,
      },
      location: {
        streetAddress: 'Saborna 1',
        city: 'Sofia',
        postalCode: '1000',
        locationDescription: 'Next to the main entrance gate',
      },
      contact: {
        preferredContactMethod: 'Phone',
        phone: '+359885524555',
      },
      agreedToTerms: true,
    };

    return {
      ...defaultRequest,
      ...overrides,
    };
  }
}


// --- Verification Check ---
const factory = new TestDataFactory();

// 1. Default valid request
const requestA = factory.validRequest();
console.log('Request A title:', requestA.details.title);
console.log('Request A agreedToTerms:', requestA.agreedToTerms);

// 2. Valid request with overrides
const requestB = factory.validRequest({
  agreedToTerms: false,
  attachments: [
    {
      fileName: 'evidence.jpg',
      fileSizeKb: 640,
      mimeType: 'image/jpeg',
    },
  ],
});
console.log('Request B agreedToTerms:', requestB.agreedToTerms);
console.log('Request B attachments count:', requestB.attachments?.length ?? 0);

// 3. Verify fresh object references on each call
console.log('Fresh top-level object:', requestA !== requestB);
console.log('Fresh nested details object:', requestA.details !== requestB.details);

// 4. Verify the 3 valid test objects
const validRequests: NewRequest[] = [
  validMinimalRequest,
  validEmergencyRequest,
  validFullRequest,
];
console.log('Total valid test objects:', validRequests.length);