export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'pastor' | 'staff' | 'member';
  createdAt: Date;
  status: 'active' | 'inactive' | 'pending';
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinDate: Date;
  branch: string; 
  familyMembers: FamilyMember[];
  groups: string[];
  attendance: AttendanceRecord[];
  address?: string; 
  birthDate?: Date; 
  maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed'; 
  occupation?: string; 
}

export const BRANCHES = [
  'Main Campus',
  'Downtown Branch', 
  'North Branch',
  'South Branch',
  'East Branch',
  'West Branch',
  'Online'
] as const;

export interface FamilyMember {
  id: string;
  name: string;
  relationship: 'spouse' | 'child' | 'parent';
  birthDate?: Date;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  serviceDate: Date;
  serviceType: 'sunday' | 'wednesday' | 'special';
  present: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  venue: string;
  organizer: string;
  type: 'service' | 'meeting' | 'outreach' | 'social' | 'conference' | 'other';
  capacity?: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const EVENT_TYPES = [
  'service',
  'meeting',
  'outreach',
  'social',
  'conference',
  'other'
] as const;

export interface Service {
  id: string;
  date: Date;
  type: 'sunday' | 'wednesday' | 'special' | 'youth' | 'children';
  title: string;
  totalPresent: number;
  totalMembers: number;
}

export const SERVICE_TYPES = [
  { value: 'sunday', label: 'Sunday Service', defaultTime: '09:00' },
  { value: 'wednesday', label: 'Wednesday Service', defaultTime: '19:00' },
  { value: 'youth', label: 'Youth Service', defaultTime: '18:00' },
  { value: 'children', label: 'Children Service', defaultTime: '10:00' },
  { value: 'special', label: 'Special Service', defaultTime: '10:00' },
] as const;


export interface Donation {
  id: string;
  memberId: string;
  amount: number;
  type: 'tithe' | 'offering' | 'pledge' | 'building' | 'missions' | 'other';
  date: Date;
  method: 'cash' | 'check' | 'online' | 'card';
  checkNumber?: string;
  description?: string;
  recordedBy: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface DonationSummary {
  totalDonations: number;
  totalTithes: number;
  totalOfferings: number;
  totalPledges: number;
  monthlyBreakdown: { month: string; amount: number }[];
  recentDonations: Donation[];
  topDonors: { memberId: string; total: number }[];
}

export const DONATION_TYPES = [
  { value: 'tithe', label: 'Tithe', color: 'bg-blue-500' },
  { value: 'offering', label: 'Offering', color: 'bg-green-500' },
  { value: 'pledge', label: 'Pledge', color: 'bg-purple-500' },
  { value: 'building', label: 'Building Fund', color: 'bg-orange-500' },
  { value: 'missions', label: 'Missions', color: 'bg-red-500' },
  { value: 'other', label: 'Other', color: 'bg-gray-500' },
] as const;

export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash' },
  { value: 'check', label: 'Check' },
  { value: 'online', label: 'Online' },
  { value: 'card', label: 'Card' },
] as const;

export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: Date;
  description: string;
  mediaUrl: string;
  mediaType: 'audio' | 'video' | 'text';
  duration?: number; // in minutes
  series?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const MEDIA_TYPES = [
  { value: 'audio', label: 'Audio' },
  { value: 'video', label: 'Video' },
  { value: 'text', label: 'Text' },
] as const;