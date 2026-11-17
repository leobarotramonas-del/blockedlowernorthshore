import { site } from './site';

export interface Project {
  slug: string; title: string; caption: string; width: number; height: number;
  uploadDate?: string; duration?: number; video?: string; poster?: string; image?: string;
  serviceHref: string; serviceLabel: string;
}
export const projects: Project[] = [
{
  "slug": "hot-water-replacement",
  "title": "Hot water replacement by the wider Antons team",
  "caption": "This completed hot water replacement is an example of the wider Antons team’s plumbing work. The footage shows a storage cylinder beside a brick wall, with insulated pipework and valves visible.",
  "width": 540,
  "height": 960,
  "duration": 8,
  "uploadDate": "2026-11-17",
  "video": "hot-water-replacement.mp4",
  "poster": "hot-water-replacement.webp",
  "serviceHref": "https://antonsplumbingandgas.com.au/service/hot-water-system-replacement/",
  "serviceLabel": "Antons hot water replacement service"
},
  {
    "slug": "sewer-jetting",
    "title": "Sewer drain jetting",
    "caption": "A technician handles the jetting hose during a sewer drain clearing job. The footage shows the working area and equipment used to reach the drainage line through an outdoor access point.",
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
    "caption": "Drainage equipment and hose access are shown around a home during sewer clearing. The footage records the working setup beside the building, including the route used to reach the affected drainage.",
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
    "caption": "This walkthrough records the outdoor access route during a blocked drain callout. It shows the surroundings the team works through, rather than establishing the cause of the blockage or a repair outcome.",
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
    "caption": "New pipework and a drainage pit are shown during installation beside a boundary wall. This work in progress photograph records the open trench and pipe layout before the area is reinstated.",
    "image": "drain-pipework-installation.webp",
    "width": 900,
    "height": 1200,
    "serviceHref": "/services/drain-repairs/",
    "serviceLabel": "Drain repair options"
  },
  {
    "slug": "restricted-access-excavation",
    "title": "Excavation beside a home",
    "caption": "A team member excavates a narrow side passage to access underground pipework. This work in progress photograph shows the limited working space between the home and fence during the drainage job.",
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
    return item.video ? { ...base, '@type': 'VideoObject', thumbnailUrl: new URL('/projects/'+item.poster,site.url).href, contentUrl: new URL('/projects/'+item.video,site.url).href, uploadDate: item.uploadDate ?? '2026-11-10', duration: 'PT'+item.duration+'S', encodingFormat: 'video/mp4', caption: item.caption+' Silent project excerpt.' } : { ...base, '@type': 'ImageObject', contentUrl: new URL('/projects/'+item.image,site.url).href, caption: item.caption, width: item.width, height: item.height };
  });
}
