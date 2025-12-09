import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BarChart2,
  CalendarCheck,
  CalendarClock,
  CheckCircle2,
  Clock4,
  Copy,
  Download,
  FileImage,
  FileText,
  FolderOpen,
  History,
  Instagram,
  Linkedin,
  PenSquare,
  PlusCircle,
  RefreshCcw,
  Save,
  Upload,
  XCircle
} from 'lucide-react';
import { SOCIAL_STORAGE_KEYS } from '../constants';

interface SocialStudioProps {
  onExit: () => void;
}

type SocialPlatform = 'Instagram' | 'LinkedIn';

type SocialPost = {
  id: string;
  platform: SocialPlatform;
  campaign: string;
  tone: string;
  copy: string;
  hashtags: string;
  scheduledAt?: string;
  status: 'draft' | 'scheduled' | 'published';
  assetId?: string;
  assetName?: string;
  createdAt: string;
};

type ArtAsset = {
  id: string;
  name: string;
  platform: SocialPlatform | 'Multi';
  dataUrl: string;
  notes?: string;
  uploadedAt: string;
};

type SocialFormState = {
  platform: SocialPlatform;
  campaign: string;
  tone: string;
  copy: string;
  hashtags: string;
  scheduledDate: string;
  scheduledTime: string;
};

const initialForm: SocialFormState = {
  platform: 'Instagram',
  campaign: '',
  tone: 'Educacional',
  copy: '',
  hashtags: '',
  scheduledDate: '',
  scheduledTime: ''
};

const generateId = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);

const platformIconMap: Record<SocialPlatform, JSX.Element> = {
  Instagram: <Instagram className="w-4 h-4" />, 
  LinkedIn: <Linkedin className="w-4 h-4" />
};

export const SocialStudio: React.FC<SocialStudioProps> = ({ onExit }) => {
  const [form, setForm] = useState<SocialFormState>(initialForm);
  const [posts, setPosts] = useState<SocialPost[]>(() => {
    const raw = localStorage.getItem(SOCIAL_STORAGE_KEYS.posts);
    return raw ? (JSON.parse(raw) as SocialPost[]) : [];
  });
  const [assets, setAssets] = useState<ArtAsset[]>(() => {
    const raw = localStorage.getItem(SOCIAL_STORAGE_KEYS.assets);
    return raw ? (JSON.parse(raw) as ArtAsset[]) : [];
  });
  const [selectedAssetId, setSelectedAssetId] = useState<string>('');
  const [pendingAssetName, setPendingAssetName] = useState('');
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    localStorage.setItem(SOCIAL_STORAGE_KEYS.posts, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(SOCIAL_STORAGE_KEYS.assets, JSON.stringify(assets));
  }, [assets]);

  const stats = useMemo(() => {
    const scheduled = posts.filter((p) => p.status === 'scheduled');
    const published = posts.filter((p) => p.status === 'published');
    const overdue = scheduled.filter((p) => p.scheduledAt && new Date(p.scheduledAt) < new Date());
    const nextDate = scheduled
      .filter((p) => p.scheduledAt && new Date(p.scheduledAt) >= new Date())
      .map((p) => p.scheduledAt!)
      .sort()[0];

    return {
      total: posts.length,
      drafts: posts.filter((p) => p.status === 'draft').length,
      scheduled: scheduled.length,
      published: published.length,
      overdue: overdue.length,
      nextDate
    };
  }, [posts]);

  const handleFormChange = (field: keyof SocialFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreatePost = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.copy.trim()) {
      return;
    }

    const scheduledAt = form.scheduledDate
      ? new Date(`${form.scheduledDate}T${form.scheduledTime || '09:00'}`).toISOString()
      : undefined;

    const newPost: SocialPost = {
      id: generateId(),
      platform: form.platform,
      campaign: form.campaign.trim(),
      tone: form.tone,
      copy: form.copy,
      hashtags: form.hashtags,
      scheduledAt,
      status: scheduledAt ? 'scheduled' : 'draft',
      assetId: selectedAssetId || undefined,
      assetName: pendingAssetName || undefined,
      createdAt: new Date().toISOString()
    };

    setPosts((prev) => [newPost, ...prev]);
    setForm(initialForm);
    setSelectedAssetId('');
    setPendingAssetName('');
  };

  const handleStatusChange = (postId: string, status: SocialPost['status']) => {
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, status } : p)));
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const handleDuplicatePost = (postId: string) => {
    const original = posts.find((p) => p.id === postId);
    if (!original) return;
    const copyPost = { ...original, id: generateId(), status: 'draft', createdAt: new Date().toISOString() };
    setPosts((prev) => [copyPost, ...prev]);
  };

  const handleAssetUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const file = event.target.files[0];
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

    const newAsset: ArtAsset = {
      id: generateId(),
      name: file.name,
      platform: form.platform || 'Instagram',
      dataUrl,
      uploadedAt: new Date().toISOString()
    };

    setAssets((prev) => [newAsset, ...prev]);
    setSelectedAssetId(newAsset.id);
    setPendingAssetName(file.name);
    event.target.value = '';
  };

  const handleExportData = () => {
    const payload = JSON.stringify({ posts, assets }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `media-social-studio-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    setImporting(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (parsed.posts && parsed.assets) {
          setPosts(parsed.posts);
          setAssets(parsed.assets);
        }
      } catch (error) {
        console.error('Falha ao importar dados', error);
      } finally {
        setImporting(false);
      }
    };
    reader.readAsText(file);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text).catch((err) => console.error(err));
  };

  const selectedAsset = assets.find((asset) => asset.id === selectedAssetId);

  const dashboardCards = [
    {
      title: 'Agendados',
      value: stats.scheduled,
      icon: <CalendarClock className="w-5 h-5" />,
      color: 'from-blue-500/20 to-blue-500/5'
    },
    {
      title: 'Publicados',
      value: stats.published,
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: 'from-green-500/20 to-green-500/5'
    },
    {
      title: 'Pendentes',
      value: stats.drafts,
      icon: <PenSquare className="w-5 h-5" />,
      color: 'from-orange-500/20 to-orange-500/5'
    },
    {
      title: 'Atrasados',
      value: stats.overdue,
      icon: <Clock4 className="w-5 h-5" />,
      color: 'from-pink-500/20 to-pink-500/5'
    }
  ];

  return (
    <section className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-10">
          <div>
            <button
              onClick={onExit}
              className="inline-flex items-center gap-2 text-slate-400 text-sm font-semibold mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Encerrar sessão staff
            </button>
            <p className="text-xs uppercase tracking-[0.4em] text-mediaGreen font-bold">Central privada</p>
            <h1 className="text-3xl md:text-5xl font-extrabold mt-3">Social Studio MedIA</h1>
            <p className="text-slate-300 mt-3 max-w-2xl">
              Hub interno para preparar copies, agendar posts, salvar artes e manter o histórico de publicações do Instagram e LinkedIn. Os dados ficam salvos apenas neste computador.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 cursor-pointer hover:border-white/30 text-sm text-slate-200">
              <Upload className="w-4 h-4" />
              Importar dados
              <input type="file" accept="application/json" className="hidden" onChange={handleImportData} />
            </label>
            <button
              onClick={handleExportData}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-mediaPink text-white text-sm font-bold"
            >
              <Download className="w-4 h-4" /> Exportar backup
            </button>
          </div>
        </div>

        {importing && (
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            Importando biblioteca... aguarde.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {dashboardCards.map((card) => (
            <div
              key={card.title}
              className={`rounded-3xl border border-white/10 bg-gradient-to-br ${card.color} p-5 flex flex-col gap-3`}
            >
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>{card.title}</span>
                {card.icon}
              </div>
              <p className="text-3xl font-extrabold">{card.value}</p>
            </div>
          ))}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Próximo disparo</span>
              <CalendarCheck className="w-5 h-5" />
            </div>
            <p className="text-lg font-semibold">
              {stats.nextDate ? new Date(stats.nextDate).toLocaleString('pt-BR') : 'Sem agendamento'}
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <PlusCircle className="w-5 h-5 text-mediaPink" />
              <h2 className="text-xl font-bold">Composer de Post</h2>
            </div>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Plataforma</label>
                  <select
                    value={form.platform}
                    onChange={(e) => handleFormChange('platform', e.target.value as SocialPlatform)}
                    className="w-full mt-1 rounded-2xl bg-black/40 border border-white/10 px-4 py-3"
                  >
                    <option>Instagram</option>
                    <option>LinkedIn</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Campanha</label>
                  <input
                    value={form.campaign}
                    onChange={(e) => handleFormChange('campaign', e.target.value)}
                    placeholder="Ex.: Semana ECG"
                    className="w-full mt-1 rounded-2xl bg-black/40 border border-white/10 px-4 py-3"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Tom & CTA</label>
                <input
                  value={form.tone}
                  onChange={(e) => handleFormChange('tone', e.target.value)}
                  placeholder="Educacional, teaser, chamada para meta..."
                  className="w-full mt-1 rounded-2xl bg-black/40 border border-white/10 px-4 py-3"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Copy</label>
                <textarea
                  value={form.copy}
                  onChange={(e) => handleFormChange('copy', e.target.value)}
                  rows={5}
                  className="w-full mt-1 rounded-2xl bg-black/40 border border-white/10 px-4 py-3"
                  placeholder="Escreva o texto principal do post"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Hashtags</label>
                <textarea
                  value={form.hashtags}
                  onChange={(e) => handleFormChange('hashtags', e.target.value)}
                  rows={2}
                  className="w-full mt-1 rounded-2xl bg-black/40 border border-white/10 px-4 py-3"
                  placeholder="#medicinaai #plantaointeligente"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Data</label>
                  <input
                    type="date"
                    value={form.scheduledDate}
                    onChange={(e) => handleFormChange('scheduledDate', e.target.value)}
                    className="w-full mt-1 rounded-2xl bg-black/40 border border-white/10 px-4 py-3"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Horário</label>
                  <input
                    type="time"
                    value={form.scheduledTime}
                    onChange={(e) => handleFormChange('scheduledTime', e.target.value)}
                    className="w-full mt-1 rounded-2xl bg-black/40 border border-white/10 px-4 py-3"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <label className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-white/10 cursor-pointer text-sm text-slate-300">
                  <FileImage className="w-4 h-4" />
                  Adicionar arte
                  <input type="file" accept="image/*" className="hidden" onChange={handleAssetUpload} />
                </label>
                {pendingAssetName && (
                  <span className="text-xs text-slate-400">Selecionado: {pendingAssetName}</span>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-mediaPink text-white font-bold"
              >
                <Save className="w-4 h-4" />
                Salvar planejamento
              </button>
            </form>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <FolderOpen className="w-5 h-5 text-mediaGreen" />
              <h2 className="text-xl font-bold">Biblioteca de Artes</h2>
            </div>
            <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
              {assets.length === 0 && (
                <p className="text-sm text-slate-400">
                  Ainda sem artes. Faça upload acima para alimentar a biblioteca.
                </p>
              )}
              {assets.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => {
                    setSelectedAssetId(asset.id);
                    setPendingAssetName(asset.name);
                  }}
                  className={`w-full flex items-center gap-3 rounded-2xl border px-3 py-3 text-left ${
                    selectedAssetId === asset.id ? 'border-mediaPink bg-mediaPink/10' : 'border-white/10 bg-white/5'
                  }`}
                >
                  <img
                    src={asset.dataUrl}
                    alt={asset.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{asset.name}</p>
                    <p className="text-xs text-slate-400">
                      {asset.platform} • {new Date(asset.uploadedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            {selectedAsset && (
              <a
                href={selectedAsset.dataUrl}
                download={selectedAsset.name}
                className="mt-4 inline-flex items-center gap-2 text-sm text-mediaPink"
              >
                <Download className="w-4 h-4" /> Baixar arte selecionada
              </a>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-5 h-5 text-mediaBlue" />
              <h2 className="text-xl font-bold">Publicações & Agenda</h2>
            </div>
            <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
              {posts.length === 0 && <p className="text-sm text-slate-400">Nenhum post registrado ainda.</p>}
              {posts.map((post) => (
                <div key={post.id} className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs border border-white/10 ${post.status === 'published' ? 'bg-green-500/10 text-green-300' : post.status === 'scheduled' ? 'bg-blue-500/10 text-blue-300' : 'bg-orange-500/10 text-orange-200'}`}>
                        {post.status}
                      </span>
                      {platformIconMap[post.platform]}
                      <span>{post.platform}</span>
                    </div>
                    {post.scheduledAt ? new Date(post.scheduledAt).toLocaleString('pt-BR') : 'Sem data'}
                  </div>
                  <p className="text-sm text-white whitespace-pre-line">{post.copy}</p>
                  {post.hashtags && (
                    <p className="text-xs text-slate-400">{post.hashtags}</p>
                  )}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <button
                      onClick={() => handleCopyText(`${post.copy}\n\n${post.hashtags}`)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-white/10"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                    <button
                      onClick={() => handleStatusChange(post.id, 'published')}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-green-500/30 text-green-300"
                    >
                      <CheckCircle2 className="w-3 h-3" /> Publicado
                    </button>
                    <button
                      onClick={() => handleDuplicatePost(post.id)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-blue-500/30 text-blue-200"
                    >
                      <RefreshCcw className="w-3 h-3" /> Duplicar
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-red-500/30 text-red-300"
                    >
                      <XCircle className="w-3 h-3" /> Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <BarChart2 className="w-5 h-5 text-mediaPurple" />
              <h2 className="text-xl font-bold">Painel de Datas</h2>
            </div>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span>Total planejado</span>
                <strong>{stats.total}</strong>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span>Instagram</span>
                <strong>{posts.filter((p) => p.platform === 'Instagram').length}</strong>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span>LinkedIn</span>
                <strong>{posts.filter((p) => p.platform === 'LinkedIn').length}</strong>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span>Próximos 7 dias</span>
                <strong>
                  {
                    posts.filter(
                      (p) =>
                        p.scheduledAt &&
                        new Date(p.scheduledAt) >= new Date() &&
                        new Date(p.scheduledAt) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    ).length
                  }
                </strong>
              </div>
              <div>
                <p className="text-xs text-slate-500">
                  Os dados permanecem no armazenamento local deste dispositivo. Faça backups periódicos usando o botão Exportar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
