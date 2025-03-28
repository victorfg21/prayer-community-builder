
// Types for our data
export interface PrayerGroup {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  memberCount: number;
  imageUrl?: string;
}

export interface PrayerRequest {
  id: string;
  groupId: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  reminderTime?: string;
  prayedToday: string[]; // array of user IDs
  type: 'prayer' | 'fast' | 'nightPrayer';
  endDate?: Date;
}

// Mock data
const groups: PrayerGroup[] = [
  {
    id: '1',
    name: 'Family Prayer Circle',
    description: 'A group for our family to share prayer requests and support each other.',
    createdBy: 'google-user-123',
    createdAt: new Date('2023-01-15'),
    memberCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=300&auto=format'
  },
  {
    id: '2',
    name: 'Church Community',
    description: 'Official prayer group for our church members.',
    createdBy: 'other-user-456',
    createdAt: new Date('2023-02-20'),
    memberCount: 28,
    imageUrl: 'https://images.unsplash.com/photo-1440330033336-7dcff4630cef?q=80&w=300&auto=format'
  },
  {
    id: '3',
    name: 'Study Group',
    description: 'Prayer support for students in our Bible study group.',
    createdBy: 'google-user-123',
    createdAt: new Date('2023-03-05'),
    memberCount: 12,
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=300&auto=format'
  }
];

const prayerRequests: PrayerRequest[] = [
  {
    id: '101',
    groupId: '1',
    title: 'Health concerns for Mom',
    description: 'Please pray for my mother who is having surgery next week.',
    createdBy: 'google-user-123',
    createdAt: new Date('2023-06-01'),
    reminderTime: '08:00',
    prayedToday: ['google-user-123', 'other-user-789'],
    type: 'prayer'
  },
  {
    id: '102',
    groupId: '1',
    title: 'New job opportunity',
    description: 'I have an interview on Friday, please pray for guidance.',
    createdBy: 'other-user-456',
    createdAt: new Date('2023-06-03'),
    prayedToday: [],
    type: 'prayer'
  },
  {
    id: '103',
    groupId: '1',
    title: 'Family fast for guidance',
    description: 'Join our family in fasting this weekend for clarity in a major decision.',
    createdBy: 'google-user-123',
    createdAt: new Date('2023-06-10'),
    endDate: new Date('2023-06-12'),
    prayedToday: ['google-user-123'],
    type: 'fast'
  },
  {
    id: '104',
    groupId: '2',
    title: 'Night prayer for revival',
    description: 'Let\'s gather in prayer from midnight to 2am for spiritual renewal.',
    createdBy: 'other-user-789',
    createdAt: new Date('2023-06-15'),
    reminderTime: '23:30',
    prayedToday: [],
    type: 'nightPrayer'
  },
  {
    id: '105',
    groupId: '2',
    title: 'Community outreach',
    description: 'Pray for our upcoming community service event.',
    createdBy: 'other-user-456',
    createdAt: new Date('2023-06-18'),
    prayedToday: ['other-user-456', 'google-user-123'],
    type: 'prayer'
  },
  {
    id: '106',
    groupId: '3',
    title: 'Exam preparation',
    description: 'Please pray for all students preparing for final exams.',
    createdBy: 'google-user-123',
    createdAt: new Date('2023-06-20'),
    reminderTime: '07:00',
    prayedToday: ['google-user-123'],
    type: 'prayer'
  }
];

// Service functions
export const getGroups = (): Promise<PrayerGroup[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...groups]);
    }, 500);
  });
};

export const getGroupById = (id: string): Promise<PrayerGroup | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(groups.find(group => group.id === id));
    }, 300);
  });
};

export const getPrayerRequestsByGroupId = (groupId: string): Promise<PrayerRequest[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(prayerRequests.filter(request => request.groupId === groupId));
    }, 300);
  });
};

export const getPrayerRequestById = (id: string): Promise<PrayerRequest | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(prayerRequests.find(request => request.id === id));
    }, 200);
  });
};

export const createGroup = (group: Omit<PrayerGroup, 'id' | 'createdAt' | 'memberCount'>): Promise<PrayerGroup> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newGroup: PrayerGroup = {
        ...group,
        id: `g-${Date.now()}`,
        createdAt: new Date(),
        memberCount: 1
      };
      groups.push(newGroup);
      resolve(newGroup);
    }, 700);
  });
};

export const createPrayerRequest = (request: Omit<PrayerRequest, 'id' | 'createdAt' | 'prayedToday'>): Promise<PrayerRequest> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRequest: PrayerRequest = {
        ...request,
        id: `pr-${Date.now()}`,
        createdAt: new Date(),
        prayedToday: []
      };
      prayerRequests.push(newRequest);
      resolve(newRequest);
    }, 700);
  });
};

export const togglePrayedToday = (requestId: string, userId: string): Promise<PrayerRequest> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const request = prayerRequests.find(r => r.id === requestId);
      if (request) {
        const index = request.prayedToday.indexOf(userId);
        
        if (index === -1) {
          // User hasn't prayed today, add them
          request.prayedToday.push(userId);
        } else {
          // User already prayed today, remove them
          request.prayedToday.splice(index, 1);
        }
        
        resolve({...request});
      } else {
        throw new Error('Prayer request not found');
      }
    }, 300);
  });
};

export const updatePrayerRequestReminder = (requestId: string, reminderTime: string | undefined): Promise<PrayerRequest> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const request = prayerRequests.find(r => r.id === requestId);
      if (request) {
        request.reminderTime = reminderTime;
        resolve({...request});
      } else {
        throw new Error('Prayer request not found');
      }
    }, 300);
  });
};
