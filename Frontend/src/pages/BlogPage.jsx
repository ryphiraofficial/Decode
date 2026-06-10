import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogs } from "../data/blogData.js";
import "./css/BlogPage.css";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Use the clean blogs dataset directly
  const blogPostsOnly = blogs;

  // Filter unique categories dynamically
  const categories = ["All", ...new Set(blogPostsOnly.map((item) => item.tag))];

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Filter blog posts based on search query and selected category
  const filteredPosts = blogPostsOnly.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.tag === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.subtitle && post.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Scroll to listing section header when page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const element = document.getElementById("blog-listing-top");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Determine if we show the default magazine layout or search results grid
  const isDefaultView = selectedCategory === "All" && searchQuery === "";

  // Pagination Constants & Slicing
  let currentGridPosts = [];
  let totalPages = 1;

  if (isDefaultView) {
    // Page 1 shows:
    // - Magazine grid (7 items: indices 0 to 6)
    // - Bottom grid (6 items: indices 7 to 12)
    // Page 2+ shows:
    // - Bottom grid only (12 items per page: starting from index 13)
    const totalPosts = blogPostsOnly.length;
    totalPages = totalPosts <= 13 ? 1 : 1 + Math.ceil((totalPosts - 13) / 12);

    if (currentPage === 1) {
      currentGridPosts = blogPostsOnly.slice(7, 13);
    } else {
      const startIndex = 13 + (currentPage - 2) * 12;
      currentGridPosts = blogPostsOnly.slice(startIndex, startIndex + 12);
    }
  } else {
    // Filtered search results view: 9 items per page in a simple grid
    const postsPerPage = 9;
    totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    currentGridPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }

  // Split components specifically for default Page 1 magazine columns
  const colLeftPosts = blogPostsOnly.slice(0, 2);
  const colCenterPost = blogPostsOnly[2];
  const colRightPosts = blogPostsOnly.slice(3, 7);

  // Fallback authors for realistic editorial simulation
  const getAuthor = (post) => {
    if (post.author) return post.author;
    if (post.id % 3 === 0) return "By | Anjali";
    if (post.id % 3 === 1) return "By | Parvathy P R";
    return "By | Dcoode Team";
  };

  return (
    <div className="blog-page-wrapper">
      <Helmet>
        <title>Blogs &amp; Tech Insights | Dcoode Palakkad Kerala</title>
        <meta
          name="description"
          content="Explore Dcoode's technical blog. Tutorials, guides, and insights on MERN stack, cyber security, IT internships, and software development in Palakkad, Kerala."
        />
        <meta
          name="keywords"
          content="MERN stack course Kerala, IT internship Palakkad, cybersecurity training Palakkad, custom software development Ottapalam"
        />
        <link rel="canonical" href="https://www.dcoode.com/blog" />
      </Helmet>

      <div className="blog-page-container" id="blog-listing-top">
        {/* Main Title */}
        <h1 className="blog-main-title">Blogs</h1>

        {/* Search & Filter Hub */}
        <div className="blog-controls-hub">
          <div className="blog-search-wrapper">
            <Search className="blog-search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-search-input"
            />
          </div>

          <div className="blog-filters-list">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`blog-filter-btn ${selectedCategory === category ? "active" : ""}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {isDefaultView ? (
          /* ── MAGAZINE FEATURED LAYOUT (DEFAULT VIEW) ── */
          <>
            {currentPage === 1 && (
              <div className="blog-featured-grid">
                {/* Left Column: Stack of 2 posts */}
                <div className="blog-col-left">
                  {colLeftPosts.map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="blog-magazine-card">
                      <div className="blog-img-box">
                        <img src={post.image} alt={post.title} loading="lazy" />
                      </div>
                      <div className="blog-meta-bar">
                        <span className="blog-meta-left">Blog • {post.readTime || "8 mins read"}</span>
                        <span className="blog-meta-right">{post.date}</span>
                      </div>
                      <h3 className="blog-mag-title">{post.title}</h3>
                      <div className="blog-author-line">{getAuthor(post)}</div>
                    </Link>
                  ))}
                </div>

                {/* Center Column: Large Featured Post */}
                {colCenterPost && (
                  <div className="blog-col-center">
                    <Link to={`/blog/${colCenterPost.id}`} className="blog-magazine-card">
                      <div className="blog-img-box">
                        <img src={colCenterPost.image} alt={colCenterPost.title} loading="lazy" />
                      </div>
                      <div className="blog-meta-bar">
                        <span className="blog-meta-left">Blog • {colCenterPost.readTime || "9 mins read"}</span>
                        <span className="blog-meta-right">{colCenterPost.date}</span>
                      </div>
                      <h2 className="blog-mag-title">{colCenterPost.title}</h2>
                      {colCenterPost.subtitle && (
                        <p style={{ fontSize: "0.88rem", color: "#555", margin: "0 0 12px 0", lineHeight: "1.5" }}>
                          {colCenterPost.subtitle}
                        </p>
                      )}
                      <div className="blog-author-line">{getAuthor(colCenterPost)}</div>
                    </Link>
                  </div>
                )}

                {/* Right Column: Most Popular (Text-only posts) */}
                <div className="blog-col-right">
                  <h3 className="blog-popular-headline">Most popular</h3>
                  <div className="blog-popular-list">
                    {colRightPosts.map((post) => (
                      <Link key={post.id} to={`/blog/${post.id}`} className="blog-pop-item">
                        <div className="blog-meta-bar" style={{ marginBottom: "6px" }}>
                          <span className="blog-meta-left">Blog • {post.readTime || "10 mins read"}</span>
                          <span className="blog-meta-right">{post.date}</span>
                        </div>
                        <h4 className="blog-pop-title">{post.title}</h4>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentPage === 1 && <div className="blog-grid-divider" />}

            {/* Bottom/Remaining Posts Grid */}
            {currentGridPosts.length > 0 && (
              <div className="blog-bottom-grid">
                {currentGridPosts.map((post) => (
                  <Link key={post.id} to={`/blog/${post.id}`} className="blog-magazine-card">
                    <div className="blog-img-box">
                      <img src={post.image} alt={post.title} loading="lazy" />
                    </div>
                    <div className="blog-meta-bar">
                      <span className="blog-meta-left">{post.readTime || "12 mins read"}</span>
                      <span className="blog-meta-right">{post.date}</span>
                    </div>
                    <h3 className="blog-mag-title">{post.title}</h3>
                    <div className="blog-author-line">{getAuthor(post)}</div>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          /* ── SIMPLE 3-COLUMN SEARCH / CATEGORY RESULTS GRID ── */
          <div className="blog-bottom-grid">
            {currentGridPosts.length > 0 ? (
              currentGridPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="blog-magazine-card">
                  <div className="blog-img-box">
                    <img src={post.image} alt={post.title} loading="lazy" />
                  </div>
                  <div className="blog-meta-bar">
                    <span className="blog-meta-left">Blog • {post.readTime || "12 mins read"}</span>
                    <span className="blog-meta-right">{post.date}</span>
                  </div>
                  <h3 className="blog-mag-title">{post.title}</h3>
                  <div className="blog-author-line">{getAuthor(post)}</div>
                </Link>
              ))
            ) : (
              <div className="blog-empty-state">
                <h3 className="blog-empty-title">No matching articles found</h3>
                <p className="blog-empty-desc">
                  We couldn't find any articles matching your search query. Try clearing filters or searching for other keywords.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── PAGINATION CONTROLS CONTROLLER ── */}
        {totalPages > 1 && (
          <div className="blog-pagination-wrapper">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="blog-pagination-btn"
              aria-label="Previous Page"
            >
              <ChevronLeft className="blog-pagination-arrow" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`blog-pagination-btn ${currentPage === pageNumber ? "active" : ""}`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="blog-pagination-btn"
              aria-label="Next Page"
            >
              <ChevronRight className="blog-pagination-arrow" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
