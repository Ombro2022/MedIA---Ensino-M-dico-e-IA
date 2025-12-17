import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  PlayCircle,
  Upload,
  FileText,
  Image,
  Headphones,
  Link,
  MessageSquare,
  Send,
  Paperclip,
  ShieldCheck,
  MoreVertical,
  Trash2
} from 'lucide-react';

interface StudentPortalProps {
  onBack: () => void;
  onAccessSimulator?: () => void;
}

interface PortalVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  url: string;
  tags: string[];
}

interface PortalMaterial {
  name: string;
  type: string;
  size: string;
  category: 'PDF' | 'Imagem' | 'Áudio' | 'Texto' | 'Outro';
  uploadedAt: string;
}

interface ChatMessage {
  author: string;
  time: string;
  content: string;
  attachments?: string[];
}

const initialVideos: PortalVideo[] = [
  {
    id: '1',
    title: 'Revisão de ECG – Aula 03',
    description: 'Discussão completa sobre ritmos rápidos e como usar a IA para detectar padrões ocultos.',
    duration: '32 min',
    url: 'https://player.vimeo.com/video/76979871?h=8272103f6e',
    tags: ['ECG', 'IA', 'Ritmos']
  },
  {
    id: '2',
    title: 'Gasometria Aplicada na UTI',
    description: 'Casos reais integrando ventilação mecânica + gaso + suporte hemodinâmico.',
    duration: '28 min',
    url: 'https://player.vimeo.com/video/357274789?h=918a824971',
    tags: ['Gasometria', 'VM', 'Casos Clínicos']
  }
];

const initialMaterials: PortalMaterial[] = [
  {
    name: 'Mapa mental – Distúrbios Ácido-Básicos.pdf',
    type: 'PDF',
    size: '2.3 MB',
    category: 'PDF',
    uploadedAt: 'Atualizado em 02/12'
  },
  {
    name: 'Checklist de ECG para plantões.docx',
    type: 'DOCX',
    size: '640 KB',
    category: 'Texto',
    uploadedAt: 'Atualizado em 30/11'
  },
  {
    name: 'Fluxograma de choque.pdf',
    type: 'PDF',
    size: '1.1 MB',
    category: 'PDF',
    uploadedAt: 'Atualizado em 27/11'
  }
];

const initialChat: ChatMessage[] = [
  {
    author: 'Equipe MedIA',
    time: 'Hoje • 08:10',
    content: 'Bom dia, turma! Já liberamos o vídeo com o desafio de Gasometria da semana. Confiram na Sala Virtual.'
  },
  {
    author: 'Marina S.',
    time: 'Ontem • 21:45',
    content: 'Alguém conseguiu usar o prompt para gerar casos de FA com resposta rápida? Quero comparar outputs.',
    attachments: ['prompt_fibrilacao.txt']
  }
];

export const StudentPortal: React.FC<StudentPortalProps> = ({ onBack, onAccessSimulator }) => {
  const [videos, setVideos] = useState(initialVideos);
  const [materials, setMaterials] = useState(initialMaterials);
  const [newVideo, setNewVideo] = useState({ title: '', url: '', description: '' });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const [chatMessages, setChatMessages] = useState(initialChat);
  const [chatInput, setChatInput] = useState('');
  const [chatFiles, setChatFiles] = useState<File[]>([]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[aria-label="Opções do vídeo"]') && !target.closest('.absolute')) {
        setDeleteConfirm(null);
      }
    };

    if (deleteConfirm) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [deleteConfirm]);

  const handleAddVideo = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newVideo.title || !newVideo.url) return;

    setVideos((prev) => [
      {
        id: Date.now().toString(),
        title: newVideo.title,
        url: newVideo.url,
        description: newVideo.description || 'Vídeo adicionado pela coordenação.',
        duration: 'Novo',
        tags: ['upload']
      },
      ...prev
    ]);

    setNewVideo({ title: '', url: '', description: '' });
  };

  const handleDeleteVideo = (videoId: string) => {
    // Remove video from state (soft delete - just hiding from UI)
    setVideos((prev) => prev.filter(v => v.id !== videoId));
    setDeleteConfirm(null);
    
    // Show success feedback
    setDeleteSuccess(true);
    setTimeout(() => setDeleteSuccess(false), 3000);
  };

  const handleMaterialUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const filesArray = Array.from(event.target.files).map((file) => ({
      name: file.name,
      type: file.type || 'arquivo',
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      category: file.type.includes('pdf')
        ? 'PDF'
        : file.type.startsWith('image/')
        ? 'Imagem'
        : file.type.startsWith('audio/')
        ? 'Áudio'
        : 'Outro',
      uploadedAt: 'Agora'
    }));

    setMaterials((prev) => [...filesArray, ...prev]);
    event.target.value = '';
  };

  const handleChatFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setChatFiles(Array.from(event.target.files));
  };

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (!chatInput.trim() && chatFiles.length === 0) {
      return;
    }

    setChatMessages((prev) => [
      ...prev,
      {
        author: 'Você',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        content: chatInput,
        attachments: chatFiles.map((file) => file.name)
      }
    ]);

    setChatInput('');
    setChatFiles([]);
  };

  return (
    <section className="bg-slate-950 min-h-screen text-white">
      <div className="container mx-auto px-6 py-16">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o site
        </button>

        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#111724] border border-white/5 p-10 shadow-[0_0_60px_rgba(13,16,45,0.45)]">
          <div className="flex flex-col lg:flex-row items-start gap-8 mb-12">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-mediaGreen">
                Área do Aluno
                <ShieldCheck className="w-4 h-4" />
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-6 leading-tight">
                Sala integrada com vídeos, materiais e chat para acelerar sua curva de aprendizado.
              </h1>
              <p className="text-slate-300 text-lg max-w-3xl">
                Todos os conteúdos abaixo são exclusivos para alunos cadastrados e podem ser atualizados diariamente pela coordenação.
                Utilize essa central para absorver os temas, consumir os reforços rápidos e colaborar com o grupo.
              </p>
            </div>
            <div className="w-full lg:w-auto flex flex-col gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-2">Status de acesso</p>
                <p className="text-2xl font-bold text-white">Liberado</p>
                <p className="text-xs text-slate-400">Última verificação automática há 5 min</p>
              </div>
              {onAccessSimulator && (
                <button
                  onClick={onAccessSimulator}
                  className="bg-gradient-to-r from-mediaPink to-red-500 text-white font-bold py-4 px-6 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  Simulador Clínico
                </button>
              )}
            </div>
          </div>

          {/* Virtual Classroom */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Sala de aula virtual</p>
                  <h2 className="text-2xl font-bold text-white">Vídeos disponíveis</h2>
                </div>
                <PlayCircle className="w-10 h-10 text-mediaPink" />
              </div>

              {deleteSuccess && (
                <div className="mb-6 rounded-2xl border border-green-500/30 bg-green-900/20 px-4 py-3 text-sm text-green-200">
                  ✅ Vídeo removido da sala virtual.
                </div>
              )}

              <div className="space-y-6">
                {videos.map((video) => (
                  <div key={video.id} className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 relative">
                    <div className="w-full md:w-1/3 bg-black/40 rounded-xl overflow-hidden">
                      <iframe
                        src={video.url}
                        title={video.title}
                        className="w-full h-48"
                        allow="autoplay; fullscreen"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h3 className="text-white font-semibold text-lg">{video.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">{video.duration}</span>
                          <div className="relative">
                            <button
                              onClick={() => setDeleteConfirm(deleteConfirm === video.id ? null : video.id)}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              aria-label="Opções do vídeo"
                            >
                              <MoreVertical className="w-4 h-4 text-slate-400" />
                            </button>
                            {deleteConfirm === video.id && (
                              <div className="absolute right-0 top-full mt-1 bg-slate-800 border border-white/10 rounded-xl shadow-xl z-10 min-w-[200px]">
                                <button
                                  onClick={() => handleDeleteVideo(video.id)}
                                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-300 hover:bg-red-900/20 rounded-xl transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Excluir vídeo
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm mt-2 mb-4">{video.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {video.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddVideo} className="mt-6 bg-slate-900/60 border border-white/5 rounded-2xl p-5">
                <p className="text-sm font-semibold text-slate-200 mb-4">Subir novo vídeo (cole a URL do Vimeo/YouTube interno)</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Título do vídeo"
                    className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mediaPink"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  />
                  <input
                    type="url"
                    placeholder="URL do player"
                    className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mediaPink"
                    value={newVideo.url}
                    onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                  />
                </div>
                <textarea
                  placeholder="Descrição rápida"
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mediaPink mt-4"
                  rows={2}
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                />
                <button
                  type="submit"
                  className="mt-4 inline-flex items-center gap-2 px-5 py-3 bg-mediaPink text-white rounded-full text-sm font-bold hover:opacity-90"
                >
                  <Upload className="w-4 h-4" />
                  Adicionar vídeo
                </button>
              </form>
            </div>

            {/* Materials Hub */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Material de apoio</p>
                  <h2 className="text-2xl font-bold text-white">Biblioteca inteligente</h2>
                </div>
                <FileText className="w-8 h-8 text-mediaGreen" />
              </div>

              <label className="flex flex-col items-center justify-center gap-3 border border-dashed border-white/20 rounded-2xl py-10 text-center cursor-pointer hover:border-mediaGreen/50 transition-colors">
                <Upload className="w-10 h-10 text-slate-400" />
                <p className="text-sm text-slate-300">
                  Arraste arquivos ou clique para enviar (PDF, imagens, áudios, docs...)
                </p>
                <input multiple type="file" className="hidden" onChange={handleMaterialUpload} />
              </label>

              <div className="mt-6 space-y-4 overflow-y-auto max-h-[380px] pr-2">
                {materials.map((material, idx) => (
                  <div key={`${material.name}-${idx}`} className="flex items-start gap-3 border border-white/10 rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-mediaGreen">
                      {material.category === 'PDF' && <FileText className="w-5 h-5" />}
                      {material.category === 'Imagem' && <Image className="w-5 h-5" />}
                      {material.category === 'Áudio' && <Headphones className="w-5 h-5" />}
                      {material.category === 'Texto' && <Link className="w-5 h-5" />}
                      {material.category === 'Outro' && <Upload className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{material.name}</p>
                      <p className="text-xs text-slate-400">{material.type} • {material.size}</p>
                      <p className="text-xs text-slate-500 mt-1">{material.uploadedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Chat colaborativo</p>
                  <h2 className="text-2xl font-bold text-white">Discussões em tempo real</h2>
                </div>
                <MessageSquare className="w-8 h-8 text-mediaBlue" />
              </div>

              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
                {chatMessages.map((message, idx) => (
                  <div key={`${message.author}-${idx}`} className="bg-black/30 border border-white/5 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-white">{message.author}</p>
                      <span className="text-xs text-slate-500">{message.time}</span>
                    </div>
                    <p className="text-sm text-slate-200">{message.content}</p>
                    {message.attachments && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.attachments.map((file) => (
                          <span key={file} className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-slate-300">
                            <Paperclip className="w-3 h-3 inline mr-1" />
                            {file}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="mt-6 border border-white/10 rounded-2xl p-4 bg-slate-900/40">
                <textarea
                  rows={3}
                  className="w-full bg-transparent border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-mediaBlue"
                  placeholder="Compartilhe insights, dúvidas ou combine estudos..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                    <Paperclip className="w-4 h-4" />
                    Adicionar anexos
                    <input type="file" multiple className="hidden" onChange={handleChatFile} />
                  </label>
                  {chatFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                      {chatFiles.map((file) => (
                        <span key={file.name} className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                          {file.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-mediaBlue rounded-full text-white text-sm font-bold hover:opacity-90"
                  >
                    <Send className="w-4 h-4" />
                    Enviar mensagem
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4">Regras rápidas</h3>
              <ul className="text-sm text-slate-300 space-y-3">
                <li>• Use o chat para dúvidas da aula, networking e alertas importantes.</li>
                <li>• Mencione @Prof ou @Equipe quando precisar de ajuda personalizada.</li>
                <li>• Arquivos sensíveis devem ser compartilhados com cuidado (HIPAA/LGPD).</li>
                <li>• Combine grupos privados diretamente pelo chat ou WhatsApp oficial.</li>
              </ul>
              <p className="text-xs text-slate-500 mt-6">
                Em breve: integração com notificações push e streaming ao vivo direto da plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
