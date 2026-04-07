"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const router = useRouter()
  const pathname = usePathname();

  if (loading) return null;
  const isActive = (path) => pathname === path;

  function logouting(){
    logout();
    router.push("/login")
  }


  return (
    <>
      <header className="main-header">
        <div className="header-content">
          <Link className="logo-box" href="/">Logo</Link>
          <nav className="nav-links">
            <Link href="/filme" className={isActive("/filme") ? "active-link" : ""}>Filme</Link>
            <Link href="/serie" className={isActive("/serie") ? "active-link" : ""}>Série</Link>
            <Link href="/livro" className={isActive("/livro") ? "active-link" : ""}>Livro</Link>
          </nav>
          <div className="auth-zone">
            {user ? (
              <div className="user-profile-icon" style={{ cursor: 'pointer' }} onClick={() => setIsOpen(true)}>
                <i className="fas fa-user-circle"></i>
                <span>{user.nickName}</span>
              </div>
            ) : (
              <div className="auth-links">
                <Link href="/login">Login</Link>
                <hr />
                <Link href="/cadastro">Cadastro</Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className={`user-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="close-bnt" onClick={() => setIsOpen(false)}>&times;</button>
        </div>
        <nav className="sidebar-nav">
          <Link href="/criar"><i className="fas fa-plus"></i> Adicionar Indicação</Link>
          <Link href="/"><i className="fas fa-trophy"></i> Ver Ranking</Link>
          <button onClick={() => router.push(`/watchList/${user.id}`)} ><i className="fas fa-list"></i> Minha Watchlist</button>
          <div className="side-logout">
            <hr />
            <button onClick={logouting}>Sair</button>
          </div>
        </nav>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
}