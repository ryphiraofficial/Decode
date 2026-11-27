import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BriefcaseBusiness, Check, Download, FileText, LogOut, Plus, RefreshCw, Settings, Trash2, Upload, Users, X } from 'lucide-react';
import Logo from '../shared/Logo';
import './css/Careers.css';

const API = import.meta.env.VITE_API_URL;
const emptyJob = { title:'', department:'', location:'', mode:'Hybrid', type:'Full time', experience:'', summary:'', description:'', responsibilities:'', requirements:'', published:true, image:'' };

export default function CareersAdminPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [token,setToken] = useState(sessionStorage.getItem('careerAdminToken') || '');
  const [authorized,setAuthorized] = useState(false);
  const [section,setSection] = useState('jobs');
  const [jobs,setJobs] = useState([]);
  const [apps,setApps] = useState([]);
  const [appPage,setAppPage] = useState(1);
  const APP_PAGE_SIZE = 8;
  const [form,setForm] = useState(emptyJob);
  const [editingId,setEditingId] = useState(null);
  const [message,setMessage] = useState('');
  const [isLocked,setIsLocked] = useState(false);
  const [isDragging,setIsDragging] = useState(false);
  const [saving,setSaving] = useState(false);
  const [signingIn,setSigningIn] = useState(false);
  const [account,setAccount] = useState({ email:'', currentPassword:'', newPassword:'', confirmPassword:'' });
  const headers = { Authorization:`Bearer ${token}` };

  useEffect(()=>{ if(authorized) navigate('/admin/careers',{replace:true}); else if(!token) navigate('/admin/login',{replace:true}); },[authorized,token,navigate]);
  useEffect(()=>{ if(token) load(); },[token]);

  useEffect(() => {
    if (!token && API) {
      fetch(`${API}/api/admin/login-status?email=admin@dcoode.com`)
        .then(r => r.json())
        .then(data => {
          if (data?.locked) {
            setIsLocked(true);
            setMessage(data.message);
          }
        })
        .catch(() => {});
    }
  }, [token]);

  function processImageFile(file) {
    if (!file || !file.type?.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        setForm(prev => ({ ...prev, image: canvas.toDataURL('image/jpeg', 0.85) }));
        setMessage('Image attached successfully.');
      };
      img.onerror = () => {
        setForm(prev => ({ ...prev, image: e.target?.result || '' }));
        setMessage('Image attached.');
      };
      img.src = e.target?.result;
    };
    reader.readAsDataURL(file);
  }

  function handlePaste(e) {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type && items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          processImageFile(file);
          return;
        }
      }
    }
  }

  useEffect(() => {
    function onGlobalPaste(e) {
      if (!authorized || section !== 'jobs') return;
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type && items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            e.preventDefault();
            processImageFile(file);
            return;
          }
        }
      }
    }
    window.addEventListener('paste', onGlobalPaste);
    return () => window.removeEventListener('paste', onGlobalPaste);
  }, [authorized, section]);

  async function load(){
    try {
      if(!API) throw new Error('Admin service is not configured.');
      const [jobResponse, appResponse] = await Promise.all([
        fetch(`${API}/api/admin/jobs`,{headers}),
        fetch(`${API}/api/admin/applications`,{headers})
      ]);
      if(!jobResponse.ok || !appResponse.ok) throw new Error('Please sign in with an authorized admin account.');
      setJobs(await jobResponse.json());
      setApps(await appResponse.json());
      setAuthorized(true);
      setMessage('');
    } catch(error) {
      sessionStorage.removeItem('careerAdminToken'); setToken(''); setJobs([]); setApps([]);
      setMessage(error instanceof TypeError ? 'Cannot reach the admin server. Start the backend and check VITE_API_URL.' : error.message);
    }
  }
  async function login(event){
    event.preventDefault(); setMessage(''); setSigningIn(true);
    try {
      if (!API) throw new Error('The sign-in service is not configured. Please contact the site administrator.');
      const body=Object.fromEntries(new FormData(event.currentTarget));
      const response=await fetch(`${API}/api/admin/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      const data=await response.json().catch(() => null);
      if(response.status === 429) {
        setIsLocked(true);
        throw new Error(data?.message || 'Too many sign-in attempts. Please try again later.');
      }
      if(!response.ok) throw new Error(data?.message || 'Unable to sign in right now. Please try again later.');
      if (!data?.token) throw new Error('The sign-in service returned an unexpected response. Please try again later.');
      sessionStorage.setItem('careerAdminToken',data.token); setToken(data.token);
    } catch(error){ setMessage(error instanceof TypeError?'Cannot reach the sign-in service. Please try again later.':error.message); } finally { setSigningIn(false); }
  }
  async function save(event){
    event.preventDefault();
    setSaving(true); setMessage('');
    try {
      const payload={...form,responsibilities:form.responsibilities.split('\n').filter(Boolean),requirements:form.requirements.split('\n').filter(Boolean)};
      const url = editingId ? `${API}/api/admin/jobs/${editingId}` : `${API}/api/admin/jobs`;
      const response=await fetch(url,{method:editingId ? 'PATCH' : 'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify(payload)});
      if (!response.ok) throw new Error('Could not save this position. Please try again.');
      const success = editingId ? 'Position updated successfully.' : 'Position created successfully.';
      cancelEdit(); await load(); setMessage(success);
    } catch { setMessage('Could not save this position. Please try again.'); }
    finally { setSaving(false); }
  }
  async function openSettings() {
    setSection('settings'); setMessage('');
    try {
      const response = await fetch(`${API}/api/admin/account`, { headers });
      if (!response.ok) throw new Error();
      const data = await response.json();
      setAccount({ email:data.email, currentPassword:'', newPassword:'', confirmPassword:'' });
    } catch { setMessage('Could not load account settings. Please try again.'); }
  }
  async function saveAccount(event) {
    event.preventDefault(); setMessage('');
    if (account.newPassword !== account.confirmPassword) { setMessage('New passwords do not match.'); return; }
    setSaving(true);
    try {
      const response = await fetch(`${API}/api/admin/account`, { method:'PATCH', headers:{...headers,'Content-Type':'application/json'}, body:JSON.stringify({email:account.email,currentPassword:account.currentPassword,newPassword:account.newPassword}) });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.message || 'Could not update account settings. Please try again.');
      setAccount({email:data.email,currentPassword:'',newPassword:'',confirmPassword:''});
      setMessage('Account settings updated successfully.');
    } catch (error) { setMessage(error instanceof TypeError ? 'Cannot reach the server. Please try again.' : error.message); }
    finally { setSaving(false); }
  }
  function editJob(job){
    setEditingId(job._id || job.id);
    setForm({
      title: job.title || '',
      department: job.department || '',
      location: job.location || '',
      mode: job.mode || 'Hybrid',
      type: job.type || 'Full time',
      experience: job.experience || '',
      summary: job.summary || '',
      description: job.description || '',
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : (job.responsibilities || ''),
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : (job.requirements || ''),
      published: job.published !== false,
      image: job.image || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function cancelEdit(){
    setEditingId(null);
    setForm(emptyJob);
  }
  async function deleteJob(e, id){
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this position?')) return;
    try {
      const res = await fetch(`${API}/api/admin/jobs/${id}`, { method: 'DELETE', headers });
      if (!res.ok) throw new Error('Could not delete position.');
      setJobs(prev => prev.filter(j => (j._id || j.id) !== id));
      setMessage('Position deleted successfully.');
      if (editingId === id) cancelEdit();
    } catch (err) {
      setMessage(err.message);
    }
  }
  async function updateStatus(id,status){
    setApps(prev => prev.map(a => a._id === id ? { ...a, status } : a));
    try {
      await fetch(`${API}/api/admin/applications/${id}`,{method:'PATCH',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({status})});
    } catch {
      load();
    }
  }
  async function deleteApp(id, e){
    if(e) e.stopPropagation();
    if(!window.confirm('Are you sure you want to delete this submission?')) return;
    try {
      const res = await fetch(`${API}/api/admin/applications/${id}`, { method: 'DELETE', headers });
      if(!res.ok) throw new Error('Could not delete submission.');
      setApps(prev => prev.filter(a => a._id !== id));
      setMessage('Submission deleted successfully.');
    } catch(err) {
      setMessage(err.message || 'Could not delete submission.');
    }
  }
  const exportUrl=API?`${API}/api/admin/applications/export.xlsx?token=${encodeURIComponent(token)}`:'';
  function signOut(){ sessionStorage.removeItem('careerAdminToken'); setAuthorized(false); setToken(''); }

  if (!token) {
    return (
      <div className="career-admin career-admin-access">
        <div className="admin-access-panel">
          <a className="admin-back" href="/careers">← Back to careers</a>
          <header>
            <h1>Careers desk</h1>
            <p>Sign in with your authorized admin account.</p>
          </header>
          {message && <p className="admin-message" role="alert">{message}</p>}
          <form className="admin-login" onSubmit={login}>
            <label>
              Email address
              <input type="email" name="email" placeholder="admin@dcoode.com" autoComplete="username" disabled={isLocked} required />
            </label>
            <label>
              Password
              <input type="password" name="password" placeholder="••••••••••••" autoComplete="current-password" disabled={isLocked} required />
            </label>
            <button disabled={isLocked || signingIn}>
              {isLocked ? 'Account locked' : signingIn ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="admin-shell admin-shell-skeleton" aria-busy="true" aria-label="Loading workspace…">
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <Logo scale={1.05} />
            <small>Recruitment desk</small>
          </div>
          <nav aria-label="Admin navigation">
            <div className="admin-skeleton-nav-item" />
            <div className="admin-skeleton-nav-item" />
            <div className="admin-skeleton-nav-item" />
          </nav>
        </aside>
        <main className="admin-workspace">
          <div className="admin-workspace-head">
            <div>
              <div className="admin-skeleton-tag" />
              <div className="admin-skeleton-title" />
              <div className="admin-skeleton-sub" />
            </div>
          </div>
          <div className="admin-skeleton-grid">
            <div className="admin-skeleton-col">
              <div className="admin-skeleton-card" />
              <div className="admin-skeleton-card" />
              <div className="admin-skeleton-card" />
            </div>
            <div className="admin-skeleton-col admin-skeleton-col-wide">
              <div className="admin-skeleton-form" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  const field=(name,label,props={})=><label key={name}>{label}<input {...props} required value={form[name]} onChange={e=>setForm({...form,[name]:e.target.value})}/></label>;
  return <div className="admin-shell">
    <aside className="admin-sidebar">
      <a href="/careers" className="admin-brand"><Logo scale={1.05}/><small>Recruitment desk</small></a>
      <nav aria-label="Admin navigation">
        <button className={section==='jobs'?'active':''} onClick={()=>setSection('jobs')}><BriefcaseBusiness size={18}/> Positions <b>{jobs.length}</b></button>
        <button className={section==='applications'?'active':''} onClick={()=>setSection('applications')}><Users size={18}/> Applications <b>{apps.length}</b></button>
        <button className={section==='settings'?'active':''} onClick={openSettings}><Settings size={18}/> Settings</button>
      </nav>
      <div className="admin-sidebar-foot"><a href="/careers" target="_blank" rel="noreferrer"><FileText size={17}/> View careers page</a><button onClick={signOut}><LogOut size={17}/> Sign out</button></div>
    </aside>
    <main className="admin-workspace">
      <header className="admin-workspace-head"><div><span>DCOODE / TALENT</span><h1>{section==='jobs'?'Positions':section==='applications'?'Applications & Enquiries':'Settings'}</h1><p>{section==='jobs'?'Publish opportunities and manage active roles.':section==='applications'?'Review candidate submissions, career enquiries, and update their progress.':'Manage your sign-in details.'}</p></div>{(section === 'jobs' || section === 'applications') && <button className="admin-refresh" onClick={load}><RefreshCw size={16}/> Refresh</button>}</header>
      {message&&<p className="admin-message" role="status">{message}</p>}
      {section==='jobs'?<div className="admin-jobs-layout">
        <section className="admin-position-list">
          <div className="admin-section-title"><h2>Current roles</h2><span>{jobs.length} total</span></div>
          {jobs.length?jobs.map(job=><article
            key={job._id||job.id}
            className={`admin-pos-item ${editingId===(job._id||job.id)?'is-selected':''}`}
            onClick={()=>editJob(job)}
            role="button"
            tabIndex={0}
            onKeyDown={e=>{if(e.key==='Enter')editJob(job);}}
          >
            <div className="admin-pos-info">
              {job.image && <div className="admin-pos-thumb"><img src={job.image} alt="" /></div>}
              <div><span>{job.department}</span><h3>{job.title}</h3><p>{job.location} · {job.mode}</p></div>
            </div>
            <div className="admin-pos-meta">
              <b className={job.published===false?'draft':'live'}>{job.published===false?'Draft':'Live'}</b>
              <button
                type="button"
                className="admin-delete-pos-btn"
                title="Delete position"
                aria-label="Delete position"
                onClick={e=>deleteJob(e,job._id||job.id)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </article>):<p className="admin-empty">No positions have been created yet.</p>}
        </section>
        <form className="admin-job-form" onSubmit={save} onPaste={handlePaste}>
          <div className="admin-section-title">
            <div><span>{editingId ? 'EDIT POSITION' : 'NEW POSITION'}</span><h2>{editingId ? 'Edit opportunity' : 'Add an opportunity'}</h2></div>
            {editingId ? <button type="button" className="admin-cancel-edit-btn" onClick={cancelEdit}>Cancel edit</button> : <Plus size={20}/>}
          </div>
          
          <div className="admin-form-sections">
            <div className="admin-form-block">
              <div className="admin-block-header"><span className="admin-block-step">01</span><h3>Role Overview</h3></div>
              <div className="admin-form-grid">
                {field('title','Job title',{placeholder:'e.g. Lead Designer'})}
                {field('department','Department',{placeholder:'e.g. Design'})}
                {field('location','Location',{placeholder:'e.g. Kochi, India'})}
                {field('experience','Experience',{placeholder:'e.g. 3+ years'})}
                <label>Work mode<select value={form.mode} onChange={e=>setForm({...form,mode:e.target.value})}>{['Remote','Hybrid','On-site'].map(x=><option key={x}>{x}</option>)}</select></label>
                <label>Employment type<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>{['Full time','Part time','Contract','Internship'].map(x=><option key={x}>{x}</option>)}</select></label>
              </div>
            </div>

            <div className="admin-form-block">
              <div className="admin-block-header"><span className="admin-block-step">02</span><h3>Role Visual & Cover Image</h3></div>
              <div className="admin-upload-section">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) processImageFile(file);
                    e.target.value = '';
                  }}
                />
                {form.image ? (
                  <div className="admin-image-preview-card">
                    <div className="admin-image-preview-wrap">
                      <img src={form.image} alt="Position preview" />
                    </div>
                    <div className="admin-image-preview-info">
                      <div className="admin-image-preview-status">
                        <span className="admin-image-tag">Attached</span>
                        <p>This image will be displayed on the careers card.</p>
                      </div>
                      <div className="admin-image-preview-actions">
                        <button type="button" className="admin-btn-secondary" onClick={() => fileInputRef.current?.click()}>
                          <Upload size={14} /> Replace
                        </button>
                        <button type="button" className="admin-btn-danger" onClick={() => setForm(prev => ({ ...prev, image: '' }))}>
                          <X size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    tabIndex={0}
                    className={`admin-image-dropzone ${isDragging ? 'is-dragging' : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
                    onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={e => {
                      e.preventDefault();
                      setIsDragging(false);
                      const file = e.dataTransfer?.files?.[0];
                      if (file) processImageFile(file);
                    }}
                  >
                    <div className="admin-dropzone-icon">
                      <Upload size={22} />
                    </div>
                    <div className="admin-dropzone-text">
                      <strong>Click to upload</strong> or drag & drop an image here
                    </div>
                    <div className="admin-dropzone-sub">
                      <span>Supports JPG, PNG, WebP or GIF</span>
                      <span className="admin-dropzone-paste-pill">
                        <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste from clipboard
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="admin-form-block">
              <div className="admin-block-header"><span className="admin-block-step">03</span><h3>Description & Summary</h3></div>
              <div className="admin-form-stack">
                <label>Short summary <small>Teaser shown on careers cards (max 280 chars)</small><input required maxLength={280} placeholder="Brief 1-2 sentence pitch..." value={form.summary} onChange={e=>setForm({...form,summary:e.target.value})}/></label>
                <label>Full description<textarea required rows="4" placeholder="Detailed overview of the role..." value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label>
              </div>
            </div>

            <div className="admin-form-block">
              <div className="admin-block-header"><span className="admin-block-step">04</span><h3>Role Specifications</h3></div>
              <div className="admin-specs-grid">
                <label>Responsibilities <small>One item per line</small><textarea required rows="5" placeholder="Lead feature design&#10;Collaborate with engineering" value={form.responsibilities} onChange={e=>setForm({...form,responsibilities:e.target.value})}/></label>
                <label>Requirements <small>One item per line</small><textarea required rows="5" placeholder="3+ years experience&#10;Figma and design systems" value={form.requirements} onChange={e=>setForm({...form,requirements:e.target.value})}/></label>
              </div>
            </div>

            <div className="admin-form-footer">
              <label className="admin-publish"><input type="checkbox" checked={form.published} onChange={e=>setForm({...form,published:e.target.checked})}/> Publish immediately</label>
              <button className="admin-submit" disabled={saving}>{saving ? 'Saving?' : editingId ? 'Update position' : 'Create position'} {!saving && (editingId ? <Check size={17}/> : <Plus size={17}/>)}</button>
            </div>
          </div>
        </form>
      </div>:section==='applications'?<section className="admin-candidate-list">
        <div className="admin-section-title">
          <div><span>TALENT PIPELINE</span><h2>Applications & Enquiries</h2><span>{apps.length} total</span></div>
          <a href={exportUrl} className="admin-export-btn"><Download size={15}/> Export Excel</a>
        </div>
        {apps.length ? (
          <>
            <div className="admin-pipeline-table">
              <div className="admin-table-head">
                <span>Sl No</span>
                <span>Candidate</span>
                <span>Applied Role</span>
                <span>Contact</span>
                <span>Note / Cover</span>
                <span>Résumé</span>
                <span>Date</span>
                <span>Status</span>
                <span className="admin-th-action">Delete</span>
              </div>
              <div className="admin-table-body">
                {apps.slice((appPage - 1) * APP_PAGE_SIZE, appPage * APP_PAGE_SIZE).map((app, index) => (
                  <div className="admin-table-row" key={app._id}>
                    <div className="admin-col-sl">
                      <span>{String((appPage - 1) * APP_PAGE_SIZE + index + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="admin-col-candidate">
                      <strong>{app.name}</strong>
                    </div>
                    <div className="admin-col-role">
                      <span className="admin-role-badge">
                        {app.job?.title || app.enquiryType || 'General Career Enquiry'}
                      </span>
                    </div>
                    <div className="admin-col-contact">
                      <a href={`mailto:${app.email}`} className="admin-contact-email" title={app.email}>{app.email}</a>
                      {app.phone && <span className="admin-contact-phone">{app.phone}</span>}
                      {app.portfolio && <a href={app.portfolio} target="_blank" rel="noreferrer" className="admin-contact-link">Portfolio ↗</a>}
                    </div>
                    <div className="admin-col-note" title={app.coverNote}>
                      <p>{app.coverNote}</p>
                    </div>
                    <div className="admin-col-resume">
                      {app.resumeUrl ? (
                        <a href={`${API}${app.resumeUrl}?token=${encodeURIComponent(token)}`} target="_blank" rel="noreferrer" className="admin-resume-pill">
                          <FileText size={12} /> View CV ↗
                        </a>
                      ) : (
                        <span className="admin-no-cv">—</span>
                      )}
                    </div>
                    <div className="admin-col-date">
                      <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="admin-col-status">
                      <select aria-label={`Status for ${app.name}`} value={app.status} onChange={e=>updateStatus(app._id,e.target.value)}>
                        {['New','Reviewing','Shortlisted','Rejected','Hired'].map(status=><option key={status}>{status}</option>)}
                      </select>
                    </div>
                    <div className="admin-col-action">
                      <button
                        type="button"
                        className="admin-app-delete-btn"
                        title="Delete application"
                        aria-label={`Delete application from ${app.name}`}
                        onClick={(e) => deleteApp(app._id, e)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {apps.length > 0 && (
              <div className="admin-pagination">
                <span className="admin-pagination-info">
                  Showing {(appPage - 1) * APP_PAGE_SIZE + 1}–{Math.min(appPage * APP_PAGE_SIZE, apps.length)} of {apps.length}
                </span>
                <div className="admin-pagination-controls">
                  <button
                    type="button"
                    className="admin-page-nav-btn"
                    disabled={appPage === 1}
                    onClick={() => setAppPage(p => Math.max(1, p - 1))}
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.ceil(apps.length / APP_PAGE_SIZE) }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      type="button"
                      className={`admin-page-num-btn ${appPage === page ? 'active' : ''}`}
                      onClick={() => setAppPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="admin-page-nav-btn"
                    disabled={appPage >= Math.ceil(apps.length / APP_PAGE_SIZE)}
                    onClick={() => setAppPage(p => Math.min(Math.ceil(apps.length / APP_PAGE_SIZE), p + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="admin-empty">No applications or enquiries have been received yet.</p>
        )}
      </section>:<form className="admin-job-form admin-settings" onSubmit={saveAccount}>
        <div className="admin-section-title"><div><span>ACCOUNT ACCESS</span><h2>Sign-in details</h2></div></div>
        <p className="admin-settings-intro">Update your email address or choose a new password. Enter your current password to confirm changes.</p>
        <div className="admin-form-stack">
          <label>Email address<input type="email" autoComplete="username" required value={account.email} onChange={e=>setAccount({...account,email:e.target.value})}/></label>
          <label>Current password<input type="password" autoComplete="current-password" required value={account.currentPassword} onChange={e=>setAccount({...account,currentPassword:e.target.value})}/></label>
          <label>New password <small>Leave blank to keep your current password. At least 8 characters.</small><input type="password" autoComplete="new-password" minLength={8} value={account.newPassword} onChange={e=>setAccount({...account,newPassword:e.target.value})}/></label>
          <label>Confirm new password<input type="password" autoComplete="new-password" value={account.confirmPassword} onChange={e=>setAccount({...account,confirmPassword:e.target.value})}/></label>
        </div>
        <button className="admin-submit" disabled={saving}>{saving ? 'Saving?' : 'Save changes'} {!saving && <Check size={17}/>}</button>
      </form>}
    </main>
  </div>;
}
