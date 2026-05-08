import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase";
import { authService } from "../services/authService";
import {
  useGetCurrentUserProfile,
  useUpdateUserProfile,
} from "../services/profileService";
import { useCreateChild, useUpdateChild } from "../services/childService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children: children_prop }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const [userProfile, setUserProfile] = useState(null);
  const [children, setChildren] = useState([]);
  const [activeChildId, setActiveChildId] = useState(null);

  const { executeRequest: fetchProfileAsync } = useGetCurrentUserProfile();
  const { executeRequest: updateProfileAsync } = useUpdateUserProfile();
  const { executeRequest: createChildAsync } = useCreateChild();
  const { executeRequest: updateChildAsync } = useUpdateChild();

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("onboardingComplete", "true");
    setOnboardingComplete(true);
  };

  const refreshCurrentUserProfile = async () => {
    const profileRes = await fetchProfileAsync();
    if (profileRes.data) {
      const p = profileRes.data;
      setUserProfile({
        ...p,
        firstName: p.first_name,
        lastName: p.last_name,
      });

      const isOnboarded = !!(
        p.children[0] &&
        p.children[0]?.goals?.[0] &&
        p.children[0]?.interests?.[0]
      );

      console.log(isOnboarded);


      if (isOnboarded) {
        completeOnboarding();
        setChildren(p.children);
        setActiveChildId(p.children[0]?.id);
      }
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { session: currentSession } = await authService.getSession();
        setSession(currentSession);

        if (currentSession?.user) {
          await refreshCurrentUserProfile();
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (event === "SIGNED_IN" && session?.user) {
        await refreshCurrentUserProfile();
      } else if (event === "SIGNED_OUT") {
        setUserProfile(null);
        setChildren([]);
        setActiveChildId(null);
        setOnboardingComplete(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const childProfile = children.find((c) => c.id === activeChildId) || null;

  const Login = async (email, password) => {
    try {
      setLoading(true);
      return await authService.signIn(email, password);
    } finally {
      setLoading(false);
    }
  };

  const SignUp = async (email, password, metadata) => {
    try {
      setLoading(true);
      return await authService.signUp(email, password, metadata);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => await authService.signOut();

  const saveUserProfile = async (data) => {
    if (!session?.user) return;

    const res = await updateProfileAsync(data);

    if (res.error) {
      console.error("Profile Save Error:", res.error);
    } else if (res.data) {
      const p = res.data;
      setUserProfile({
        ...p,
        firstName: p.first_name,
        lastName: p.last_name,
      });
    }
    return res;
  };

  const formatDob = (dob) => {
    if (!dob) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(dob)) return dob;

    const parts = dob.split("/");
    if (parts.length === 3) {
      let [d, m, y] = parts;
      if (parseInt(d) > 12) {
        return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
      }
      return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
    return dob;
  };

  const saveChildProfile = async (data) => {
    if (!session?.user || !activeChildId) return;

    const mappedData = {
      ...data,
      first_name: data.firstName || data.first_name,
      last_name: data.lastName || data.last_name,
      daily_goal_hours: data.daily_goal_hours || data.hours,
      dob: formatDob(data.dob),
    };

    delete mappedData.firstName;
    delete mappedData.lastName;
    delete mappedData.hours;

    const res = await updateChildAsync(mappedData, `/child/${activeChildId}`);
    if (res.error) {
      console.error("Child Update Error:", res.error);
    } else if (res.data) {
      const c = res.data;
      const mappedChild = {
        ...c,
        firstName: c.first_name,
        lastName: c.last_name,
        hours: c.daily_goal_hours,
      };
      setChildren((prev) =>
        prev.map((child) => (child.id === activeChildId ? mappedChild : child)),
      );
    }
    return res;
  };

  const addChild = async (profile) => {
    if (!session?.user) return;

    const mappedData = {
      ...profile,
      first_name: profile.firstName || profile.first_name,
      last_name: profile.lastName || profile.last_name,
      daily_goal_hours: profile.daily_goal_hours || profile.hours,
      dob: formatDob(profile.dob),
    };

    delete mappedData.firstName;
    delete mappedData.lastName;
    delete mappedData.hours;

    const res = await createChildAsync(mappedData);
    if (res.error) {
      console.error("Child Add Error:", res.error);
    } else if (res.data) {
      const c = res.data;
      const mappedChild = {
        ...c,
        firstName: c.first_name,
        lastName: c.last_name,
        hours: c.daily_goal_hours,
      };
      setChildren((prev) => [...prev, mappedChild]);
      setActiveChildId(mappedChild.id);
      await AsyncStorage.setItem("activeChildId", mappedChild.id);
    }
    return res;
  };

  const startNewChildOnboarding = () => {
    setActiveChildId(null); // Signal that we are adding a new child
  };

  const switchChild = async (id) => {
    setActiveChildId(id);
    await AsyncStorage.setItem("activeChildId", id);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        onboardingComplete,
        userProfile,
        childProfile,
        children,
        activeChildId,
        Login,
        SignUp,
        logout,
        saveUserProfile,
        saveChildProfile,
        addChild,
        startNewChildOnboarding,
        switchChild,
        completeOnboarding,
        refreshCurrentUserProfile,
      }}
    >
      {children_prop}
    </AuthContext.Provider>
  );
};
