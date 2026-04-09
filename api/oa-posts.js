const fallbackItems = [
  {
    id: "oa-fallback-1",
    title: "Ngày hội trải nghiệm tuyển sinh 2026",
    summary: "Phụ huynh đăng ký tham quan trường và gặp trực tiếp giáo viên phụ trách.",
    url: "",
  },
  {
    id: "oa-fallback-2",
    title: "Công bố chính sách học bổng đầu vào",
    summary: "Áp dụng cho các chương trình chất lượng cao và nhóm học sinh xuất sắc.",
    url: "",
  },
];

function normalizePost(raw, index) {
  return {
    id: String(
      raw?.id ||
        raw?.article_id ||
        raw?.post_id ||
        raw?.msg_id ||
        raw?.slug ||
        `post-${index}`
    ),
    title: raw?.title || raw?.name || raw?.caption || "Bài viết từ Zalo OA",
    summary:
      raw?.summary ||
      raw?.description ||
      raw?.excerpt ||
      raw?.desc ||
      "Xem chi tiết bài viết trên Zalo OA.",
    image:
      raw?.cover ||
      raw?.thumbnail ||
      raw?.photo ||
      raw?.image_url ||
      raw?.thumb ||
      "",
    url: raw?.url || raw?.link || raw?.share_url || raw?.permalink || "",
    publishedAt: raw?.published_at || raw?.publish_date || raw?.created_at || raw?.publishedDate || "",
  };
}

function pickItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.data?.posts)) return payload.data.posts;
  if (Array.isArray(payload?.data?.articles)) return payload.data.articles;
  if (Array.isArray(payload?.posts)) return payload.posts;
  if (Array.isArray(payload?.articles)) return payload.articles;
  return [];
}

async function fetchOaPosts(limit) {
  const endpoint = process.env.OA_POSTS_ENDPOINT;
  const accessToken = process.env.OA_ACCESS_TOKEN;
  const managerCookie = process.env.OA_MANAGER_COOKIE;

  if (!endpoint || (!accessToken && !managerCookie)) {
    return {
      source: "fallback",
      items: fallbackItems.slice(0, limit),
      message: "Missing OA_POSTS_ENDPOINT and auth configuration",
    };
  }

  const url = new URL(endpoint);
  if (!url.searchParams.has("limit")) {
    url.searchParams.set("limit", String(limit));
  }

  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    ...(process.env.OA_REFERER ? { Referer: process.env.OA_REFERER } : {}),
    ...(process.env.OA_USER_AGENT ? { "User-Agent": process.env.OA_USER_AGENT } : {}),
    ...(managerCookie ? { Cookie: managerCookie } : {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(process.env.OA_APP_SECRET ? { secret_key: process.env.OA_APP_SECRET } : {}),
  };

  const response = await fetch(url, {
    method: process.env.OA_POSTS_METHOD || "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`OA API responded with status ${response.status}`);
  }

  const payload = await response.json();
  const items = pickItems(payload).map(normalizePost).slice(0, limit);

  return {
    source: managerCookie ? "oa-manager" : "oa",
    items,
  };
}

export default async function handler(req, res) {
  const limit = Math.max(1, Math.min(10, Number(req.query?.limit || 5)));

  try {
    const payload = await fetchOaPosts(limit);
    res.status(200).json(payload);
  } catch (error) {
    res.status(502).json({
      error: "Failed to fetch OA posts",
      message: error.message,
      fallbackItems: fallbackItems.slice(0, limit),
    });
  }
}
