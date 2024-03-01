import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Главная</h1>
      <nav className="home-nav">
        <ul>
          <li>
            <Link className="home-link" href="/pages">Pages</Link>
          </li>
          <li>
            <Link className="home-link" href="/priceplans">Price Plans</Link>
          </li>
          <li>
            <Link className="home-link" href="/products">Products</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
