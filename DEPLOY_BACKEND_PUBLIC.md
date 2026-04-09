# Deploy Backend Public

## Mục tiêu

Mini App chỉ lấy được tin OA thật sau khi backend được public ra Internet.

Frontend Mini App:

```text
Tin tức -> gọi https://your-backend-domain/api/oa/posts
```

Backend public:

```text
https://your-backend-domain
```

## Phương án đơn giản nhất: Render

### 1. Đưa project lên GitHub

Nếu project chưa ở GitHub:

```powershell
git add .
git commit -m "Prepare OA backend deployment"
git remote add origin <repo-url>
git push -u origin main
```

### 2. Tạo service trên Render

1. Đăng nhập [render.com](https://render.com)
2. Chọn `New +` -> `Blueprint` hoặc `Web Service`
3. Kết nối repo GitHub chứa thư mục `nshm`
4. Nếu dùng `Blueprint`, Render sẽ đọc file `render.yaml`
5. Nếu tạo tay:
   - Root Directory: `nshm`
   - Build Command: `npm install`
   - Start Command: `npm run backend`

### 3. Thêm biến môi trường trên Render

Thêm các biến sau:

```env
OA_POSTS_ENDPOINT=https://oa.zalo.me/manage/article-broadcast?action=get-list-article&filter=&pageCount=20&pageIndex=1&publishingStatus=
OA_POSTS_METHOD=GET
OA_MANAGER_COOKIE=your_cookie_string
OA_REFERER=https://oa.zalo.me/manage/content/article/
OA_USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36
OA_API_PORT=10000
```

### 4. Kiểm tra backend

Sau khi deploy, mở:

```text
https://your-render-domain/health
```

Kỳ vọng:

```json
{"ok":true}
```

Thử tiếp:

```text
https://your-render-domain/api/oa/posts?limit=5
```

Nếu backend lấy được dữ liệu thật, response sẽ có:

```json
{
  "source": "oa-manager",
  "items": [...]
}
```

## Cập nhật Mini App để dùng backend public

Sau khi có URL backend public, cập nhật file `.env.local`:

```env
VITE_NEWS_API_BASE=https://your-render-domain
```

Sau đó chạy lại:

```powershell
npm run build
C:\Users\Administrator\AppData\Roaming\npm\zmp.cmd deploy --existing --testing --outputDir www --desc "Use public OA backend"
```

Hoặc dùng script sẵn có:

```powershell
npm run deploy:testing
```

## Lưu ý vận hành

- Cookie của OA Manager có thể hết hạn, khi đó backend public sẽ ngừng lấy được tin.
- Cách dùng `OA_MANAGER_COOKIE` phù hợp để test nhanh, không phải giải pháp production dài hạn.
- Giải pháp production bền vững hơn là chuyển sang OpenAPI chính thức của OA nếu Zalo cung cấp endpoint bài viết phù hợp.
