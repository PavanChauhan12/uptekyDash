import React, { useEffect, useState } from "react";
import api from "../utils/api";
import dayjs from "dayjs";
import { saveAs } from "file-saver";

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    q: "",
    rating: "",
    minRating: "",
    maxRating: ""
  });
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadStats = async () => {
    try {
      const res = await api.get("/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadFeedback = async (p = 1) => {
    setLoading(true);
    try {
      const params = { page: p, limit, ...filters };
      const res = await api.get("/feedback", { params });
      setData(res.data.data);
      setTotal(res.data.total);
      setPage(res.data.page);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadStats();
    loadFeedback(1);
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    loadFeedback(1);
  };

  const exportCSV = async () => {
    try {
      const res = await api.get("/feedback/export.csv", {
        params: filters,
        responseType: "blob"
      });
      saveAs(res.data, "feedbacks.csv");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>

      {/* ======= STAT CARDS ======= */}
      <section className="cards">
        <div className="card stat">
          <h3>Total</h3>
          <p>{stats ? stats.total : "—"}</p>
        </div>

        <div className="card stat">
          <h3>Average Rating</h3>
          <p>{stats ? stats.avgRating : "—"}</p>
        </div>

        <div className="card stat">
          <h3>Positive (≥4)</h3>
          <p>{stats ? stats.positive : "—"}</p>
        </div>

        <div className="card stat">
          <h3>Negative (≤2)</h3>
          <p>{stats ? stats.negative : "—"}</p>
        </div>
      </section>

      {/* ======= FILTER SECTION ======= */}
      <section className="card">
        <h3>Search & Filter</h3>
        <form onSubmit={onSearch} className="filters">
          <input
            placeholder="Search..."
            value={filters.q}
            onChange={(e) =>
              setFilters({ ...filters, q: e.target.value })
            }
          />

          <select
            value={filters.rating}
            onChange={(e) =>
              setFilters({
                ...filters,
                rating: e.target.value,
                minRating: "",
                maxRating: ""
              })
            }
          >
            <option value="">Rating (any)</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option value={r} key={r}>
                {r}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min rating"
            value={filters.minRating}
            onChange={(e) =>
              setFilters({
                ...filters,
                minRating: e.target.value,
                rating: ""
              })
            }
            min="1"
            max="5"
          />

          <input
            type="number"
            placeholder="Max rating"
            value={filters.maxRating}
            onChange={(e) =>
              setFilters({
                ...filters,
                maxRating: e.target.value,
                rating: ""
              })
            }
            min="1"
            max="5"
          />

          <button className="btn" type="submit">
            Apply
          </button>

          <button
            className="btn secondary"
            type="button"
            onClick={() => {
              setFilters({
                q: "",
                rating: "",
                minRating: "",
                maxRating: ""
              });
              loadFeedback(1);
            }}
          >
            Reset
          </button>

          <button className="btn" type="button" onClick={exportCSV}>
            Export CSV
          </button>
        </form>
      </section>

      {/* ======= FEEDBACK TABLE ======= */}
      <section className="card">
        <h3>Feedbacks {loading && "Loading..."}</h3>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Message</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.email || "-"}</td>
                <td>{r.rating}</td>
                <td className="message">{r.message}</td>
                <td>{dayjs(r.createdAt).format("YYYY-MM-DD HH:mm")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="btn"
            disabled={page <= 1}
            onClick={() => loadFeedback(page - 1)}
          >
            Prev
          </button>

          <span>
            Page {page} • {total} total
          </span>

          <button
            className="btn"
            disabled={page * limit >= total}
            onClick={() => loadFeedback(page + 1)}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
