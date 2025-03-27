import { Experience } from '@/types/experience';

const formatDate = (dateStr: string) => {
  if (dateStr.toLowerCase() === "present") return "Present";
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
};

export const WORK_EXPERIENCES: Experience[] = [
  {
    company: 'IEEE GU',
    role: 'Core Member',
    startDate: formatDate('2024-09-01'),
    endDate: formatDate('Present'),
    description: 'Organizing tech events, workshops, and hackathons while fostering innovation and networking at IEEE GU.',
    logoUrl: 'https://media.licdn.com/dms/image/v2/D4E0BAQFcmWw6fYQ_MA/company-logo_200_200/company-logo_200_200/0/1719257749735?e=1749686400&v=beta&t=Wsc7M4ULLy7jrAcUIHRbzS96L-RKNpguFdoeAOS96kI',
  },
  {
    company: 'AICSSYC',
    role: 'Organizer',
    startDate: formatDate('2024-10-01'),
    endDate: formatDate('2024-10-20'),
    description: 'Coordinated and managed event logistics for AICSSYC 2024, ensuring smooth execution and a great experience for participants.',
    logoUrl: 'https://media.licdn.com/dms/image/v2/D560BAQE9wxgLyTY_Wg/company-logo_200_200/company-logo_200_200/0/1725691654365/aicssyc_logo?e=1749686400&v=beta&t=8wywmMT5AFGGdYVFTzaEKXLmEtQZakCb5KrtIjg744Q',
  },
  {
    company: 'IEEE Computer Society',
    role: 'Member',
    startDate: formatDate('2024-09-01'),
    endDate: formatDate('Present'),
    description: 'Engaging in technical discussions, networking, and learning opportunities as a member of the IEEE Computer Society.',
    logoUrl: 'https://media.licdn.com/dms/image/v2/C560BAQGgbT-kdahf5A/company-logo_200_200/company-logo_200_200/0/1640027182473/ieee_computer_society_logo?e=1749686400&v=beta&t=6yfCvXYlRlc4-hloUQOVJY3cOPY3Q9b9-l0OMLQ05vQ',
  },
  {
    company: 'CyberCell GU',
    role: 'Member',
    startDate: formatDate('2023-10-01'),
    endDate: formatDate('Present'),
    description: 'Exploring cybersecurity concepts, ethical hacking, and digital forensics while contributing to CyberCell GU initiatives.',
    logoUrl: 'https://media.licdn.com/dms/image/v2/D4D0BAQH4BusOZlcEvQ/company-logo_200_200/company-logo_200_200/0/1693504304476?e=1749686400&v=beta&t=0bIzRDBU3zBYrs_JvnLbf9AVYsZK2Joc9c3-G75vhjg',
  }
];
