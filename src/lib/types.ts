export interface Counsellor {
  id: string;
  name: string;
  availability: string[];
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: 'Happy' | 'Okay' | 'Anxious' | 'Sad' | 'Angry';
  content: string;
  tags: string[];
}

export interface CommunityPost {
  id: string;
  author: string;
  timestamp: string;
  tag: 'Anxiety' | 'Exams' | 'Sleep' | 'Family' | 'Friends';
  title: string;
  content: string;
  replies: number;
}

export interface MoodEntry {
  date: string;
  mood: number;
  time: string;
}

export interface SleepEntry {
  date: string;
  hours: number;
  quality: number;
}
