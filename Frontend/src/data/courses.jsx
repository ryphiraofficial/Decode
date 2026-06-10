import React from 'react';
import { Monitor, LayoutTemplate, Activity, LineChart, PieChart, CheckCircle, HardHat, PenTool } from 'lucide-react';

export const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

export const coursesData = [
  { 
    id: 'software-development', 
    title: 'Software Development', 
    cat: 'Development', 
    catIcon: <Monitor size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'New Cohort', 
    company: 'Dcoode', 
    logoColor: '#0b1a2d', 
    icon: <Monitor size={20} /> 
  },
  { 
    id: 'mern-stack-ai', 
    title: 'MERN Stack with AI', 
    cat: 'Full Stack', 
    catIcon: <LayoutTemplate size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'New Cohort', 
    company: 'Dcoode', 
    logoColor: '#5c8a99', 
    icon: <LayoutTemplate size={20} /> 
  },
  { 
    id: 'web-development', 
    title: 'Web Development', 
    cat: 'Development', 
    catIcon: <Monitor size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'Active', 
    company: 'Dcoode', 
    logoColor: '#eb7555', 
    icon: <Monitor size={20} /> 
  },
  { 
    id: 'full-stack-ai', 
    title: 'Full Stack with AI', 
    cat: 'Full Stack', 
    catIcon: <LayoutTemplate size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'Open', 
    company: 'Dcoode', 
    logoColor: '#4f91f7', 
    icon: <LayoutTemplate size={20} /> 
  },
  { 
    id: 'python', 
    title: 'Python', 
    cat: 'Programming', 
    catIcon: <Monitor size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'New Cohort', 
    company: 'Dcoode', 
    logoColor: '#0b5668', 
    icon: <PieChart size={20} /> 
  },
  { 
    id: 'deep-learning', 
    title: 'Deep Learning', 
    cat: 'AI & ML', 
    catIcon: <Activity size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'Active', 
    company: 'Dcoode', 
    logoColor: '#eb9b4a', 
    icon: <Activity size={20} /> 
  },
  { 
    id: 'machine-learning', 
    title: 'Machine Learning', 
    cat: 'AI & ML', 
    catIcon: <Activity size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'Open', 
    company: 'Dcoode', 
    logoColor: '#4f91f7', 
    icon: <LineChart size={20} /> 
  },
  { 
    id: 'artificial-intelligence', 
    title: 'Artificial Intelligence', 
    cat: 'AI & ML', 
    catIcon: <PenTool size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'New Cohort', 
    company: 'Dcoode', 
    logoColor: '#0b5668', 
    icon: <Activity size={20} /> 
  },
  { 
    id: 'data-science', 
    title: 'Data Science', 
    cat: 'Data', 
    catIcon: <LineChart size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'Active', 
    company: 'Dcoode', 
    logoColor: '#5c8a99', 
    icon: <PieChart size={20} /> 
  },
  { 
    id: 'cyber-security', 
    title: 'Cyber Security', 
    cat: 'Security', 
    catIcon: <ShieldIcon />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'New Cohort', 
    company: 'Dcoode', 
    logoColor: '#0b1a2d', 
    icon: <CheckCircle size={20} /> 
  },
  { 
    id: 'mern-stack', 
    title: 'MERN Stack', 
    cat: 'Full Stack', 
    catIcon: <LayoutTemplate size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'Open', 
    company: 'Dcoode', 
    logoColor: '#eb7555', 
    icon: <LayoutTemplate size={20} /> 
  },
  { 
    id: 'mean-stack', 
    title: 'MEAN Stack', 
    cat: 'Full Stack', 
    catIcon: <LayoutTemplate size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'Active', 
    company: 'Dcoode', 
    logoColor: '#4f91f7', 
    icon: <LayoutTemplate size={20} /> 
  },
  { 
    id: 'full-stack-django', 
    title: 'Full Stack - Django', 
    cat: 'Full Stack', 
    catIcon: <LayoutTemplate size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'Open', 
    company: 'Dcoode', 
    logoColor: '#5c8a99', 
    icon: <LayoutTemplate size={20} /> 
  },
  { 
    id: 'r-programming', 
    title: 'R Programming', 
    cat: 'Data', 
    catIcon: <LineChart size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'New Cohort', 
    company: 'Dcoode', 
    logoColor: '#0b5668', 
    icon: <PieChart size={20} /> 
  },
  { 
    id: 'cyber-forensic', 
    title: 'Cyber Forensic', 
    cat: 'Security', 
    catIcon: <ShieldIcon />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'Active', 
    company: 'Dcoode', 
    logoColor: '#0b1a2d', 
    icon: <CheckCircle size={20} /> 
  },
  { 
    id: 'cloud-computing', 
    title: 'Cloud Computing', 
    cat: 'Infrastructure', 
    catIcon: <HardHat size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'New Cohort', 
    company: 'Dcoode', 
    logoColor: '#eb9b4a', 
    icon: <HardHat size={20} /> 
  },
  { 
    id: 'ui-ux-architecture', 
    title: 'UI/UX Architecture', 
    cat: 'Design', 
    catIcon: <PenTool size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'Open', 
    company: 'Dcoode', 
    logoColor: '#eb7555', 
    icon: <PenTool size={20} /> 
  },
  { 
    id: 'mobile-app-dev', 
    title: 'Mobile App Dev (React Native)', 
    cat: 'Development', 
    catIcon: <Monitor size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'New Cohort', 
    company: 'Dcoode', 
    logoColor: '#4f91f7', 
    icon: <Monitor size={20} /> 
  },
  { 
    id: 'devops-engineering', 
    title: 'DevOps Engineering', 
    cat: 'Infrastructure', 
    catIcon: <HardHat size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'Active', 
    company: 'Dcoode', 
    logoColor: '#0b5668', 
    icon: <HardHat size={20} /> 
  },
  { 
    id: 'blockchain-dev', 
    title: 'Blockchain Development', 
    cat: 'Development', 
    catIcon: <Monitor size={16} />, 
    loc: 'Online / Hybrid', 
    type: '1, 3, 6 Months', 
    date: 'Open', 
    company: 'Dcoode', 
    logoColor: '#0b1a2d', 
    icon: <Monitor size={20} /> 
  },
];
