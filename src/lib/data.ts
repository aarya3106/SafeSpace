import type { Counsellor, JournalEntry, CommunityPost, MoodEntry, SleepEntry } from './types';

export const motivationalQuotes: string[] = [
  "It's okay not to be okay. It's a part of being human.",
  "Your feelings are valid. Don't let anyone tell you otherwise.",
  "One small step at a time. You've got this.",
  "You are stronger than you think. You've survived all of your worst days.",
  "Breathe. This moment will pass.",
  "Be kind to yourself. You're doing the best you can.",
  "The sun will rise, and we will try again."
];

export const counsellors: Counsellor[] = [
  { id: '1', name: 'Alex', availability: ['Mon 3pm-5pm', 'Wed 10am-12pm'] },
  { id: '2', name: 'Jordan', availability: ['Tue 9am-11am', 'Thu 2pm-4pm'] },
  { id: '3', name: 'Casey', availability: ['Fri 1pm-3pm'] }
];

export const journalEntries: JournalEntry[] = [
  { id: '1', date: '2024-07-29', mood: 'Anxious', content: 'Stressed about the upcoming math test. I feel like I haven\'t studied enough and I\'m going to fail.', tags: ['school', 'exams'] },
  { id: '2', date: '2024-07-28', mood: 'Okay', content: 'Hung out with friends today. It was nice to get out of the house. We just walked around the park and talked.', tags: ['friends', 'social'] },
  { id: '3', date: '2024-07-27', mood: 'Sad', content: 'Feeling a bit lonely today. Everyone seems busy and I\'m just at home. Tried watching a movie but couldn\'t get into it.', tags: ['loneliness'] }
];

export const communityPosts: CommunityPost[] = [
  { id: '1', author: 'StressedStudent123', timestamp: '2 days ago', tag: 'Exams', title: 'Anyone else feeling completely overwhelmed by finals?', content: 'I have three big exams next week and I feel like I can\'t even start studying. It\'s like my brain just shuts down. Any tips on how to get started when you\'re this stressed?', replies: 12 },
  { id: '2', author: 'NightOwl_4', timestamp: '5 days ago', tag: 'Sleep', title: 'Can\'t fall asleep', content: 'My mind just races at night. I lie in bed for hours. Has anyone found anything that actually helps with this? I\'m so tired during the day.', replies: 8 },
  { id: '3', author: 'AnxiousAndy', timestamp: '1 week ago', tag: 'Anxiety', title: 'Feeling anxious about going to school', content: 'Lately I get this knot in my stomach just thinking about school. It\'s not like anything bad is happening, but I just feel this dread. Is this normal?', replies: 15 }
];

export const relaxationSounds = [
    { id: 'white-noise', name: 'White Noise', description: 'Blocks out distractions', imageId: 'white-noise' },
    { id: 'pink-noise', name: 'Pink Noise', description: 'Deeper and more balanced', imageId: 'pink-noise' },
    { id: 'brown-noise', name: 'Brown Noise', description: 'Lower, rumbling sound', imageId: 'brown-noise' },
    { id: 'ocean', name: 'Ocean Waves', description: 'Calming crash of waves', imageId: 'ocean' },
    { id: 'rain', name: 'Gentle Rain', description: 'Soothing pitter-patter', imageId: 'rain' },
    { id: 'forest', name: 'Forest Ambience', description: 'Peaceful sounds of nature', imageId: 'forest' },
];

export const breathingExercises = [
    { id: 'box', name: 'Box Breathing', description: 'Inhale for 4, Hold for 4, Exhale for 4, Hold for 4. Helps to calm and regulate your breath.', steps: ['Inhale (4s)', 'Hold (4s)', 'Exhale (4s)', 'Hold (4s)'] },
    { id: '4-7-8', name: '4-7-8 Breathing', description: 'Inhale for 4, Hold for 7, Exhale for 8. A powerful technique for relaxation and sleep.', steps: ['Inhale (4s)', 'Hold (7s)', 'Exhale (8s)']},
    { id: 'nostril', name: 'Alternate Nostril', description: 'A yogic breath control practice to calm and balance the mind and body.', steps: ['Close right nostril, inhale left', 'Close left, exhale right', 'Inhale right', 'Close right, exhale left'] },
]

export const moodTrackerData: MoodEntry[] = [
  { date: "2024-07-23", mood: 7, time: "Morning" },
  { date: "2024-07-24", mood: 5, time: "Afternoon" },
  { date: "2024-07-25", mood: 3, time: "Evening" },
  { date: "2024-07-26", mood: 6, time: "Morning" },
  { date: "2024-07-27", mood: 4, time: "Afternoon" },
  { date: "2024-07-28", mood: 8, time: "Evening" },
  { date: "2024-07-29", mood: 5, time: "Morning" },
];

export const sleepTrackerData: SleepEntry[] = [
    { date: "2024-07-23", hours: 7.5, quality: 4 },
    { date: "2024-07-24", hours: 6, quality: 3 },
    { date: "2024-07-25", hours: 8, quality: 5 },
    { date: "2024-07-26", hours: 5.5, quality: 2 },
    { date: "2024-07-27", hours: 7, quality: 4 },
    { date: "2024-07-28", hours: 9, quality: 5 },
    { date: "2024-07-29", hours: 6.5, quality: 3 },
];
