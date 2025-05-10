import React from "react";

export interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
  isLoading: boolean;
}

export interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  isLoading: boolean;
}

export interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

export interface EventItemProps {
  title: string;
  date: string;
  location: string;
}

export interface ResourceItemProps {
  title: string;
  type: string;
  readTime: string;
}

export interface ChallengeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  daysLeft: number;
  points: number;
  isActive: boolean;
  isLoading: boolean;
}

export interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  date?: string;
  isLocked: boolean;
  isLoading: boolean;
}

export interface CommunityPostProps {
  name: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
}

export interface CommunityGroupProps {
  name: string;
  members: number;
  description: string;
}

export interface CommunityEventProps {
  name: string;
  date: string;
  location: string;
  description: string;
}

