
import { useEffect, useState } from "react";
import "./styles.css";
import Counter from "./Counter"

const ProductCard = ({ image, title }) => {
  return (
    <div className="product-card">
      <img className="product-img" src={image} alt={title} />
      <span>{title}</span>
    </div>
  );
};
export default function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    setProducts(json.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const PAGE_SIZE = 10; //10 products on my page
  const total_Pages = products.length;
  const no0fPages = Math.ceil(total_Pages / PAGE_SIZE);
  const start = currentPage + PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlecurrentPage = (n) => {
    setCurrentPage(n);
  };
  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const goToPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return !products.length ? (
    <h1>No Products found</h1>
  ) : (
    <div className="App">
      <Counter />
      <h1>Pagination</h1>

      <div className="pagination-container">
        <button
          className="page-number"
          disabled={currentPage === 0}
          onClick={() => goToPreviousPage()}
        >
          ⬅️
        </button>

        {[...Array(no0fPages).keys()].map((n) => (
          <button
            className={"page-number" + (n === currentPage ? "active" : "")}
            key={n}
            onClick={() => handlecurrentPage(n)}
          >
            {n}
          </button>
        ))}
        <button
          disabled={currentPage === no0fPages - 1}
          className="page-number"
          onClick={() => goToNextPage()}
        >
          ➡️
        </button>
      </div>

      <div className="product-container">
        {products.slice(start, end).map((p) => (
          <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
        ))}
      </div>
    </div>
  );
}
