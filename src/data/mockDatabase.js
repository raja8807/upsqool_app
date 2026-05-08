export const generateMockActivities = (childId) => {
  const now = new Date();
  
  // Deterministic but "random-looking" data based on childId
  const seed = childId ? childId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 123;
  
  const activityTemplates = [
    { title: 'Freeform Drawing', tags: ['Creative', 'Physical'], iconName: 'color-palette', primaryColor: '#059669', iconColor: '#D1FAE5' },
    { title: 'Story Time: Tales', tags: ['Intelligence', 'Values'], iconName: 'book', primaryColor: '#0F766E', iconColor: '#E6FBFA' },
    { title: 'Block Engineering', tags: ['Physical', 'Creative'], iconName: 'cube', primaryColor: '#6B7280', iconColor: '#F3F4F6' },
    { title: 'Library Time', tags: ['Intelligence'], iconName: 'library', primaryColor: '#D97706', iconColor: '#FFF5EB' },
    { title: 'Music Class', tags: ['Creative'], iconName: 'musical-notes', primaryColor: '#0F766E', iconColor: '#E6FBFA' },
    { title: 'Garden Exploration', tags: ['Physical', 'Science'], iconName: 'leaf', primaryColor: '#16A34A', iconColor: '#DCFCE7' },
    { title: 'Puzzle Solving', tags: ['Intelligence', 'Logic'], iconName: 'extension-puzzle', primaryColor: '#2563EB', iconColor: '#DBEAFE' },
  ];

  const activities = [];

  // Generate 5 past activities
  for (let i = 0; i < 5; i++) {
    const template = activityTemplates[(seed + i) % activityTemplates.length];
    const hoursAgo = (i * 4) + 2;
    activities.push({
      id: `${childId}_past_${i}`,
      childId,
      ...template,
      date: new Date(now.getTime() - hoursAgo * 60 * 60 * 1000),
      duration: `${15 + (seed % 45)} min`,
      score: (7 + (seed % 30) / 10).toFixed(1)
    });
  }

  // Generate 2 upcoming activities
  for (let i = 0; i < 3; i++) {
    const template = activityTemplates[(seed + i + 5) % activityTemplates.length];
    const hoursFuture = (i * 24) + 12;
    activities.push({
      id: `${childId}_future_${i}`,
      childId,
      ...template,
      date: new Date(now.getTime() + hoursFuture * 60 * 60 * 1000),
      duration: `${30 + (seed % 30)} min`,
      score: null
    });
  }

  return activities;
};

// Legacy support for initial load if needed
export const seedActivities = generateMockActivities('default_child');
