import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { ChatMessage, ChatRole, SendingStatus } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const AICompanion: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: ChatRole.MODEL, text: "嗨！我是厚厚小幫手。不論是關於「正向教養」的困惑，還是想找點「粉彩創作」的靈感，我都在這裡陪你聊聊。" }
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<SendingStatus>(SendingStatus.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || status === SendingStatus.SENDING) return;

    const userMsg: ChatMessage = { role: ChatRole.USER, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStatus(SendingStatus.SENDING);

    try {
      const responseText = await sendMessageToGemini(input, messages);
      setMessages(prev => [...prev, { role: ChatRole.MODEL, text: responseText }]);
      setStatus(SendingStatus.IDLE);
    } catch (error) {
      setMessages(prev => [...prev, { role: ChatRole.MODEL, text: "抱歉，我現在有點連線不穩，請稍後再試試。" }]);
      setStatus(SendingStatus.ERROR);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="ai-companion" className="py-24 bg-rose-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-4">
            <Sparkles className="text-rose-400 mr-2" />
            <span className="text-rose-800 font-medium tracking-wide">AI 智慧陪伴</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">厚厚小幫手</h2>
          <p className="text-stone-600">結合 Iris 的教養智慧與小霞的美學靈感，隨時為您解答。</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-rose-100 overflow-hidden h-[600px] flex flex-col">
          {/* Chat Window */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-rose-50/50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-5 py-3 leading-relaxed text-sm md:text-base ${
                    msg.role === ChatRole.USER 
                      ? 'bg-rose-700 text-white rounded-br-none shadow-md' 
                      : 'bg-white text-stone-700 border border-rose-100 shadow-sm rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {status === SendingStatus.SENDING && (
               <div className="flex justify-start">
                 <div className="bg-white text-stone-500 border border-rose-100 shadow-sm rounded-2xl rounded-bl-none px-5 py-3 flex items-center">
                    <Loader2 className="animate-spin h-4 w-4 mr-2 text-rose-400" />
                    <span className="text-sm">思考中...</span>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-rose-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="請問問我們關於育兒或手作的問題..."
                className="flex-1 border border-rose-200 bg-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all placeholder:text-stone-300"
                disabled={status === SendingStatus.SENDING}
              />
              <button 
                onClick={handleSend}
                disabled={status === SendingStatus.SENDING || !input.trim()}
                className="bg-rose-800 text-white p-3 rounded-full hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-stone-400 text-center mt-2">
              小幫手可能會產生不準確的資訊，請以專業諮詢為準。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICompanion;