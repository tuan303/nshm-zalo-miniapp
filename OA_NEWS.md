# OA News Integration

## Mục tiêu

Mini App không gọi trực tiếp Zalo OA API. Frontend gọi backend nội bộ:

```text
GET /api/oa/posts
```

Backend mới là nơi giữ `OA_ACCESS_TOKEN`.

## Cách chạy local

Terminal 1:

```powershell
npm run backend
```

Terminal 2:

```powershell
C:\Users\Administrator\AppData\Roaming\npm\zmp.cmd start
```

## Cấu hình `.env.local`

Tạo file `.env.local` và điền:

```env
OA_POSTS_ENDPOINT=https://your-oa-api-endpoint
OA_POSTS_METHOD=GET
OA_ACCESS_TOKEN=
OA_MANAGER_COOKIE=your_cookie_string
OA_APP_SECRET=
OA_REFERER=https://oa.zalo.me/manage/content/article/
OA_USER_AGENT=Mozilla/5.0
OA_API_PORT=8787
VITE_NEWS_API_BASE=http://localhost:8787
```

## Lưu ý

- Có 2 hướng tích hợp:
- `OA_ACCESS_TOKEN`: dùng khi bạn có OpenAPI chính thức cho bài viết OA.
- `OA_MANAGER_COOKIE`: dùng với endpoint nội bộ `oa.zalo.me/manage/...` lấy từ DevTools.
- `OA_POSTS_ENDPOINT` là endpoint bài viết OA mà backend sẽ gọi.
- Nếu thiếu token hoặc endpoint, Mini App sẽ tự rơi về dữ liệu mẫu thay vì trắng mục Tin tức.
- Cách dùng `OA_MANAGER_COOKIE` chỉ phù hợp để thử nghiệm nội bộ, không nên xem là giải pháp production bền vững.
