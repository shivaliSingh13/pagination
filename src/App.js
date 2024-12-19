import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    let res = await fetch(
      `https://dummyjson.com/products?limit=15&skip=${(page - 1) * 15}`
    );
    let data = await res.json();

    console.log(data, "pp");
    setProducts(data.products);
    setTotalPages(Math.ceil(data.total / 15));
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handlePageClick = (page) => {
    console.log("in page click", page);
    if (page > 0 && page <= totalPages) setPage(page);
  };

  return (
    <>
      <div className="all-products">
        {products.map((prod) => {
          return (
            <div key={prod.id} className="product">
              <img src={prod.thumbnail} lazy />
              <span>{prod.title}</span>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <div
          className={page === 1 ? "hide-btn nav-button" : "nav-button"}
          onClick={() => handlePageClick(page - 1)}
        >
          ←
        </div>
        {[...Array(totalPages)].map((_, i) => {
          return (
            <div
              onClick={() => handlePageClick(i + 1)}
              className={
                page === i + 1 ? "selected-page num-block" : "num-block"
              }
            >
              {i + 1}
            </div>
          );
        })}
        <div
          className={page === totalPages ? "hide-btn nav-button" : "nav-button"}
          onClick={() => handlePageClick(page + 1)}
        >
          →
        </div>
      </div>
    </>
  );
}
