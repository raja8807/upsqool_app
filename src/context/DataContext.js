import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useGetActivitiesByChild, useAddActivity, useUpdateActivityScore } from '../services/activityService';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { activeChildId } = useAuth();
  const [allActivities, setAllActivities] = useState({});
  const [loading, setLoading] = useState(false);

  const { executeRequest: fetchActivitiesApi } = useGetActivitiesByChild();
  const { executeRequest: addActivityApi } = useAddActivity();
  const { executeRequest: updateScoreApi } = useUpdateActivityScore();

  useEffect(() => {
    const fetchActivities = async () => {
      if (activeChildId) {
        setLoading(true);
        try {
          const { data, error } = await fetchActivitiesApi(null, `/activities/child/${activeChildId}`);
          
          if (data && data.length > 0) {
            const mappedData = data.map(a => ({
              ...a,
              iconName: a.icon_name,
              iconColor: a.icon_color,
              primaryColor: a.primary_color,
              startTime: a.start_time,
              repeatWeekly: a.repeat_weekly,
              repeatDays: a.repeat_days,
            }));
            setAllActivities(prev => ({
              ...prev,
              [activeChildId]: mappedData
            }));
          }
        } catch (e) {
          console.warn("Failed to fetch activities from API", e);
        } finally {
          setLoading(false);
        }
      }
    };

    if (activeChildId && !allActivities[activeChildId]) {
      fetchActivities();
    }
  }, [activeChildId]);

  const activities = activeChildId ? (allActivities[activeChildId] || []) : [];

  const addActivity = async (activity) => {
    if (!activeChildId) {
      alert("No active child selected. Please select a child first.");
      return;
    }

    try {
      const payload = {
        child_id: activeChildId,
        title: activity.title,
        date: activity.date || new Date().toISOString(),
        duration: activity.duration?.toString() || "0",
        score: activity.score,
        tags: activity.tags || [],
        icon_name: activity.iconName || activity.icon_name,
        icon_color: activity.iconColor || activity.icon_color,
        primary_color: activity.primaryColor || activity.primary_color,
        start_time: activity.startTime || activity.start_time,
        repeat_weekly: activity.repeatWeekly || activity.repeat_weekly || false,
        repeat_days: activity.repeatDays || activity.repeat_days || [],
        qs: activity.qs || [],
      };

      const { data, error } = await addActivityApi(payload);
      
      if (data) {
        const mapped = {
          ...data,
          iconName: data.icon_name,
          iconColor: data.icon_color,
          primaryColor: data.primary_color,
          startTime: data.start_time,
          repeatWeekly: data.repeat_weekly,
          repeatDays: data.repeat_days,
        };
        setAllActivities((prev) => {
          const childActivities = prev[activeChildId] || [];
          return {
            ...prev,
            [activeChildId]: [mapped, ...childActivities]
          };
        });
      }
      return { data, error };
    } catch (e) {
      console.warn("Failed to add activity to API", e);
    }
  };

  const updateRating = async (activityId, score) => {
    try {
      const { data, error } = await updateScoreApi({ score }, `/activities/${activityId}/score`);
      if (data) {
        setAllActivities(prev => {
          const childActivities = prev[activeChildId] || [];
          return {
            ...prev,
            [activeChildId]: childActivities.map(a => a.id === activityId ? data : a)
          };
        });
      }
      return { data, error };
    } catch (e) {
      console.warn("Failed to update rating in API", e);
    }
  };

  return (
    <DataContext.Provider value={{ activities, addActivity, updateRating, loading }}>
      {children}
    </DataContext.Provider>
  );
};
