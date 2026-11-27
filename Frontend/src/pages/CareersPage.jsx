import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ChevronDown, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getJobs, submitCareerEnquiry } from '../data/careers';
import './css/Careers.css';

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('All teams');
  const [query, setQuery] = useState('');
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [busy, setBusy] = useState(false);
  const [consented, setConsented] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { getJobs().then(setJobs); }, []);
  const teams = useMemo(() => ['All teams', ...new Set(jobs.map(j => j.department))], [jobs]);
  const visible = jobs.filter(j => j.published !== false && (filter === 'All teams' || filter === j.department) && `${j.title} ${j.department} ${j.location} ${j.summary}`.toLowerCase().includes(query.toLowerCase()));

  async function handleEnquirySubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    const form = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await submitCareerEnquiry(form);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Could not submit your enquiry.');
    } finally {
      setBusy(false);
    }
  }

  return <div className="careers-page">
    <section className="careers-hero"><div className="careers-hero-image" aria-hidden="true"/><div className="careers-hero-content"><h1>Make work<br/><em>matter.</em></h1><div className="careers-hero-bottom"><p>Good work starts with good people. Bring your point of view, make things with care, and help build what comes next.</p><a href="#open-roles" aria-label="Explore open positions"><ArrowDownRight size={30}/></a></div></div></section>
    <section className="careers-intro"><div aria-hidden="true"/><h2>Small teams.<br/>Big intent.</h2><p>We are strategists, designers, and engineers who care about the details and the difference they make. We stay curious, share the credit, and make room for people to do their best work.</p></section>
    <section className="careers-roles" id="open-roles">
      <div className="careers-roles-head">
        <div>
          <h2>Find your <em>place here.</em></h2>
        </div>
      </div>

      <div className="careers-controls-bar">
        <div className="careers-filter-dropdown-wrap">
          <label htmlFor="career-team-select" className="careers-visually-hidden">Filter by department</label>
          <select
            id="career-team-select"
            className="careers-filter-select"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            {teams.map(t => {
              const count = t === 'All teams'
                ? jobs.filter(j => j.published !== false).length
                : jobs.filter(j => j.published !== false && j.department === t).length;
              return (
                <option key={t} value={t}>
                  {t} ({count})
                </option>
              );
            })}
          </select>
          <ChevronDown size={15} className="careers-dropdown-chevron" aria-hidden="true" />
        </div>

        <form className="careers-search-box" onSubmit={e => e.preventDefault()} role="search">
          <Search size={16} className="careers-search-icon" aria-hidden="true" />
          <input
            id="career-search"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search roles by title or keyword…"
            aria-label="Search open roles"
          />
          {query && (
            <button
              type="button"
              className="careers-search-clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </form>
      </div>

      {visible.length ? (
        <div className="career-grid">
          {visible.map((job, i) => (
            <Link className="career-card" to={`/careers/${job.slug}`} key={job.id}>
              <div className={`career-card-art career-card-art--${i % 3}`}>
                <span>{job.department}</span>
                <img
                  className={job.image ? "career-card-custom-img" : ""}
                  src={job.image || "/images/careers-ribbon.png"}
                  alt=""
                />
              </div>
              <div className="career-card-content">
                <div>
                  <h3>{job.title}</h3>
                  <p>{job.summary}</p>
                </div>
                <footer>
                  <span>{job.location} · {job.mode}</span>
                  <ArrowUpRight size={18} />
                </footer>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="careers-empty">
          <p>No open roles match your current filters.</p>
          {(filter !== 'All teams' || query) && (
            <button
              type="button"
              className="careers-reset-btn"
              onClick={() => { setFilter('All teams'); setQuery(''); }}
            >
              Reset filters
            </button>
          )}
        </div>
      )}
    </section>

    <section className="careers-note">
      <div className="careers-note-bar">
        <p>Great people don’t always fit a job description.</p>
        <button
          type="button"
          className="careers-note-link"
          onClick={() => { setShowEnquiry(prev => !prev); setSent(false); }}
        >
          {showEnquiry ? 'Hide enquiry form' : 'Tell us what you’d bring'} <ArrowUpRight size={16} />
        </button>
      </div>

      {showEnquiry && (
        <div className="career-enquiry-box">
          {sent ? (
            <div className="career-enquiry-success">
              <h3>Enquiry received.</h3>
              <p>Thanks for sharing your profile. The DCOODE team will review your application and reach out if there’s a fit.</p>
              <button type="button" onClick={() => { setSent(false); setShowEnquiry(false); }}>Close</button>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit} className="career-enquiry-form">
              <div className="career-enquiry-head">
                <div>
                  <span className="careers-index">OPEN APPLICATION</span>
                  <h2>General career enquiry</h2>
                </div>
                <button type="button" className="career-enquiry-close" onClick={() => setShowEnquiry(false)} aria-label="Close form">
                  <X size={18} />
                </button>
              </div>

              <div className="career-enquiry-grid">
                <label>Full name<input name="name" required placeholder="Your full name" autoComplete="name" /></label>
                <label>Email address<input name="email" type="email" required placeholder="you@domain.com" autoComplete="email" /></label>
                <label>Phone number<input name="phone" type="tel" required placeholder="+91 ..." autoComplete="tel" /></label>
                <label>Portfolio / LinkedIn<input name="portfolio" type="url" placeholder="https://" /></label>
              </div>

              <label className="career-enquiry-wide">
                Tell us about yourself & what you’d bring
                <textarea name="coverNote" rows="4" required placeholder="Introduce your background, skillsets, and what kind of work you’re excited to do at DCOODE..." />
              </label>

              <label className="career-enquiry-wide">
                Attach résumé <small>(PDF, DOC, or DOCX up to 4MB)</small>
                <input name="resume" type="file" accept=".pdf,.doc,.docx" required />
              </label>

              <label className="career-consent">
                <input name="consent" type="checkbox" checked={consented} onChange={e => setConsented(e.target.checked)} required /> I agree to DCOODE processing my application details for future talent opportunities.
              </label>

              {error && <p className="career-error">{error}</p>}

              <button className="career-enquiry-submit" disabled={!consented || busy}>
                {busy ? 'Submitting…' : 'Submit career enquiry'} <ArrowUpRight size={16} />
              </button>
            </form>
          )}
        </div>
      )}
    </section>
  </div>;
}
