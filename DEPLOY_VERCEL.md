# Deploy Vercel

## Mục tiêu

Deploy cả frontend Mini App preview và API lấy bài viết OA trên cùng một domain Vercel.

Frontend sẽ gọi:

```text
/api/oa-posts
```

## Tạo project trên Vercel

1. Đăng nhập [vercel.com](https://vercel.com)
2. Chọn `Add New...` -> `Project`
3. Import repo GitHub `tuan303/nshm-zalo-miniapp`
4. Nếu cần:
   - Framework Preset: `Vite`
   - Root Directory: `nshm`

## Build settings

- Build Command:

```text
npm run vercel-build
```

- Output Directory:

```text
www
```

## Environment Variables trên Vercel

Thêm các biến:

```env
OA_POSTS_ENDPOINT=https://oa.zalo.me/manage/article-broadcast?action=get-list-article&filter=&pageCount=20&pageIndex=1&publishingStatus=
OA_POSTS_METHOD=GET
OA_MANAGER_COOKIE=your_cookie_string
OA_REFERER=https://oa.zalo.me/manage/content/article/
OA_USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36
```

Không cần `VITE_NEWS_API_BASE` trên Vercel nếu frontend và API cùng domain.

## Kiểm tra

Sau khi deploy, kiểm tra:

```text
https://your-vercel-domain/api/oa-posts?limit=5
```

Nếu ra JSON có `items`, frontend sẽ tự dùng dữ liệu thật.

## Deploy lại Mini App

Sau khi backend Vercel chạy ổn, deploy lại bản Mini App để frontend mới lên Zalo:

```powershell
npm run deploy:testing
```

## Lưu ý

- Cách này vẫn phụ thuộc vào `OA_MANAGER_COOKIE`, nên cookie có thể hết hạn.
- Phù hợp để test nhanh trên môi trường public.
