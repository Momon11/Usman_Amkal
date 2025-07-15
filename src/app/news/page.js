'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  IconLayoutDashboard,
  IconUser,
  IconLogout,
  IconKey,
  IconPlus,
  IconEdit,
  IconTrash,
  IconNews,
} from '@tabler/icons-react';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setNews(data);
  };

  const handleAdd = async () => {
    const title = prompt('Judul Berita:');
    const content = prompt('Isi Berita:');
    if (title && content) {
      await supabase.from('news').insert([{ title, content }]);
      fetchNews();
    }
  };

  const handleEdit = async (id, oldTitle, oldContent) => {
    const title = prompt('Edit Judul:', oldTitle);
    const content = prompt('Edit Konten:', oldContent);
    if (title && content) {
      await supabase.from('news').update({ title, content }).eq('id', id);
      fetchNews();
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin hapus berita ini?')) {
      await supabase.from('news').delete().eq('id', id);
      fetchNews();
    }
  };

  const filteredNews = news.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-white w-[250px] flex flex-col items-center gap-8 p-5">
        <h1 className="text-3xl text-black font-bold">Connect</h1>
        <div className="flex flex-col gap-3">
          <button onClick={() => router.push('/dashboard')} className="text-black w-[150px] p-1 rounded-lg flex gap-2 items-center">
            <IconLayoutDashboard /> Dashboard
          </button>
          <button onClick={() => router.push('/users')} className="text-black w-[150px] p-1 rounded-lg flex gap-2 items-center">
            <IconUser /> User
          </button>
          <button onClick={() => router.push('/edit')} className="text-black w-[150px] p-1 rounded-lg flex gap-2 items-center">
            <IconEdit /> Edit
          </button>
          <button onClick={() => router.push('/roles')} className="text-black w-[150px] p-1 rounded-lg flex gap-2 items-center">
            <IconKey /> Hak Akses
          </button>
          <button onClick={() => router.push('/news')} className="bg-black text-white w-[150px] p-1 rounded-lg flex gap-2 items-center">
            <IconNews /> News
          </button>
          <button onClick={() => router.push('/login')} className="text-black w-[150px] p-1 rounded-lg flex gap-2 items-center">
            <IconLogout /> Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white w-full p-5 relative">
        <h2 className="text-xl font-bold mb-4">Daftar Berita</h2>
        <Input
          placeholder="Cari berita"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />

        <div className="flex flex-col gap-3">
          {filteredNews.map((item) => (
            <div key={item.id} className="border p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.content}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item.id, item.title, item.content)}>
                    <IconEdit size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.id)}>
                    <IconTrash size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <p className="text-gray-500 text-center mt-4">Tidak ada berita ditemukan.</p>
        )}

        <button
          onClick={handleAdd}
          className="fixed bottom-5 right-5 bg-gray-200 hover:bg-gray-300 text-xl rounded-md w-10 h-10"
        >
          <IconPlus />
        </button>
      </div>
    </div>
  );
}
