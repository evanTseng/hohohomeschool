import React from 'react';

export interface FounderProfile {
  name: string;
  role: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  longDescription: string;
  details: string[];
  fullImage: string;
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
}

export enum SendingStatus {
  IDLE = 'idle',
  SENDING = 'sending',
  ERROR = 'error'
}