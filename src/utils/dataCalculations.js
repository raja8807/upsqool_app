export const calculateTotalTimeToday = (activities) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const todayActivities = activities.filter(a => {
    const d = new Date(a.date);
    return d >= startOfToday && d <= now;
  });

  const totalMinutes = todayActivities.reduce((acc, a) => {
    const duration = parseInt(a.duration) || 0;
    return acc + duration;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

export const calculateProgressPercentage = (activities, dailyGoalHours) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const todayActivities = activities.filter(a => {
    const d = new Date(a.date);
    return d >= startOfToday && d <= now;
  });

  const totalMinutes = todayActivities.reduce((acc, a) => {
    const duration = parseInt(a.duration) || 0;
    return acc + duration;
  }, 0);

  const goalMinutes = (dailyGoalHours || 2) * 60;
  const percentage = Math.min((totalMinutes / goalMinutes) * 100, 100);
  
  return `${Math.round(percentage)}%`;
};

export const calculateQDistribution = (activities) => {
  const distribution = {
    Intelligence: 0,
    Emotional: 0,
    Creative: 0,
    Physical: 0,
    Values: 0,
  };

  const scoredActivities = activities.filter(a => a.score !== null);
  
  if (scoredActivities.length === 0) {
    return {
      Intelligence: 50,
      Emotional: 50,
      Creative: 50,
      Physical: 50,
      Values: 50,
    };
  }

  scoredActivities.forEach(a => {
    const score = parseFloat(a.score) || 0;
    (a.tags || []).forEach(tag => {
      if (distribution.hasOwnProperty(tag)) {
        distribution[tag] += score;
      }
    });
  });

  // Normalize to 100 max per category for simplicity in this mock context
  // or just average them. Let's do a simple average of scores for that category.
  const counts = { Intelligence: 0, Emotional: 0, Creative: 0, Physical: 0, Values: 0 };
  scoredActivities.forEach(a => {
    (a.tags || []).forEach(tag => {
      if (counts.hasOwnProperty(tag)) counts[tag]++;
    });
  });

  Object.keys(distribution).forEach(key => {
    if (counts[key] > 0) {
      distribution[key] = Math.round((distribution[key] / (counts[key] * 10)) * 100);
    } else {
      distribution[key] = 40; // Default fallback
    }
  });

  return distribution;
};

export const getWeeklyStats = (activities) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const stats = days.map(day => ({ label: day, value: 0 }));
  
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 7);

  activities.forEach(a => {
    const d = new Date(a.date);
    if (d >= weekAgo && d <= now) {
      const dayName = days[d.getDay()];
      const entry = stats.find(s => s.label === dayName);
      if (entry) entry.value += (parseInt(a.duration) || 0) / 60;
    }
  });

  return stats;
};

export const getMonthlyStats = (activities) => {
  const stats = [
    { label: 'Wk 1', value: 0 },
    { label: 'Wk 2', value: 0 },
    { label: 'Wk 3', value: 0 },
    { label: 'Wk 4', value: 0 },
  ];
  
  const now = new Date();
  const monthAgo = new Date();
  monthAgo.setMonth(now.getMonth() - 1);

  activities.forEach(a => {
    const d = new Date(a.date);
    if (d >= monthAgo && d <= now) {
      const dayDiff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
      const weekIndex = Math.min(Math.floor(dayDiff / 7), 3);
      stats[3 - weekIndex].value += (parseInt(a.duration) || 0) / 60;
    }
  });

  return stats;
};

export const getLifetimeStats = (activities) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const stats = months.map(m => ({ label: m, value: 0 }));

  activities.forEach(a => {
    const d = new Date(a.date);
    const monthName = months[d.getMonth()];
    const entry = stats.find(s => s.label === monthName);
    if (entry) entry.value += (parseInt(a.duration) || 0) / 60;
  });

  // Only return months that have data or are recent
  return stats;
};
