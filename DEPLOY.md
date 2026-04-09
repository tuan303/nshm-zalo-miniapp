# Deploy Zalo Mini App

## Chạy local

```powershell
npm run start
```

## Deploy bản Development

```powershell
npm run deploy
```

## Deploy bản Testing

```powershell
npm run deploy:testing
```

## Quy trình đã được tự động hóa

Các lệnh deploy sẽ tự:

1. Build project ra thư mục `www`
2. Đồng bộ file `www/app-config.json` về `app-config.json`
3. Gọi `zmp deploy`

Không cần sửa tay asset hash sau mỗi lần build nữa.
