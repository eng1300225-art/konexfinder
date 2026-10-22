import React, { useState, useEffect } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Trash2, 
  Send, 
  CornerDownRight, 
  Flame, 
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { KonexCompany, AnonymousComment } from '../types/konex';

interface DcGalleryCommentsProps {
  company: KonexCompany;
}

export const DcGalleryComments: React.FC<DcGalleryCommentsProps> = ({ company }) => {
  const [comments, setComments] = useState<AnonymousComment[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'concept'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Write Form State
  const [author, setAuthor] = useState('ㅇㅇ');
  const [password, setPassword] = useState('1234');
  const [category, setCategory] = useState<'일반' | '호재' | '악재' | '분석' | '차트' | '뇌피셜'>('일반');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Expanded post for viewing details
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Reply Form State
  const [replyAuthor, setReplyAuthor] = useState('ㅇㅇ');
  const [replyContent, setReplyContent] = useState('');
  const [replyPassword, setReplyPassword] = useState('1234');

  // Delete modal state
  const [deleteModalCommentId, setDeleteModalCommentId] = useState<string | null>(null);
  const [deletePasswordInput, setDeletePasswordInput] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Fetch comments from backend
  const fetchComments = async () => {
    try {
      const url = `/api/companies/${company.code}/comments?filter=${activeFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.comments) {
        setComments(data.comments);
        if (data.comments.length > 0 && !selectedPostId) {
          setSelectedPostId(data.comments[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [company.code, activeFilter]);

  // Submit new post
  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/companies/${company.code}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author,
          password,
          category,
          title,
          content
        })
      });
      const data = await res.json();
      if (data.success && data.comment) {
        setComments(prev => [data.comment, ...prev]);
        setSelectedPostId(data.comment.id);
        setTitle('');
        setContent('');
      }
    } catch (err) {
      alert('게시글 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Vote post (개추 / 비추)
  const handleVote = async (commentId: string, type: 'up' | 'down') => {
    try {
      const res = await fetch(`/api/comments/${commentId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      const data = await res.json();
      if (data.success) {
        setComments(prev =>
          prev.map(c =>
            c.id === commentId
              ? { ...c, upvotes: data.upvotes, downvotes: data.downvotes }
              : c
          )
        );
      }
    } catch (err) {
      console.error('Vote failed:', err);
    }
  };

  // Submit reply to a post
  const handleSubmitReply = async (commentId: string) => {
    if (!replyContent.trim()) return;

    try {
      const res = await fetch(`/api/comments/${commentId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: replyAuthor,
          content: replyContent,
          password: replyPassword
        })
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setComments(prev =>
          prev.map(c =>
            c.id === commentId
              ? { ...c, replies: [...c.replies, data.reply] }
              : c
          )
        );
        setReplyContent('');
      }
    } catch (err) {
      alert('답글 등록에 실패했습니다.');
    }
  };

  // Delete post
  const handleDeletePost = async () => {
    if (!deleteModalCommentId) return;

    try {
      const res = await fetch(`/api/comments/${deleteModalCommentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: deletePasswordInput })
      });
      const data = await res.json();
      if (data.success) {
        setComments(prev => prev.filter(c => c.id !== deleteModalCommentId));
        if (selectedPostId === deleteModalCommentId) {
          setSelectedPostId(null);
        }
        setDeleteModalCommentId(null);
        setDeletePasswordInput('');
        setDeleteError(null);
      } else {
        setDeleteError(data.message || '비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      setDeleteError('삭제 처리 중 오류가 발생했습니다.');
    }
  };

  // Filtered comments by search
  const displayedComments = comments.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return c.title.toLowerCase().includes(q) || c.content.toLowerCase().includes(q) || c.author.toLowerCase().includes(q);
  });

  const selectedPost = comments.find(c => c.id === selectedPostId) || displayedComments[0];

  return (
    <section className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-sm space-y-6">
      {/* DC Gallery Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-400">코넥스 종목 갤러리</span>
            <span className="text-xs text-slate-600">&gt;</span>
            <span className="text-xs font-semibold text-blue-400">{company.name} 갤러리</span>
            <span className="text-xs text-slate-600">·</span>
            <span className="text-[11px] font-mono text-slate-500">익명 게시판</span>
          </div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>{company.name} 종목토론 갤러리</span>
            <span className="text-xs font-normal text-slate-400">
              (총 {comments.length}개 게시글)
            </span>
          </h2>
        </div>

        {/* Filter Tabs: 전체글 vs 개념글 */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-lg">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            전체글
          </button>
          <button
            onClick={() => setActiveFilter('concept')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              activeFilter === 'concept'
                ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>개념글 (개추 3+)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Post List Table & Selected Post Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Post List Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Gallery Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="갤러리 내 제목, 내용, 닉네임 검색..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Table of Posts */}
          <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/40">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-[11px]">
                  <th className="py-2 px-3 w-12 text-center">말머리</th>
                  <th className="py-2 px-3">제목</th>
                  <th className="py-2 px-3 w-28">글쓴이</th>
                  <th className="py-2 px-2 w-14 text-center font-mono">개추</th>
                  <th className="py-2 px-3 w-16 text-right font-mono">작성</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {displayedComments.length > 0 ? (
                  displayedComments.map((c) => {
                    const isConcept = (c.upvotes - c.downvotes) >= 3;
                    const isSelected = selectedPost?.id === c.id;

                    return (
                      <tr
                        key={c.id}
                        onClick={() => setSelectedPostId(c.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-blue-950/30'
                            : 'hover:bg-slate-850/50'
                        }`}
                      >
                        <td className="py-2.5 px-3 text-center">
                          <span className={`text-[10px] px-1 py-0.5 rounded font-medium ${
                            c.category === '호재' ? 'text-red-400 bg-red-950/40' :
                            c.category === '악재' ? 'text-blue-400 bg-blue-950/40' :
                            c.category === '분석' ? 'text-emerald-400 bg-emerald-950/40' :
                            'text-slate-400 bg-slate-900'
                          }`}>
                            {c.category}
                          </span>
                        </td>

                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-1.5">
                            {isConcept && (
                              <span className="text-[10px] text-amber-400 font-bold shrink-0">
                                [개념]
                              </span>
                            )}
                            <span className={`truncate font-medium ${
                              isSelected ? 'text-blue-300 font-semibold' : 'text-slate-200'
                            }`}>
                              {c.title}
                            </span>
                            {c.replies.length > 0 && (
                              <span className="text-[11px] font-mono text-blue-400 font-semibold">
                                [{c.replies.length}]
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-2.5 px-3 text-slate-400">
                          <span className="text-slate-300">{c.author}</span>
                          <span className="text-[10px] text-slate-500 ml-1 font-mono">
                            ({c.ip})
                          </span>
                        </td>

                        <td className="py-2.5 px-2 text-center font-mono tabular-nums">
                          <span className={c.upvotes > 0 ? 'text-red-400 font-semibold' : 'text-slate-500'}>
                            {c.upvotes}
                          </span>
                        </td>

                        <td className="py-2.5 px-3 text-right font-mono text-[11px] text-slate-500 whitespace-nowrap">
                          {c.createdAt.substring(11, 16)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      등록된 게시글이 없습니다. 첫 익명 글을 작성해보세요!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* New Post Form (글쓰기 폼) */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>익명 글쓰기</span>
              <span className="text-[11px] text-slate-500 font-normal">
                * 누구나 닉네임과 비밀번호를 입력하고 자유롭게 작성 가능합니다.
              </span>
            </h4>

            <form onSubmit={handleSubmitPost} className="space-y-3">
              {/* Row 1: Nickname, Password, Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">닉네임</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="ㅇㅇ"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">비밀번호 (삭제용)</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="1234"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">말머리</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="일반">일반</option>
                    <option value="호재">호재</option>
                    <option value="악재">악재</option>
                    <option value="분석">분석</option>
                    <option value="차트">차트</option>
                    <option value="뇌피셜">뇌피셜</option>
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="DART 재무제표 분석 내용이나 주가 전망, 소식을 자유롭게 남겨주세요."
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded transition-colors cursor-pointer disabled:bg-slate-800"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>등록</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Selected Post Reader & Threaded Replies (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          {selectedPost ? (
            <div className="space-y-4">
              {/* Post Header */}
              <div className="pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 font-semibold border border-blue-800/40">
                    {selectedPost.category}
                  </span>
                  {(selectedPost.upvotes - selectedPost.downvotes) >= 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-semibold border border-amber-800/60 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-400" />
                      개념글
                    </span>
                  )}
                  <span className="text-xs text-slate-400">
                    {selectedPost.author} ({selectedPost.ip})
                  </span>
                  <span className="text-xs text-slate-600">·</span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {selectedPost.createdAt}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-100 leading-snug">
                    {selectedPost.title}
                  </h3>
                  <button
                    onClick={() => {
                      setDeleteModalCommentId(selectedPost.id);
                      setDeletePasswordInput('');
                      setDeleteError(null);
                    }}
                    className="text-slate-500 hover:text-red-400 transition-colors p-1"
                    title="게시글 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Post Body Text */}
              <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap py-2">
                {selectedPost.content}
              </div>

              {/* DC Signature Upvote / Downvote Buttons */}
              <div className="flex items-center justify-center gap-4 py-3 border-y border-slate-850">
                <button
                  onClick={() => handleVote(selectedPost.id, 'up')}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 rounded-lg text-red-300 text-xs font-semibold transition-all cursor-pointer group"
                >
                  <ThumbsUp className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                  <span>개념글 추천</span>
                  <span className="font-mono tabular-nums ml-1 bg-red-900/80 px-1.5 py-0.2 rounded text-[11px]">
                    {selectedPost.upvotes}
                  </span>
                </button>

                <button
                  onClick={() => handleVote(selectedPost.id, 'down')}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-blue-400 text-xs font-medium transition-all cursor-pointer group"
                >
                  <ThumbsDown className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span>비추</span>
                  <span className="font-mono tabular-nums ml-1 bg-slate-800 px-1.5 py-0.2 rounded text-[11px]">
                    {selectedPost.downvotes}
                  </span>
                </button>
              </div>

              {/* Threaded Replies Section */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-300">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                  <span>댓글 {selectedPost.replies.length}개</span>
                </div>

                {/* Reply List */}
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {selectedPost.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="p-2.5 bg-slate-900/80 border border-slate-850 rounded text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-slate-300">
                          {reply.author}{' '}
                          <span className="text-slate-500 font-mono">({reply.ip})</span>
                        </span>
                        <span className="text-slate-500 font-mono">
                          {reply.createdAt.substring(11, 16)}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                  {selectedPost.replies.length === 0 && (
                    <p className="text-[11px] text-slate-500 py-2 text-center">
                      아직 댓글이 없습니다. 첫 댓글을 남겨보세요.
                    </p>
                  )}
                </div>

                {/* Reply Input Form */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={replyAuthor}
                      onChange={(e) => setReplyAuthor(e.target.value)}
                      placeholder="닉네임 (ㅇㅇ)"
                      className="w-24 px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200 placeholder-slate-500"
                    />
                    <input
                      type="password"
                      value={replyPassword}
                      onChange={(e) => setReplyPassword(e.target.value)}
                      placeholder="비번"
                      className="w-20 px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200 placeholder-slate-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSubmitReply(selectedPost.id);
                        }
                      }}
                      placeholder="익명 댓글을 입력하세요..."
                      className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={() => handleSubmitReply(selectedPost.id)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded transition-colors"
                    >
                      등록
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 text-xs">
              왼쪽 목록에서 게시글을 클릭하면 본문과 댓글을 볼 수 있습니다.
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalCommentId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-red-400" />
              게시글 삭제 확인
            </h3>
            <p className="text-xs text-slate-400">
              게시글 작성 시 등록했던 비밀번호를 입력해주세요.
            </p>

            <input
              type="password"
              value={deletePasswordInput}
              onChange={(e) => setDeletePasswordInput(e.target.value)}
              placeholder="비밀번호 입력"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              autoFocus
            />

            {deleteError && (
              <p className="text-xs text-red-400">{deleteError}</p>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setDeleteModalCommentId(null);
                  setDeleteError(null);
                }}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
              >
                취소
              </button>
              <button
                onClick={handleDeletePost}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
