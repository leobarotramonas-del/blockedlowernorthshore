import { site } from './site';

export interface Project {
  slug: string; title: string; caption: string; width: number; height: number;
  duration?: number; video?: string; poster?: string; image?: string;
  serviceHref: string; serviceLabel: string;
}
export const projects: Project[] = [
  {
    "slug": "sewer-jetting",
    "title": "Sewer drain jetting",
    "caption": "A technician handles the jetting hose during a sewer drain clearing job.",
    "duration": 12,
    "width": 540,
    "height": 960,
    "video": "sewer-jetting.mp4",
    "poster": "sewer-jetting.webp",
    "serviceHref": "/services/high-pressure-water-jetting/",
    "serviceLabel": "Explore water jetting"
  },
  {
    "slug": "sewer-clearing",
    "title": "Blocked sewer clearing",
    "caption": "Drainage equipment and hose access are shown around a home during sewer clearing.",
    "duration": 20,
    "width": 540,
    "height": 960,
    "video": "sewer-clearing.mp4",
    "poster": "sewer-clearing.webp",
    "serviceHref": "/services/sewer-drain-blockages/",
    "serviceLabel": "Sewer blockage assessment"
  },
  {
    "slug": "drain-overflow-response",
    "title": "Drain overflow response",
    "caption": "A site walkthrough shows the outdoor access route during a blocked drain callout.",
    "duration": 24,
    "width": 540,
    "height": 750,
    "video": "drain-overflow-response.mp4",
    "poster": "drain-overflow-response.webp",
    "serviceHref": "/services/sewer-drain-blockages/",
    "serviceLabel": "Sewer blockage assessment"
  },
  {
    "slug": "drain-pipework-installation",
    "title": "Drain pipework installation",
    "caption": "New pipework and a drainage pit are shown during installation beside a boundary wall.",
    "image": "drain-pipework-installation.webp",
    "width": 900,
    "height": 1200,
    "serviceHref": "/services/drain-repairs/",
    "serviceLabel": "Drain repair options"
  },
  {
    "slug": "restricted-access-excavation",
    "title": "Excavation beside a home",
    "caption": "A team member excavates a narrow side passage to access underground pipework.",
    "image": "restricted-access-excavation.webp",
    "width": 900,
    "height": 1200,
    "serviceHref": "/services/drain-repairs/",
    "serviceLabel": "Drain repair options"
  }
];
export const selectProjects = (slugs: string[]) => slugs.map(slug => projects.find(item => item.slug === slug)).filter((item): item is Project => Boolean(item));
export const serviceProjects = (slug: string): Project[] => {
  if (slug === 'high-pressure-water-jetting') return selectProjects(['sewer-jetting']);
  if (slug === 'sewer-drain-blockages') return selectProjects(['sewer-clearing','drain-overflow-response']);
  if (slug === 'drain-repairs') return selectProjects(['drain-pipework-installation','restricted-access-excavation']);
  return [];
};
export function projectSchema(items: Project[], pagePath: string) {
  return items.map(item => {
    const base = { '@id': new URL('/projects/'+item.slug+'#media',site.url).href, name: item.title, description: item.caption, creator: { '@type': 'Organization', name: site.operator }, isPartOf: { '@id': new URL(pagePath,site.url).href+'#webpage' } };
    return item.video ? { ...base, '@type': 'VideoObject', thumbnailUrl: new URL('/projects/'+item.poster,site.url).href, contentUrl: new URL('/projects/'+item.video,site.url).href, uploadDate: '2026-11-10', duration: 'PT'+item.duration+'S', encodingFormat: 'video/mp4', caption: item.caption+' Silent project excerpt.' } : { ...base, '@type': 'ImageObject', contentUrl: new URL('/projects/'+item.image,site.url).href, caption: item.caption, width: item.width, height: item.height };
  });
}
