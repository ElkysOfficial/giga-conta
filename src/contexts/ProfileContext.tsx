import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProfileType } from '@/types';

interface ProfileContextType {
  currentProfile: ProfileType;
  setCurrentProfile: (profile: ProfileType) => void;
  companyName: string;
  userName: string;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [currentProfile, setCurrentProfile] = useState<ProfileType>('personal');
  const companyName = 'Tech Solutions Ltda';
  const userName = 'Maria';

  return (
    <ProfileContext.Provider value={{ currentProfile, setCurrentProfile, companyName, userName }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
