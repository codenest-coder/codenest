import { FormEvent, useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { sendMessage, type ChatMessage } from '../../services/chatApi';
import { useLanguage } from '../../contexts/LanguageContext';

const prompts = [
  'What services does Andrei offer?',
  'Tell me about the latest projects.',
  'How can I get in touch?',
];

export default function Chat() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const welcome = language === 'ro'
    ? 'Bună! Sunt asistentul codenest. Întreabă-mă despre Andrei, servicii sau proiecte.'
    : "Hi! I'm the codenest assistant. Ask me about Andrei, his services, or his projects.";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending, error]);

  async function handleSend(text = input) {
    const message = text.trim();
    if (!message || isSending) return;

    const userMessage: ChatMessage = { role: 'user', content: message };
    const history = messages.slice(-12);
    setMessages((current) => [...current, userMessage]);
    setInput('');
    setError('');
    setIsSending(true);

    try {
      const data = await sendMessage(message, history);
      setMessages((current) => [...current, { role: 'assistant', content: data.response }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reach the assistant.');
    } finally {
      setIsSending(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void handleSend();
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 font-[Inter,sans-serif] sm:bottom-6 sm:right-6">
      {isOpen && (
        <section aria-label="codenest assistant" className="mb-4 flex h-[min(620px,calc(100vh-7rem))] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0F1419] shadow-2xl shadow-black/50">
          <header className="flex items-center justify-between border-b border-white/10 bg-[#111A21] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#10B981]/15 text-[#10B981]"><Sparkles className="h-5 w-5" /></div>
              <div><h2 className="text-sm font-semibold text-white">codenest Assistant</h2><p className="text-xs text-[#10B981]">Online</p></div>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat" className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button>
          </header>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4 flex gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#10B981]/15 text-[#10B981]"><Bot className="h-4 w-4" /></div>
              <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 px-3 py-2 text-sm leading-6 text-gray-200">{welcome}</p>
            </div>
            {messages.length === 0 && (
              <div className="ml-9 flex flex-wrap gap-2">{prompts.map((prompt) => <button key={prompt} type="button" onClick={() => void handleSend(prompt)} className="rounded-lg border border-[#10B981]/30 px-2.5 py-1.5 text-left text-xs text-[#6EE7B7] transition hover:bg-[#10B981]/10">{prompt}</button>)}</div>
            )}
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`mb-3 flex ${message.role === 'user' ? 'justify-end' : 'gap-2.5'}`}>
                {message.role === 'assistant' && <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#10B981]/15 text-[#10B981]"><Bot className="h-4 w-4" /></div>}
                <p className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-6 ${message.role === 'user' ? 'rounded-tr-sm bg-[#10B981] text-white' : 'rounded-tl-sm bg-white/5 text-gray-200'}`}>{message.content}</p>
              </div>
            ))}
            {isSending && <div className="flex gap-2.5"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#10B981]/15 text-[#10B981]"><Bot className="h-4 w-4" /></div><div className="rounded-2xl rounded-tl-sm bg-white/5 px-3 py-3"><span className="flex gap-1"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#10B981] [animation-delay:-0.3s]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#10B981] [animation-delay:-0.15s]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#10B981]" /></span></div></div>}
            {error && <p role="alert" className="mt-3 rounded-lg border border-red-400/30 bg-red-500/10 p-2 text-xs text-red-200">{error}</p>}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-white/10 p-3">
            <label className="sr-only" htmlFor="chat-message">Your message</label>
            <input id="chat-message" value={input} onChange={(event) => setInput(event.target.value)} maxLength={1500} disabled={isSending} placeholder={language === 'ro' ? 'Scrie un mesaj...' : 'Ask a question...'} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0A0E17] px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#10B981] disabled:opacity-60" />
            <button type="submit" disabled={isSending || !input.trim()} aria-label="Send message" className="rounded-xl bg-[#10B981] p-2.5 text-white transition hover:bg-[#059669] disabled:cursor-not-allowed disabled:opacity-50"><Send className="h-4 w-4" /></button>
          </form>
        </section>
      )}
      <button type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? 'Close chat' : 'Open chat'} className="ml-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10B981] text-white shadow-lg shadow-[#10B981]/30 transition hover:scale-105 hover:bg-[#059669]">
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
