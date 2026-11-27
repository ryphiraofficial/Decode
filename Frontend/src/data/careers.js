export const starterJobs = [
  { id: 'product-designer', slug: 'product-designer', title: 'Product Designer', department: 'Design', location: 'Kochi, India', mode: 'Hybrid', type: 'Full time', experience: '3+ years', summary: 'Shape thoughtful digital products from the first sketch to the final interaction.', description: 'Work with strategy, engineering, and client teams to turn complex problems into clear, useful digital experiences.', responsibilities: ['Lead discovery, flows, wireframes, and polished interface design.', 'Build and evolve design systems with the wider team.', 'Present and explain design decisions to clients and teammates.'], requirements: ['A portfolio showing strong product thinking and craft.', 'Experience with Figma and collaborative design workflows.', 'Clear communication and care for detail.'], published: true, image: '' },
  { id: 'frontend-engineer', slug: 'frontend-engineer', title: 'Frontend Engineer', department: 'Engineering', location: 'Kochi, India', mode: 'Hybrid', type: 'Full time', experience: '2+ years', summary: 'Build fast, accessible interfaces for ambitious brands and products.', description: 'Partner with designers and backend engineers to ship reliable, polished web experiences.', responsibilities: ['Develop responsive interfaces with React.', 'Connect frontend experiences to APIs and services.', 'Keep quality high through review, accessibility, and performance work.'], requirements: ['Strong JavaScript and React fundamentals.', 'Experience with modern CSS and API integration.', 'A practical, collaborative approach to solving problems.'], published: true, image: '' },
  { id: 'content-intern', slug: 'content-intern', title: 'Content & Social Intern', department: 'Marketing', location: 'Kochi, India', mode: 'On-site', type: 'Internship', experience: 'Entry level', summary: 'Help tell the stories behind the people, ideas, and work at DCOODE.', description: 'Support the team with research, writing, and social content across our channels.', responsibilities: ['Research and draft social and editorial content.', 'Help plan content calendars and capture studio moments.', 'Review performance and bring new ideas to the team.'], requirements: ['Strong writing and curiosity about digital culture.', 'Comfort with social platforms and basic visual tools.', 'A portfolio or examples of your work are welcome.'], published: true, image: '' },
];

const API = import.meta.env.VITE_API_URL;
export async function getJobs() {
  if (!API) return starterJobs;
  try { const r = await fetch(`${API}/api/jobs`); if (!r.ok) throw new Error(); return await r.json(); }
  catch { return starterJobs; }
}
export async function getJob(slug) {
  if (!API) return starterJobs.find((j) => j.slug === slug);
  try { const r = await fetch(`${API}/api/jobs/${slug}`); if (!r.ok) return undefined; return await r.json(); }
  catch { return starterJobs.find((j) => j.slug === slug); }
}
export async function applyToJob(slug, form) {
  if (!API) return { demo: true };
  const body = new FormData();
  for (const [key, value] of Object.entries(form)) body.append(key, value);
  const r = await fetch(`${API}/api/jobs/${slug}/applications`, { method: 'POST', body });
  const data = await r.json(); if (!r.ok) throw new Error(data.message || 'Application could not be submitted.'); return data;
}
export async function submitCareerEnquiry(form) {
  if (!API) return { demo: true };
  const body = new FormData();
  for (const [key, value] of Object.entries(form)) body.append(key, value);
  const r = await fetch(`${API}/api/enquiry`, { method: 'POST', body });
  const data = await r.json(); if (!r.ok) throw new Error(data.message || 'Enquiry could not be submitted.'); return data;
}
