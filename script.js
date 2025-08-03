
      // Modern blog post data
      const blogPosts = [
        {
          id: 1,
          title: "The Future of React: Server Components Explained",
          description:
            "Discover how React Server Components will change the way we build modern web applications.",
          category: "tech",
          date: "2023-10-15",
          image:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
          featured: true,
        },
        {
          id: 2,
          title: "Building Microfrontends with Module Federation",
          description:
            "Learn how to scale your frontend architecture using Webpack's Module Federation.",
          category: "webdev",
          date: "2023-10-10",
          image:
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
        },
        {
          id: 3,
          title: "GPT-4: What Developers Need to Know",
          description:
            "Exploring the capabilities and limitations of OpenAI's latest language model for developers.",
          category: "ai",
          date: "2023-10-05",
          image:
            "https://images.unsplash.com/photo-1677691824188-3e266886cb27?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        },
        {
          id: 4,
          title: "Serverless Architecture Patterns",
          description:
            "Common design patterns for building scalable applications with serverless technologies.",
          category: "cloud",
          date: "2023-09-28",
          image:
            "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
        },
        {
          id: 5,
          title: "TypeScript 5.0: New Features Overview",
          description:
            "A deep dive into the latest features and improvements in TypeScript 5.0.",
          category: "tech",
          date: "2023-09-22",
          image:
            "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        },
        {
          id: 6,
          title: "The State of WebAssembly in 2023",
          description:
            "How WebAssembly is being used in production today and what's coming next.",
          category: "webdev",
          date: "2023-09-15",
          image:
            "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1528&q=80",
        },
      ];

      // DOM elements
      const blogContainer = document.getElementById("blog-container");
      const searchInput = document.getElementById("search");
      const categorySelect = document.getElementById("category");
      const prevPageBtn = document.getElementById("prev-page");
      const nextPageBtn = document.getElementById("next-page");
      const pageNumbersContainer = document.getElementById("page-numbers");

      // Pagination variables
      let currentPage = 1;
      const postsPerPage = 6;
      let filteredPosts = [];

      // Initialize the blog
      function initBlog() {
        renderBlogPosts();
        setupEventListeners();
      }

      // Render blog posts based on current filters and pagination
      function renderBlogPosts() {
        // Clear existing posts
        blogContainer.innerHTML = "";

        // Filter posts based on search and category
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;

        filteredPosts = blogPosts.filter((post) => {
          const matchesSearch =
            post.title.toLowerCase().includes(searchTerm) ||
            post.description.toLowerCase().includes(searchTerm);
          const matchesCategory =
            selectedCategory === "all" || post.category === selectedCategory;
          return matchesSearch && matchesCategory;
        });

        // Calculate pagination
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToDisplay = filteredPosts.slice(startIndex, endIndex);

        // Render posts
        if (postsToDisplay.length === 0) {
          blogContainer.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <i class="fas fa-search text-4xl text-gray-500 mb-4"></i>
                        <h3 class="text-xl font-medium text-gray-300">No articles found</h3>
                        <p class="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                    </div>
                `;
        } else {
          postsToDisplay.forEach((post) => {
            const postElement = createPostCard(post);
            blogContainer.appendChild(postElement);
          });
        }

        // Update pagination controls
        updatePaginationControls(totalPages);
      }

      // Create a modern blog post card element
      function createPostCard(post) {
        const postElement = document.createElement("div");
        postElement.className = "post-card rounded-xl overflow-hidden";

        postElement.innerHTML = `
                <div class="h-48 overflow-hidden">
                    <img src="${post.image}" alt="${
          post.title
        }" class="w-full h-full object-cover">
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-center mb-3">
                        <span class="category-badge text-xs font-semibold px-2.5 py-1 rounded-full">${formatCategory(
                          post.category
                        )}</span>
                        <span class="text-sm text-gray-400">${formatDate(
                          post.date
                        )}</span>
                    </div>
                    <h3 class="text-xl font-bold mb-2">${post.title}</h3>
                    <p class="text-gray-400 mb-4 line-clamp-2">${
                      post.description
                    }</p>
                    <a href="#" class="inline-flex items-center text-accent font-medium hover:text-white transition-colors">
                        Read more
                        <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            `;

        return postElement;
      }

      // Format category for display
      function formatCategory(category) {
        const categories = {
          tech: "Technology",
          webdev: "Web Dev",
          ai: "AI/ML",
          cloud: "Cloud",
        };
        return categories[category] || category;
      }

      // Format date for display
      function formatDate(dateString) {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
      }

      // Update pagination controls
      function updatePaginationControls(totalPages) {
        // Clear existing page numbers
        pageNumbersContainer.innerHTML = "";

        // Disable/enable prev/next buttons
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;

        // Generate page numbers
        for (let i = 1; i <= totalPages; i++) {
          const pageBtn = document.createElement("button");
          pageBtn.className = `pagination-btn px-4 py-2 ${
            currentPage === i ? "active" : ""
          }`;
          pageBtn.textContent = i;
          pageBtn.addEventListener("click", () => {
            currentPage = i;
            renderBlogPosts();
          });
          pageNumbersContainer.appendChild(pageBtn);
        }
      }

      // Set up event listeners
      function setupEventListeners() {
        // Search input
        searchInput.addEventListener("input", () => {
          currentPage = 1;
          renderBlogPosts();
        });

        // Category filter
        categorySelect.addEventListener("change", () => {
          currentPage = 1;
          renderBlogPosts();
        });

        // Previous page button
        prevPageBtn.addEventListener("click", () => {
          if (currentPage > 1) {
            currentPage--;
            renderBlogPosts();
          }
        });

        // Next page button
        nextPageBtn.addEventListener("click", () => {
          const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
          if (currentPage < totalPages) {
            currentPage++;
            renderBlogPosts();
          }
        });
      }

      // Initialize the blog when the page loads
      document.addEventListener("DOMContentLoaded", initBlog);
    