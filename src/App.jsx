import React, { useState, useEffect } from 'react';

// --- CSS Styles (Glassmorphism, Centering & Mobile Responsive) ---
const styles = `
  :root {
    --primary: #6366f1;
    --accent-pink: #ec4899;
    --bg-dark: #0f172a;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --glass-bg: rgba(15, 23, 42, 0.6);
    --glass-border: rgba(255, 255, 255, 0.1);
  }

  /* FIXED: Added Flex Centering to Body so the app sits in the middle of the screen */
  body { 
    margin: 0; 
    background: var(--bg-dark); 
    font-family: 'Segoe UI', sans-serif; 
    overflow: hidden; 
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  }
  
  /* Desktop Layout (Default) */
  .app-container {
    position: relative; 
    z-index: 10; 
    width: 95vw; 
    height: 90vh;
    background: var(--glass-bg); 
    backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border); 
    border-radius: 24px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    display: grid; 
    grid-template-columns: 280px 1fr 280px; 
    overflow: hidden;
    color: var(--text-main);
    /* removed margin: 5vh auto since body handles centering now */
  }
  
  .col { padding: 1.5rem; display: flex; flex-direction: column; border-right: 1px solid var(--glass-border); position: relative; }
  .col:last-child { border-right: none; }
  
  /* Typography & Centering */
  h2, h3 { 
    text-align: center !important; width: 100%; margin: 0 0 1rem 0; 
    font-weight: 500; display: block;
  }
  h3 { text-transform: uppercase; font-size: 0.8rem; color: var(--text-muted); letter-spacing: 0.1em; }
  
  /* Toolbar: Ensures badge is Left and buttons are Right */
  .toolbar {
    display: flex; 
    justify-content: space-between; 
    margin-bottom: 1rem; 
    align-items: center; 
    width: 100%;
  }
  
  .btn-group {
    display: flex; gap: 8px;
  }

  .status-badge {
    background: rgba(255,255,255,0.1); padding: 0 16px; height: 32px;
    border-radius: 20px; font-size: 0.8rem; display: inline-flex;
    align-items: center; justify-content: center; min-width: 60px;
    white-space: nowrap;
  }

  .drop-zone {
    flex: 1; border: 2px dashed var(--glass-border); border-radius: 16px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s; color: var(--text-muted); text-align: center;
  }
  .drop-zone:hover { border-color: var(--primary); background: rgba(99, 102, 241, 0.1); color: white; }
  
  .btn {
    background: rgba(255,255,255,0.1); border: 1px solid var(--glass-border); color: white;
    padding: 8px 16px; border-radius: 8px; cursor: pointer; 
    display: flex; align-items: center; justify-content: center; gap: 8px;
    white-space: nowrap;
  }
  .btn:hover { background: rgba(255,255,255,0.2); }
  .btn-primary { background: var(--primary); border-color: var(--primary); }
  
  textarea {
    width: 100%; height: 100%; background: rgba(0,0,0,0.2); border: none;
    color: var(--text-main); padding: 1.5rem; resize: none; outline: none;
    font-family: 'Courier New', monospace; border-radius: 12px;
    overflow-y: auto;
  }

  /* Custom Scrollbar Styling */
  textarea::-webkit-scrollbar { width: 8px; }
  textarea::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 0 12px 12px 0; }
  textarea::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
  textarea::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
  
  .file-tab {
    padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px;
    cursor: pointer; margin-bottom: 8px; transition: 0.2s; display: flex; 
    justify-content: space-between; align-items: center;
  }
  .file-tab.active { background: rgba(99, 102, 241, 0.2); border: 1px solid var(--primary); }
  
  .blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.5; z-index: -1; }
  
  .progress-bar { 
    height: 4px; 
    background: rgba(255,255,255,0.1); 
    position: absolute; 
    bottom: 0; 
    left: 0; 
    width: 100%; 
    z-index: 5;
  }
  .progress-fill { height: 100%; background: var(--primary); width: 0%; transition: width 0.3s; }

  /* --- MOBILE RESPONSIVE LAYOUT --- */
  @media (max-width: 768px) {
    body {
      display: block; /* Reset flex on body for mobile to prevent squishing */
    }
    .app-container {
      width: 100%;
      height: 100dvh;
      margin: 0;
      border: none;
      border-radius: 0;
      grid-template-columns: 1fr; 
      grid-template-rows: auto 1fr 200px; 
    }

    .col {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid var(--glass-border);
      padding: 1rem;
    }

    /* 1. Top Section: Import */
    .col:nth-child(1) {
      height: auto;
      padding-bottom: 1rem;
    }
    .col:nth-child(1) h2 { 
      display: none; 
    }
    .drop-zone {
      min-height: 60px;
      flex-direction: row; 
      gap: 15px;
    }
    .drop-icon {
      font-size: 1.5rem !important;
      margin-bottom: 0 !important;
    }

    /* 2. Middle Section: Output */
    .col:nth-child(2) {
      overflow: hidden;
    }
    
    .toolbar {
      gap: 10px;
    }
    .btn {
      padding: 6px 10px;
      font-size: 0.85rem;
    }
    .btn-group {
      gap: 5px;
    }

    /* 3. Bottom Section: Files */
    .col:nth-child(3) {
      border-bottom: none;
      background: rgba(0,0,0,0.2);
    }
    .col:nth-child(3) h3 {
      text-align: left !important;
      margin-bottom: 0.5rem;
    }
  }
`;

export default function App() {
  const [files, setFiles] = useState([]); 
  const [activeId, setActiveId] = useState(null);
  const [isReady, setIsReady] = useState(false);
  
  const activeFile = files.find(f => f.id === activeId);

  // --- Load Libraries Dynamically ---
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'),
      loadScript('https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js')
    ]).then(() => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      setIsReady(true);
    }).catch(err => console.error("Failed to load libraries", err));
  }, []);

  // --- File Handling ---
  const handleFiles = (fileList) => {
    if (!isReady) return alert("Libraries still loading...");
    
    const newFiles = Array.from(fileList).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      text: '',
      status: 'pending',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);
    if (!activeId && newFiles.length > 0) setActiveId(newFiles[0].id);

    newFiles.forEach(processFile);
  };

  const processFile = async (fileObj) => {
    updateFile(fileObj.id, { status: 'processing', progress: 5 });

    try {
      let text = "";
      if (fileObj.file.type === 'application/pdf') {
        text = await extractPDF(fileObj);
      } else if (fileObj.file.type.startsWith('image/')) {
        text = await extractImage(fileObj);
      } else {
        text = "Unsupported file type.";
      }
      updateFile(fileObj.id, { text, status: 'done', progress: 100 });
    } catch (err) {
      console.error(err);
      updateFile(fileObj.id, { text: "Error: " + err.message, status: 'error' });
    }
  };

  const updateFile = (id, updates) => {
    setFiles(prev => prev.map(f => (f.id === id ? { ...f, ...updates } : f)));
  };

  // --- Extraction Logic ---
  const extractPDF = async (fileObj) => {
    const buffer = await fileObj.file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
    let fullText = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      updateFile(fileObj.id, { progress: Math.round(((i-1)/pdf.numPages)*100) });
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      let pageText = content.items.map(item => item.str).join(' ');

      if (pageText.replace(/\s/g, '').length < 20) {
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        const { data } = await window.Tesseract.recognize(canvas, 'eng');
        pageText = data.text;
      }
      fullText.push(pageText);
    }
    return fullText.join('\n\n');
  };

  const extractImage = async (fileObj) => {
    const { data } = await window.Tesseract.recognize(fileObj.file, 'eng', {
      logger: m => {
        if (m.status === 'recognizing text') {
          fileObj.progress = Math.round(m.progress * 100);
          if(state.activeFileId === fileObj.id) updateProgressBar(fileObj.progress);
        }
      }
    });
    return data.text;
  };

  const copyText = () => {
    if (!activeFile?.text) return;
    navigator.clipboard.writeText(activeFile.text);
    alert("Copied!");
  };

  const readText = () => {
    if (!activeFile?.text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(activeFile.text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="blob" style={{ top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'var(--primary)' }}></div>
      <div className="blob" style={{ bottom: '-10%', right: '-10%', width: '400px', height: '400px', background: 'var(--accent-pink)' }}></div>

      <div className="app-container">
        {/* Left: Import */}
        <div className="col">
          <h2>Import</h2>
          <div className="drop-zone"
               onClick={() => document.getElementById('fileInput').click()}
               onDragOver={e => e.preventDefault()}
               onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}>
            <input type="file" id="fileInput" multiple hidden onChange={e => handleFiles(e.target.files)} />
            <span className="drop-icon" style={{fontSize: '2rem', marginBottom: '10px'}}>☁️</span>
            <div>Drop PDF/Images</div>
          </div>
        </div>

        {/* Center: Output */}
        <div className="col">
          <div className="toolbar">
             <div className="status-badge">
               {activeFile ? (activeFile.status === 'processing' ? 'Processing...' : 'Ready') : 'Idle'}
             </div>
             <div className="btn-group">
               <button className="btn" onClick={() => window.speechSynthesis.cancel()}>Stop</button>
               <button className="btn" onClick={readText}>Read</button>
               <button className="btn btn-primary" onClick={copyText}>Copy</button>
             </div>
          </div>
          <div style={{flex: 1, position: 'relative', overflow: 'hidden', borderRadius: '12px'}}>
            <textarea readOnly value={activeFile?.text || ''} placeholder="Select a file..." />
            {activeFile?.status === 'processing' && (
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${activeFile.progress}%`}}></div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Files */}
        <div className="col">
          <h3>Files</h3>
          <div style={{overflowY: 'auto', flex: 1}}>
            {files.map(f => (
              <div key={f.id} className={`file-tab ${activeId === f.id ? 'active' : ''}`} onClick={() => setActiveId(f.id)}>
                <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{f.name}</span>
                {f.status === 'done' && <span style={{color: '#4ade80'}}>✓</span>}
              </div>
            ))}
            {files.length === 0 && <div style={{textAlign: 'center', color: 'var(--text-muted)', marginTop: '20px'}}>No files</div>}
          </div>
        </div>
      </div>
    </>
  );
}
