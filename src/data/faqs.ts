import { areas, site } from './site';

export interface FaqItem { question: string; answer: string }

export const faqSchema = (items: readonly FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question', name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});

import guidance from './service-guidance.json';
export const serviceFaqs = Object.fromEntries(Object.entries(guidance).map(([slug,g])=>[slug,g.qa.map(([question,answer])=>({question,answer}))])) as Record<string, readonly FaqItem[]>;

export const pageFaqs = {
  services: [
    { question: 'Which blocked-drain service should I choose?', answer: 'Start with the symptom: blocked toilet, sink or shower, sewer backup or stormwater problem. If you are unsure, call and describe what is happening; you do not need to diagnose the fault yourself.' },
    { question: 'Do you provide both clearing and drain repairs?', answer: 'Yes. Clearing restores flow where possible. If camera findings show a failed section, a separate targeted repair scope can be explained and agreed.' },
    { question: 'What is the difference between jetting and CCTV inspection?', answer: 'High-pressure jetting removes suitable obstructions and deposits. CCTV inspection lets the plumber view and locate conditions inside an accessible line.' },
    { question: 'Can tree roots be permanently removed?', answer: 'Roots can be cut from the line to restore flow, but they usually entered through a defect. Repairing the entry point is the step that addresses the underlying opening.' },
    { question: 'Do you work on sewer and stormwater drains?', answer: 'Yes. The team investigates household sewer drains and accessible private stormwater lines, using methods suited to the system and fault.' },
    { question: 'Are you available 24/7?', answer: 'Urgent calls are answered 24 hours, 7 days a week. No fixed arrival time is promised before the address, fault and current availability are reviewed.' },
  ],
  serviceAreas: [
    { question: 'Which Lower North Shore suburbs do you cover?', answer: `Local pages are available for ${areas.map((area) => area.name).join(', ')}. Call with the full address to confirm attendance.` },
    { question: 'Can you confirm coverage for my exact address?', answer: 'Yes. Provide the full street address, property type and drainage symptoms so the team can confirm current coverage and availability.' },
    { question: 'Do you attend homes, strata and commercial properties?', answer: 'Yes. Mention building management, parking, loading, induction or approval requirements when booking.' },
    { question: 'What if the drain is beneath a strata building?', answer: 'Arrange a building contact who can open service areas and identify the approval process. Share basement clearance, loading access and any drainage plans before equipment is selected.' },
    { question: 'Are urgent calls available in every listed suburb?', answer: 'Urgent calls are taken 24/7, while attendance remains subject to technician availability, safe access and the work required.' },
    { question: 'Who provides the licensed drainage service?', answer: `${site.operator} provides the service under NSW contractor licence ${site.licence}.` },
  ],
  about: [
    { question: 'Who is Antons Blocked Drains Lower North Shore?', answer: `${site.name} provides local drain diagnosis, clearing, CCTV inspections, water jetting and repairs. The service is operated by ${site.operator}.` },
    { question: 'How is a repair recommendation explained?', answer: 'The team relates accessible camera findings and location information to the proposed work, and distinguishes immediate clearing from repairing a damaged section.' },
    { question: 'Are you licensed?', answer: `Regulated work is performed under NSW contractor licence ${site.licence}.` },
    { question: 'What makes a professional drain assessment different?', answer: 'A professional assessment considers symptoms, access, pipe condition and the possibility of a deeper fault before selecting equipment. That reduces guesswork and helps separate temporary clearing from a lasting repair.' },
    { question: 'Do you use specialist equipment?', answer: 'Yes. Depending on the job, the team may use high-pressure jetting, CCTV inspection, electronic locating, root-cutting and targeted excavation equipment.' },
    { question: 'How do I book?', answer: `Call ${site.phoneDisplay} with the full address, affected fixtures, when the issue started and whether wastewater is overflowing.` },
  ],
  contact: [
    { question: 'What number do I call?', answer: `Call ${site.phoneDisplay} for blocked-drain enquiries across the Lower North Shore.` },
    { question: 'What information should I provide?', answer: 'Give the full address, property type, affected fixtures, when the issue began, whether wastewater is overflowing and any known access restrictions.' },
    { question: 'Can I call after hours?', answer: 'Yes. Urgent calls are taken 24 hours, 7 days a week. The available response is confirmed after the details are reviewed.' },
    { question: 'What should I do before the plumber arrives?', answer: 'Stop using affected fixtures, keep people and pets away from wastewater, clear safe access and tell the plumber about any chemical products already used.' },
    { question: 'Can you quote without seeing the drain?', answer: 'Some initial scope can be discussed by phone, but access, blockage location, equipment and hidden pipe condition often need inspection before the complete work is known.' },
    { question: 'Do you service rental and strata properties?', answer: 'Yes. Provide owner, agent or strata details and clarify who can approve work on shared or common-property drainage.' },
  ],
} as const;
