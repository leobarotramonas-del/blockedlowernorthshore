import { site } from './site';
export interface LocalAssignment { layout: 'rail' | 'field-note' | 'pair' | 'rows'; clips: string[]; title: string; context: string; }
export const localClips = [
  {
    "slug": "excavation-detail",
    "title": "Excavation work in progress",
    "duration": 3,
    "width": 480,
    "height": 400,
    "video": "excavation-detail.mp4",
    "poster": "excavation-detail.webp",
    "uploadDate": "2026-11-18T07:36:09Z",
    "caption": "Digging is underway in an open trench beside a brick wall, with an orange hose nearby. The close view shows the working space around the exposed ground during excavation.",
    "serviceHref": "/services/drain-repairs/",
    "serviceLabel": "Explore drain repair planning"
  },
  {
    "slug": "drain-access-setup",
    "title": "Drain-access equipment on site",
    "duration": 7,
    "width": 480,
    "height": 388,
    "video": "drain-access-setup.mp4",
    "poster": "drain-access-setup.webp",
    "uploadDate": "2026-11-18T07:36:09Z",
    "caption": "Drain access equipment, a hose reel and tools are set out on a wet paved driveway beside a house. The footage shows how equipment occupies the approach to the work area.",
    "serviceHref": "/services/cctv-drain-inspections/",
    "serviceLabel": "Explore drain assessment"
  },
  {
    "slug": "team-on-site",
    "title": "Meet the team on site",
    "duration": 7,
    "width": 480,
    "height": 848,
    "video": "team-on-site.mp4",
    "poster": "team-on-site.webp",
    "uploadDate": "2026-11-18T07:36:09Z",
    "caption": "A team member introduces the crew beside a house, with a hose reel and drain access equipment on the driveway. This on-site view shows the people and working setup together.",
    "serviceHref": "/services/sewer-drain-blockages/",
    "serviceLabel": "Explore drain assessment"
  },
  {
    "slug": "drain-work-montage",
    "title": "Drainage work and access",
    "duration": 13,
    "width": 480,
    "height": 848,
    "video": "drain-work-montage.mp4",
    "poster": "drain-work-montage.webp",
    "uploadDate": "2026-11-18T07:36:09Z",
    "caption": "This montage moves between equipment inside a bathroom, outdoor drain access and team members working around homes. The different scenes show how access and equipment placement vary between working areas.",
    "serviceHref": "/services/sewer-drain-blockages/",
    "serviceLabel": "Explore drain assessment"
  }
];
export const localAssignments: Record<string, LocalAssignment> = {
  "north-sydney": {
    "layout": "pair",
    "clips": [
      "team-on-site",
      "drain-work-montage"
    ],
    "title": "The team and drainage access",
    "context": "When arranging a North Sydney drain visit, explain the affected fixtures and who can provide access. These views show the team and equipment working around residential properties."
  },
  "chatswood": {
    "layout": "rail",
    "clips": [
      "drain-access-setup"
    ],
    "title": "Making room for drain equipment",
    "context": "For a slow waste in Chatswood, tell us which fixtures are affected and how the team can reach them. Equipment choice follows the assessment and available access."
  },
  "lane-cove": {
    "layout": "field-note",
    "clips": [
      "excavation-detail"
    ],
    "title": "Access for drainage excavation",
    "context": "For Lane Cove properties with recurring root problems, clearing and repair are separate decisions. Describe the route to the affected line when discussing an assessment."
  },
  "mosman": {
    "layout": "rows",
    "clips": [
      "excavation-detail",
      "drain-access-setup"
    ],
    "title": "From equipment access to excavation",
    "context": "When planning drainage work in Mosman, explain gates, steps and the route beside the building. These working views help show why equipment access matters before a repair is agreed."
  },
  "neutral-bay": {
    "layout": "rail",
    "clips": [
      "drain-access-setup"
    ],
    "title": "Making room for drain equipment",
    "context": "For a slow waste in Neutral Bay, tell us which fixtures are affected and how the team can reach them. Equipment choice follows the assessment and available access."
  },
  "st-leonards": {
    "layout": "pair",
    "clips": [
      "team-on-site",
      "drain-work-montage"
    ],
    "title": "The team and drainage access",
    "context": "When arranging a St Leonards drain visit, explain the affected fixtures and who can provide access. These views show the team and equipment working around residential properties."
  },
  "crows-nest": {
    "layout": "rail",
    "clips": [
      "drain-access-setup"
    ],
    "title": "Making room for drain equipment",
    "context": "For a slow waste in Crows Nest, tell us which fixtures are affected and how the team can reach them. Equipment choice follows the assessment and available access."
  },
  "willoughby": {
    "layout": "field-note",
    "clips": [
      "excavation-detail"
    ],
    "title": "Access for drainage excavation",
    "context": "For Willoughby properties with recurring root problems, clearing and repair are separate decisions. Describe the route to the affected line when discussing an assessment."
  },
  "artarmon": {
    "layout": "rail",
    "clips": [
      "drain-access-setup"
    ],
    "title": "Making room for drain equipment",
    "context": "For a slow waste in Artarmon, tell us which fixtures are affected and how the team can reach them. Equipment choice follows the assessment and available access."
  },
  "naremburn": {
    "layout": "pair",
    "clips": [
      "team-on-site",
      "drain-work-montage"
    ],
    "title": "The team and drainage access",
    "context": "When arranging a Naremburn drain visit, explain the affected fixtures and who can provide access. These views show the team and equipment working around residential properties."
  },
  "cammeray": {
    "layout": "rows",
    "clips": [
      "excavation-detail",
      "drain-access-setup"
    ],
    "title": "From equipment access to excavation",
    "context": "When planning drainage work in Cammeray, explain gates, steps and the route beside the building. These working views help show why equipment access matters before a repair is agreed."
  },
  "cremorne": {
    "layout": "pair",
    "clips": [
      "team-on-site",
      "drain-work-montage"
    ],
    "title": "The team and drainage access",
    "context": "When arranging a Cremorne drain visit, explain the affected fixtures and who can provide access. These views show the team and equipment working around residential properties."
  },
  "kirribilli": {
    "layout": "pair",
    "clips": [
      "team-on-site",
      "drain-work-montage"
    ],
    "title": "The team and drainage access",
    "context": "When arranging a Kirribilli drain visit, explain the affected fixtures and who can provide access. These views show the team and equipment working around residential properties."
  },
  "milsons-point": {
    "layout": "pair",
    "clips": [
      "team-on-site",
      "drain-work-montage"
    ],
    "title": "The team and drainage access",
    "context": "When arranging a Milsons Point drain visit, explain the affected fixtures and who can provide access. These views show the team and equipment working around residential properties."
  },
  "mcmahons-point": {
    "layout": "rows",
    "clips": [
      "excavation-detail",
      "drain-access-setup"
    ],
    "title": "From equipment access to excavation",
    "context": "When planning drainage work in McMahons Point, explain gates, steps and the route beside the building. These working views help show why equipment access matters before a repair is agreed."
  },
  "lavender-bay": {
    "layout": "rows",
    "clips": [
      "excavation-detail",
      "drain-access-setup"
    ],
    "title": "From equipment access to excavation",
    "context": "When planning drainage work in Lavender Bay, explain gates, steps and the route beside the building. These working views help show why equipment access matters before a repair is agreed."
  },
  "wollstonecraft": {
    "layout": "field-note",
    "clips": [
      "excavation-detail"
    ],
    "title": "Access for drainage excavation",
    "context": "For Wollstonecraft properties with recurring root problems, clearing and repair are separate decisions. Describe the route to the affected line when discussing an assessment."
  },
  "waverton": {
    "layout": "field-note",
    "clips": [
      "excavation-detail"
    ],
    "title": "Access for drainage excavation",
    "context": "For Waverton properties with recurring root problems, clearing and repair are separate decisions. Describe the route to the affected line when discussing an assessment."
  },
  "greenwich": {
    "layout": "rows",
    "clips": [
      "excavation-detail",
      "drain-access-setup"
    ],
    "title": "From equipment access to excavation",
    "context": "When planning drainage work in Greenwich, explain gates, steps and the route beside the building. These working views help show why equipment access matters before a repair is agreed."
  },
  "longueville": {
    "layout": "field-note",
    "clips": [
      "excavation-detail"
    ],
    "title": "Access for drainage excavation",
    "context": "For Longueville properties with recurring root problems, clearing and repair are separate decisions. Describe the route to the affected line when discussing an assessment."
  }
};
export function localVideoSchema(assignment: LocalAssignment, path: string) { return assignment.clips.map(slug => { const c = localClips.find(c => c.slug === slug)!; return { '@type':'VideoObject', '@id':new URL(path,site.url).href+'#'+c.slug, name:c.title,description:c.caption,thumbnailUrl:new URL('/projects/local/'+c.poster,site.url).href,contentUrl:new URL('/projects/local/'+c.video,site.url).href,uploadDate:c.uploadDate,duration:'PT'+c.duration+'S',creator:{'@type':'Organization',name:site.operator},isPartOf:{'@id':new URL(path,site.url).href+'#webpage'} }; }); }
