import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getJobs } from '../data/careers';
import './css/Careers.css';

export default function CareersPage() {
  const [jobs, setJobs] = useState([]); const [filter, setFilter] = useState('All teams'); const [query,setQuery]=useState('');
  useEffect(() => { getJobs().then(setJobs); }, []);
  const teams = useMemo(() => ['All teams', ...new Set(jobs.map(j => j.department))], [jobs]);
  const visible = jobs.filter(j => j.published !== false && (filter === 'All teams' || filter === j.department) && `${j.title} ${j.department} ${j.location} ${j.summary}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="careers-page">
    <section className="careers-hero"><div className="careers-hero-image" aria-hidden="true"/><div className="careers-hero-content"><h1>Make work<br/><em>matter.</em></h1><div className="careers-hero-bottom"><p>Good work starts with good people. Bring your point of view, make things with care, and help build what comes next.</p><a href="#open-roles" aria-label="Explore open positions"><ArrowDownRight size={30}/></a></div></div></section>
    <section className="careers-intro"><div aria-hidden="true"/><h2>Small teams.<br/>Big intent.</h2><p>We are strategists, designers, and engineers who care about the details and the difference they make. We stay curious, share the credit, and make room for people to do their best work.</p></section>
    <section className="careers-roles" id="open-roles"><div className="careers-roles-head"><div><h2>Find your <em>place here.</em></h2></div><div className="careers-controls"><div className="careers-filter"><span>TEAM</span><div className="careers-team-options" role="group" aria-label="Filter by team">{teams.map(t=><button key={t} type="button" className={filter===t?'active':''} aria-pressed={filter===t} onClick={()=>setFilter(t)}>{t}</button>)}</div></div><form className="careers-search" onSubmit={e=>e.preventDefault()}><label htmlFor="career-search">SEARCH</label><div><input id="career-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search roles"/><button aria-label="Search positions" type="submit"><Search size={17}/></button></div></form></div></div>
      {visible.length ? <div className="career-grid">{visible.map((job, i) => <Link className="career-card" to={`/careers/${job.slug}`} key={job.id}><div className={`career-card-art career-card-art--${i % 3}`}><span>{job.department}</span><img className={job.image ? "career-card-custom-img" : ""} src={job.image || "/images/careers-ribbon.png"} alt="" /></div><div className="career-card-content"><div><h3>{job.title}</h3><p>{job.summary}</p></div><footer><span>{job.location} · {job.mode}</span><ArrowUpRight size={18}/></footer></div></Link>)}</div> : <p className="careers-empty">No open roles in this team right now. Check back soon.</p>}
    </section>
    <section className="careers-note"><p>Great people don’t always fit a job description. <a href="mailto:dcoodeofficial@gmail.com">Tell us what you’d bring <ArrowUpRight size={16}/></a></p></section>
  </div>;
}
