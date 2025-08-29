import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MessageSquare, Send, X, RefreshCw, Settings } from 'lucide-react';
import { processWithVertexAI, isValidAPIKey } from '../utils/vertexAI';

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState({
    userName: '',
    topicsDiscussed: [],
    mood: 'neutral',
    lastQuestion: '',
    conversationStarted: false,
    usesSlang: false,
    slangLevel: 0 // 0-10 scale, higher means more slang
  });
  const [useVertexAI, setUseVertexAI] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [apiError, setApiError] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // Menambahkan pesan sambutan saat chat pertama kali dibuka
    if (open && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: "Halo! Saya AnggraBot, asisten AI lokal Anda. Apa yang bisa saya bantu hari ini?"
        }
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem('chatSettings');
    if (savedSettings) {
      const { useVertexAI: savedUseVertexAI, apiKey: savedApiKey } = JSON.parse(savedSettings);
      setUseVertexAI(savedUseVertexAI);
      setApiKey(savedApiKey);
    }
  }, []);

  const toggleChat = () => setOpen(!open);

  const resetChat = () => {
    setMessages([]);
    setContext({
      userName: '',
      topicsDiscussed: [],
      mood: 'neutral',
      lastQuestion: '',
      conversationStarted: false,
      usesSlang: false,
      slangLevel: 0
    });
    setTimeout(() => {
      setMessages([
        {
          role: 'assistant',
          content: "Percakapan telah direset. Ada yang bisa saya bantu?"
        }
      ]);
    }, 300);
  };

  const detectSlang = (message) => {
    const slangWords = [
      'gue', 'lu', 'elo', 'gw', 'loe', 'ngga', 'nggak', 'gak', 'ga', 'kaga',
      'deh', 'dong', 'sih', 'lah', 'nih', 'tuh', 'neh', 'teh', 'mah', 'coy',
      'cuy', 'bro', 'sis', 'gan', 'bre', 'brader', 'sob', 'bestie', 'besti',
      'yg', 'dgn', 'bnr', 'jg', 'trs', 'tp', 'krn', 'dr', 'sm', 'aja', 'aj',
      'udh', 'udah', 'blm', 'belom', 'skrg', 'bgt', 'banget', 'gitu', 'gini',
      'wkwk', 'haha', 'wk', 'xixi', 'hehe', 'woy', 'woi', 'btw', 'omg', 'lol',
      'lmao', 'ngakak', 'asap', 'asik', 'mantap', 'mantul', 'mantep', 'anjay',
      'santuy', 'gas', 'gass', 'skuy', 'hayuk', 'otw', 'goks', 'sabi', 'sabeb',
      'anjir', 'anjrit', 'anying', 'baper', 'gercep', 'kepo', 'cakeep', 'kece',
      'lebay', 'gokil', 'bete', 'epribadih', 'cupu', 'beud', 'bucin', 'cidaha',
      'garing', 'jones', 'jombs'
    ];

    const slangPatterns = [
      /g[au]e/i,
      /(e)?l[ou](e)?/i,
      /nga?k/i,
      /y[au]da(h)?l[ao]h/i,
      /ga?k? (usah|perlu)/i,
      /skip (aja|aj)/i,
      /santai (aja|aj)/i,
      /(jan|jgn) (dulu|dl)/i,
      /males (bgt|banget)/i,
      /sumpah (deh|dah)/i,
      /^(wk)+$/i,
      /^(ha)+$/i,
      /^(he)+$/i,
      /^(xi)+$/i,
      /makasih (ya|yak)/i,
      /thx (ya|yak)/i,
      /mangat/i,
      /gasken/i,
      /mager/i,
      /sebel/i,
      /jutek/i,
      /bodo amat/i,
      /yo?i/i,
      /iye?/i,
      /sip/i,
      /cape(k|d) (deh|bgt)/i,
      /pen(gen|gin)/i
    ];

    const words = message.toLowerCase().split(/\s+/);
    let slangCount = 0;

    words.forEach(word => {
      if (slangWords.includes(word.replace(/[.,!?;:]/g, ''))) {
        slangCount++;
      }
    });

    slangPatterns.forEach(pattern => {
      if (pattern.test(message.toLowerCase())) {
        slangCount++;
      }
    });

    const totalWords = words.length;
    const slangLevel = Math.min(10, Math.ceil((slangCount / totalWords) * 10));

    return {
      usesSlang: slangCount > 0,
      slangLevel: slangCount > 0 ? Math.max(1, slangLevel) : 0
    };
  };

  const analyzeMessage = (message) => {
    const lowerMsg = message.toLowerCase();

    const topics = {
      greeting: /hai|halo|hello|hi|pagi|siang|malam|selamat/i.test(lowerMsg),
      introduction: /nama kamu|siapa kamu|kamu siapa|perkenalkan/i.test(lowerMsg),
      thanks: /makasih|terima kasih|thank|thanks|thx/i.test(lowerMsg),
      time: /jam|waktu sekarang|pukul/i.test(lowerMsg),
      date: /tanggal|hari ini|hari apa|kapan/i.test(lowerMsg),
      weather: /cuaca|hujan|panas|mendung|cerah/i.test(lowerMsg),
      help: /bantuan|help|tolong|menu|bisa apa/i.test(lowerMsg),
      farewell: /sampai jumpa|bye|dadah|selamat tinggal/i.test(lowerMsg),
      math: /hitung|kali|bagi|tambah|kurang|pangkat|akar|sin|cos|\+|\-|\*|\/|\^|sqrt/i.test(lowerMsg),
      joke: /lucu|joke|candaan|humor|lawak/i.test(lowerMsg),
      personal: /hobby|hobi|suka|tidak suka|favorite|kesukaan/i.test(lowerMsg),
      about: /tentang kamu|apa itu|jelaskan|bisa apa|fungsi|tujuan/i.test(lowerMsg),
      mood: /sedih|senang|marah|kesal|bahagia|semangat|mood/i.test(lowerMsg)
    };

    if (!context.userName && /nama (saya|aku|gue) ([A-Za-z]+)/i.test(lowerMsg)) {
      const match = lowerMsg.match(/nama (saya|aku|gue) ([A-Za-z]+)/i);
      if (match && match[2]) {
        setContext({ ...context, userName: match[2].charAt(0).toUpperCase() + match[2].slice(1) });
      }
    }

    const slangInfo = detectSlang(message);
    setContext(prev => ({
      ...prev,
      usesSlang: slangInfo.usesSlang,
      slangLevel: slangInfo.usesSlang ? Math.max(prev.slangLevel, slangInfo.slangLevel) : prev.slangLevel
    }));

    const detectedTopics = Object.keys(topics).filter(key => topics[key]);
    if (detectedTopics.length > 0) {
      setContext(prev => ({
        ...prev,
        topicsDiscussed: [...new Set([...prev.topicsDiscussed, ...detectedTopics])],
        lastQuestion: message,
        conversationStarted: true
      }));
    }

    return detectedTopics;
  };

  const calculateMath = (expression) => {
    const sanitized = expression.replace(/[^0-9+\-*/().^ ]/g, '');

    try {
      return new Function(`return ${sanitized}`)();
    } catch (error) {
      return "Maaf, saya tidak bisa menghitung ekspresi tersebut.";
    }
  };

  const getJoke = () => {
    const jokes = [
      "Kenapa bayam tidak pernah diajak ke pesta? Karena dia selalu membuat suasana jadi hambar!",
      "Tahu kenapa buku matematika sedih? Karena terlalu banyak masalah!",
      "Komputer saya bernyanyi kemarin. Dia jadi penyanyi panel.",
      "Ada tiga jenis orang di dunia: mereka yang bisa menghitung dan mereka yang tidak bisa.",
      "Kenapa programmer tidak bisa membedakan Halloween dengan Christmas? Karena Oct 31 = Dec 25!"
    ];

    const slangJokes = [
      "Tau ga kenapa kucing gak pernah nonton YouTube? Soalnya males baca iklan 'skip ad'! 😹",
      "Anak IT kalau pacaran beda banget, gak bilang 'I love you' tapi bilang 'Error 143: I miss you' wkwk",
      "Masa gue nge-chat gebetan: 'Hai, lagi apa?' Dia jawab: 'Lagi render project, ntar gue chat balik ya'. Sampe sekarang gak dibales, masih render kali ya 🤣",
      "Lu tau gak beda programmer sama tukang bohong? Kalo programmer bilang: 'Bentar doang, 5 menit kelar' dia beneran bohong.",
      "Kenapa keyboard PC gak pernah stress? Karena dia bisa 'escape' kapan aja wkwkwk",
      "Yang jomblo mah beda, pas Valentine Day cuma bisa update status: 'Error 404: Date not found' 😂"
    ];

    return context.usesSlang ?
      slangJokes[Math.floor(Math.random() * slangJokes.length)] :
      jokes[Math.floor(Math.random() * jokes.length)];
  };

  const toSlang = (message, slangLevel) => {
    if (!context.usesSlang) return message;

    if (message.includes("Hasil perhitungan dari") || message.length < 10) {
      return message;
    }

    let slangVersion = message;

    if (slangLevel <= 3) {
      slangVersion = slangVersion
        .replace(/tidak/g, "nggak")
        .replace(/saya/g, "aku")
        .replace(/apakah/g, "apa")
        .replace(/mengapa/g, "kenapa")
        .replace(/seperti/g, "kayak")
        .replace(/karena/g, "soalnya")
        .replace(/adalah/g, "tuh")
        .replace(/sangat/g, "banget")
        .replace(/tolong/g, "bisa")
        .replace(/harus/g, "mesti");

      if (Math.random() > 0.5) {
        slangVersion = slangVersion.replace(/\.(\s|$)/g, " sih.$1");
      }
    }
    else if (slangLevel <= 7) {
      slangVersion = slangVersion
        .replace(/tidak/g, "gak")
        .replace(/saya/g, "gue")
        .replace(/anda/g, "kamu")
        .replace(/kamu/g, "lu")
        .replace(/apakah/g, "apa")
        .replace(/mengapa/g, "kenapa")
        .replace(/seperti/g, "kayak")
        .replace(/karena/g, "soalnya")
        .replace(/adalah/g, "tuh")
        .replace(/sangat/g, "banget")
        .replace(/tolong/g, "bisa")
        .replace(/harus/g, "kudu")
        .replace(/sedang/g, "lagi")
        .replace(/dengan/g, "sama")
        .replace(/juga/g, "juga sih")
        .replace(/sekali/g, "banget")
        .replace(/baik/g, "oke")
        .replace(/buruk/g, "parah")
        .replace(/mungkin/g, "kayaknya")
        .replace(/sekarang/g, "skrg")
        .replace(/terima kasih/g, "makasih")
        .replace(/mohon/g, "please")
        .replace(/bagaimana/g, "gimana");

      if (Math.random() > 0.5) {
        slangVersion = slangVersion.replace(/\.(\s|$)/g, " deh.$1");
      } else {
        slangVersion = slangVersion.replace(/\.(\s|$)/g, " sih.$1");
      }

      if (Math.random() > 0.7) {
        slangVersion = "Nih, " + slangVersion.charAt(0).toLowerCase() + slangVersion.slice(1);
      }
    }
    else {
      slangVersion = slangVersion
        .replace(/tidak/g, "gak")
        .replace(/saya/g, "gw")
        .replace(/anda/g, "elo")
        .replace(/kamu/g, "lo")
        .replace(/apakah/g, "apa")
        .replace(/mengapa/g, "knp")
        .replace(/seperti/g, "kyk")
        .replace(/karena/g, "krn")
        .replace(/adalah/g, "tuh")
        .replace(/sangat/g, "bgt")
        .replace(/tolong/g, "plz")
        .replace(/harus/g, "kudu")
        .replace(/sedang/g, "lg")
        .replace(/dengan/g, "sm")
        .replace(/juga/g, "jg")
        .replace(/sekali/g, "bgt")
        .replace(/baik/g, "oke")
        .replace(/buruk/g, "parah")
        .replace(/mungkin/g, "kyknya")
        .replace(/sekarang/g, "skrg")
        .replace(/terima kasih/g, "thx")
        .replace(/mohon/g, "pls")
        .replace(/bagaimana/g, "gmn")
        .replace(/untuk/g, "buat")
        .replace(/akan/g, "bakal")
        .replace(/telah/g, "udah")
        .replace(/sudah/g, "udh")
        .replace(/belum/g, "blm")
        .replace(/tapi/g, "tp")
        .replace(/bisa/g, "bs")
        .replace(/masih/g, "msh")
        .replace(/tetapi/g, "tp")
        .replace(/terus/g, "trs")
        .replace(/hanya/g, "cuma")
        .replace(/semua/g, "smua")
        .replace(/selalu/g, "slalu")
        .replace(/yang/g, "yg")
        .replace(/tanggal/g, "tgl");

      const reactions = ["wkwk", "hehe", ":)", "sabi", "goks"];

      if (Math.random() > 0.6) {
        slangVersion += " " + reactions[Math.floor(Math.random() * reactions.length)];
      }

      const particles = ["sih", "dong", "deh", "lah", "nih"];
      const randomParticle = particles[Math.floor(Math.random() * particles.length)];

      slangVersion = slangVersion.replace(/\.(\s|$)/g, " " + randomParticle + ".$1");

      if (Math.random() > 0.7) {
        const starters = ["eh", "btw", "woy", "bro", "guys"];
        const randomStarter = starters[Math.floor(Math.random() * starters.length)];
        slangVersion = randomStarter + ", " + slangVersion.charAt(0).toLowerCase() + slangVersion.slice(1);
      }
    }

    return slangVersion;
  };

  const generateSmartResponse = (message, detectedTopics) => {
    let response;

    if (detectedTopics.length === 0) {
      if (/[0-9][+\-*/]/.test(message)) {
        try {
          const result = calculateMath(message);
          if (typeof result === 'number') {
            return `Hasil perhitungan dari ${message} adalah ${result}`;
          }
        } catch (e) {}
      }

      if (context.lastQuestion && message.length < 15) {
        response = `Maaf, saya tidak mengerti. Apakah pertanyaan Anda masih terkait dengan "${context.lastQuestion}"? Bisa lebih jelaskan?`;
      } else {
        const defaultResponses = [
          context.userName ? `${context.userName}, saya tidak yakin maksud pertanyaan Anda. Bisa dijelaskan dengan cara lain?` : "Maaf, saya tidak mengerti pertanyaan Anda. Bisa dijelaskan dengan cara lain?",
          "Hmm, saya masih belajar. Bisa bertanya dengan cara yang berbeda?",
          "Saya adalah AI sederhana dan memiliki keterbatasan. Ada hal lain yang ingin ditanyakan?",
          "Pertanyaan menarik! Sayangnya saya memiliki pengetahuan terbatas dan tidak bisa menjawabnya saat ini.",
          "Bisa dikatakan dengan kata-kata yang lebih sederhana? Saya masih berusaha memahami maksud Anda."
        ];
        response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
      }

      return context.usesSlang ? toSlang(response, context.slangLevel) : response;
    }

    if (detectedTopics.includes('greeting')) {
      if (!context.conversationStarted) {
        response = context.userName ?
          `Halo ${context.userName}! Senang bertemu dengan Anda lagi. Ada yang bisa saya bantu hari ini?` :
          "Halo! Apa kabar? Ada yang bisa saya bantu hari ini?";
      } else {
        response = context.userName ? `Hai lagi, ${context.userName}!` : "Hai lagi!";
      }
    }
    else if (detectedTopics.includes('introduction')) {
      if (message.toLowerCase().includes('nama kamu')) {
        response = "Saya AnggraBot, asisten AI sederhana yang berjalan secara lokal di perangkat Anda. Saya dibuat untuk membantu menjawab pertanyaan dan melakukan percakapan ringan.";
      } else {
        response = "Saya adalah AnggraBot, asisten virtual sederhana. Saya bekerja dengan sistem berbasis aturan untuk merespons pesan Anda. Tidak seperti ChatGPT atau Claude, saya berjalan sepenuhnya di browser Anda tanpa perlu API eksternal.";
      }
    }
    else if (detectedTopics.includes('math')) {
      try {
        const mathExpression = message.replace(/[^0-9+\-*/().^ ]/g, '').trim();
        if (mathExpression) {
          const result = calculateMath(mathExpression);
          if (typeof result === 'number') {
            response = `Hasil perhitungan dari ${mathExpression} adalah ${result}`;
          } else {
            response = "Sepertinya Anda menanyakan perhitungan matematika, tetapi saya tidak dapat mengidentifikasi ekspresinya dengan jelas. Mohon tuliskan perhitungan dengan format yang lebih sederhana.";
          }
        } else {
          response = "Sepertinya Anda menanyakan perhitungan matematika, tetapi saya tidak dapat mengidentifikasi ekspresinya dengan jelas. Mohon tuliskan perhitungan dengan format yang lebih sederhana.";
        }
      } catch (e) {
        response = "Saya tidak bisa menyelesaikan perhitungan tersebut. Pastikan format perhitungannya benar.";
      }
    }
    else if (detectedTopics.includes('thanks')) {
      response = context.userName ?
        `Sama-sama, ${context.userName}! Senang bisa membantu Anda.` :
        "Sama-sama! Senang bisa membantu.";
    }
    else if (detectedTopics.includes('time')) {
      const now = new Date();
      const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      response = `Waktu sekarang adalah ${now.toLocaleTimeString('id-ID', timeOptions)}`;
    }
    else if (detectedTopics.includes('date')) {
      const now = new Date();
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      response = `Hari ini adalah ${now.toLocaleDateString('id-ID', dateOptions)}`;
    }
    else if (detectedTopics.includes('weather')) {
      response = "Maaf, saya tidak memiliki akses ke data cuaca real-time. Sebagai asisten lokal, saya tidak terhubung ke internet untuk mengambil informasi tersebut.";
    }
    else if (detectedTopics.includes('joke')) {
      response = getJoke();
    }
    else if (detectedTopics.includes('help')) {
      response = `Saya dapat membantu dengan beberapa hal berikut:
1. Menjawab pertanyaan waktu dan tanggal
2. Melakukan perhitungan matematika sederhana
3. Memberikan candaan ringan
4. Merespons sapaan dan obrolan ringan
5. Menjawab pertanyaan tentang diri saya

Saya masih sederhana, tapi saya berusaha memberikan jawaban terbaik yang saya bisa!`;
    }
    else if (detectedTopics.includes('farewell')) {
      response = context.userName ?
        `Sampai jumpa lagi, ${context.userName}! Senang bisa berbincang dengan Anda.` :
        "Sampai jumpa lagi! Jika butuh bantuan, silakan kembali kapan saja.";
    }
    else if (detectedTopics.includes('personal')) {
      const personalResponses = [
        "Sebagai asisten virtual, saya suka membantu orang menyelesaikan masalah mereka. Itu membuat saya merasa berguna!",
        "Saya menikmati percakapan menarik seperti yang kita lakukan sekarang.",
        "Jika saya punya hobi, mungkin itu adalah belajar hal baru dari setiap orang yang berbicara dengan saya.",
        "Saya suka membaca kode sumber dan menjalankannya dengan efisien. Saya dibuat untuk responsif dan ringan."
      ];
      response = personalResponses[Math.floor(Math.random() * personalResponses.length)];
    }
    else if (detectedTopics.includes('about')) {
      response = "Saya adalah AnggraBot, asisten AI sederhana yang berjalan sepenuhnya di browser Anda. Saya menggunakan pattern matching dan rule-based system untuk memberikan respons yang relevan. Tidak seperti asisten AI lain yang memerlukan API, saya bekerja secara lokal tanpa biaya tambahan.";
    }
    else {
      response = "Hmm, saya mengerti topik yang Anda bicarakan, tapi saya tidak memiliki informasi lengkap tentang hal tersebut.";
    }

    return context.usesSlang ? toSlang(response, context.slangLevel) : response;
  };

  const saveSettings = () => {
    // Validate API key if using Vertex AI
    if (useVertexAI && !isValidAPIKey(apiKey)) {
      setApiError('API key format tidak valid');
      return;
    }
    
    setApiError('');
    setShowSettings(false);
    
    // Save settings to localStorage
    localStorage.setItem('chatSettings', JSON.stringify({
      useVertexAI,
      apiKey
    }));
    
    // Reset chat after changing settings
    resetChat();
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    if (useVertexAI && apiKey) {
      try {
        // Add user's message to conversation history
        const updatedMessages = [...messages, userMessage];
        
        // Process with Vertex AI
        const response = await processWithVertexAI(updatedMessages, apiKey);
        
        const botResponse = {
          role: 'assistant',
          content: response.content
        };
        
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        // If API fails, fall back to rule-based system
        const detectedTopics = analyzeMessage(input);
        const botResponse = {
          role: 'assistant',
          content: `Error: ${error.message}. Falling back to local processing: ${generateSmartResponse(input, detectedTopics)}`
        };
        setMessages(prev => [...prev, botResponse]);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Use existing rule-based system
      const detectedTopics = analyzeMessage(input);
      const thinkingTime = detectedTopics.length > 0 ? 700 : 1200;

      setTimeout(() => {
        const botResponse = {
          role: 'assistant',
          content: generateSmartResponse(input, detectedTopics)
        };
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
      }, thinkingTime);
    }
  };

  const chatContent = (
    <div className="fixed isolate bottom-6 right-6" style={{ 
      zIndex: 99999,
      isolation: 'isolate',
      transform: 'translateZ(0)'
    }}>
      {open ? (
        <div className="w-80 bg-zinc-900 text-white rounded-lg shadow-lg flex flex-col overflow-hidden relative">
          <div className="flex justify-between items-center bg-purple-600 px-4 py-2">
            <span className="font-semibold">
              {useVertexAI ? 'Vertex AI' : 'AnggraBot AI'}
            </span>
            <div className="flex space-x-2">
              <button onClick={() => setShowSettings(true)} className="hover:bg-purple-700 p-1 rounded" title="Settings">
                <Settings size={16} />
              </button>
              <button onClick={resetChat} className="hover:bg-purple-700 p-1 rounded" title="Reset Chat">
                <RefreshCw size={16} />
              </button>
              <button onClick={toggleChat} className="hover:bg-purple-700 p-1 rounded" title="Close">
                <X size={18} />
              </button>
            </div>
          </div>
          
          {/* Settings Modal */}
          {showSettings && (
            <div className="absolute inset-0 bg-zinc-900 z-10 p-4 space-y-4">
              <h3 className="text-lg font-bold text-center">Chat Settings</h3>
              
              <div className="space-y-1">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={useVertexAI} 
                    onChange={e => setUseVertexAI(e.target.checked)}
                    className="rounded text-purple-600"
                  />
                  <span>Gunakan Vertex AI (Google AI)</span>
                </label>
              </div>
              
              {useVertexAI && (
                <div className="space-y-1">
                  <label className="block text-sm">Google API Key:</label>
                  <input 
                    type="password"
                    value={apiKey} 
                    onChange={e => setApiKey(e.target.value)}
                    className="w-full bg-zinc-800 px-3 py-2 rounded text-sm"
                    placeholder="AIza..."
                  />
                  {apiError && <p className="text-red-500 text-xs">{apiError}</p>}
                </div>
              )}
              
              <div className="flex justify-end space-x-2 pt-2">
                <button 
                  onClick={() => setShowSettings(false)} 
                  className="px-3 py-1 text-sm border border-zinc-600 rounded"
                >
                  Batal
                </button>
                <button 
                  onClick={saveSettings} 
                  className="px-3 py-1 text-sm bg-purple-600 rounded"
                >
                  Simpan
                </button>
              </div>
            </div>
          )}
          
          <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-72">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`relative max-w-xs px-4 py-2 rounded-2xl shadow-md ${msg.role === 'user'
                    ? 'bg-gradient-to-br from-purple-600 to-purple-800 ml-auto text-white rounded-tr-none'
                    : 'bg-zinc-800 text-gray-200 rounded-tl-none'
                  }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                <span
                  className={`absolute bottom-0 ${msg.role === 'user' ? 'right-0 bg-purple-800' : 'left-0 bg-zinc-700'
                    } rounded-full w-2 h-2`}
                />
              </div>
            ))}
            {isLoading && (
              <div className="bg-zinc-700 text-gray-300 p-2 rounded-md w-fit animate-pulse">
                AI sedang mengetik...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="flex p-2 border-t border-zinc-800">
            <input
              type="text"
              placeholder="Tulis pesan..."
              className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-l-md outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={input.trim() === ''}
              className={`bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:opacity-50 text-white px-3 py-2 rounded-r-md transition-colors ${input.trim() === '' ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
          title="Open Chat"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );

  const portalContainer = document.getElementById('chat-portal');
  return portalContainer ? createPortal(chatContent, portalContainer) : chatContent;
}