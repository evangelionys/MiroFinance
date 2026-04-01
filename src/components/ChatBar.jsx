import { useState, useRef } from 'react';
import { Send, Paperclip, Sparkles, Image, FileUp, X } from 'lucide-react';

export default function ChatBar() {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const fileRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files.map(f => ({ name: f.name, type: f.type.startsWith('image/') ? 'image' : 'file' }))]);
  };

  const removeAttachment = (i) => setAttachments(prev => prev.filter((_, idx) => idx !== i));

  return (
    <div className="border-t border-border bg-surface px-6 py-3 shrink-0">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex gap-2 mb-2 flex-wrap">
          {attachments.map((a, i) => (
            <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-bg border border-border rounded-lg text-[11px] text-text-secondary">
              {a.type === 'image' ? <Image size={12} className="text-primary" /> : <FileUp size={12} className="text-primary" />}
              <span className="max-w-[120px] truncate">{a.name}</span>
              <button onClick={() => removeAttachment(i)} className="text-text-tertiary hover:text-red cursor-pointer">
                <X size={11} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 bg-bg rounded-xl border border-border px-4 py-2.5">
        <Sparkles size={16} className="text-primary shrink-0" />
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Ask AI anything about your portfolio, markets, or research..."
          className="flex-1 bg-transparent text-[13px] text-text-primary placeholder-text-tertiary outline-none"
        />

        {/* Paperclip attachment button */}
        <button onClick={() => fileRef.current?.click()}
          title="Upload files or images"
          className="p-1.5 text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer">
          <Paperclip size={16} />
        </button>

        {/* Hidden file input (accepts both files and images) */}
        <input ref={fileRef} type="file" className="hidden" onChange={handleFileSelect} multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.json,image/*" />

        <button className="p-1.5 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors cursor-pointer">
          <Send size={14} />
        </button>
      </div>
      <p className="text-[10px] text-text-tertiary mt-1.5 text-center">Conversations are saved to your Workspace for future reference</p>
    </div>
  );
}
