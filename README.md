# Ôn thi kỹ thuật

Website ôn tập hai học phần **Máy điện 1 (EE3140)** và **Kỹ thuật đo lường (EE3110)**.

**[Mở website ôn tập](https://on-thi-may-dien-3-chuong.tartfloat4.chatgpt.site/)**

## Máy điện 1

Ba chương đầu có lý thuyết minh họa, bảng công thức và câu hỏi trắc nghiệm kèm lời giải từng bước.

| Chương | Số câu |
| --- | ---: |
| 1. Máy biến áp | 38 |
| 2. Những vấn đề chung về máy điện quay | 17 |
| 3. Máy điện không đồng bộ | 42 |
| **Tổng** | **97** |

- Chọn A, B, C hoặc D để xem ngay đáp án đúng và lời giải. Nguồn đề được ghi dưới từng câu.
- Tiến độ ở chế độ khách được lưu trong trình duyệt. Đăng nhập bằng ChatGPT để đồng bộ tiến độ giữa các thiết bị.
- Mục **Ôn câu sai** cho biết số lần sai, hỗ trợ làm lại và giữ lịch sử sau khi bạn trả lời đúng.

## Kỹ thuật đo lường

- Bốn phần bao gồm cơ sở đo lường, phần tử thiết bị đo, đo đại lượng điện và đo đại lượng không điện.
- Mỗi dạng có sơ đồ chú thích, công thức và bài tập tự luận có lời giải từng bước.
- [Luyện đề](https://on-thi-may-dien-3-chuong.tartfloat4.chatgpt.site/#ky-thuat-do-luong/luyen-de) chọn một câu biến thể từ mỗi phần. Ý a hỏi lý thuyết, ý b yêu cầu tính toán. Đáp án hiển thị ngay dưới đề.

## Chạy trên máy

Cần **Node.js 22.13 trở lên**, npm và Git. Sao chép kho rồi cài các gói theo tệp khóa.

```sh
git clone https://github.com/hathuy2494/on-thi-may-dien-3-chuong.git
cd on-thi-may-dien-3-chuong
npm run install:ci
```

Để thử chức năng lưu tiến độ, hãy tạo cấu hình Worker và áp dụng migration cho cơ sở dữ liệu D1 cục bộ lần đầu.

```sh
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_steady_azazel.sql
```

Khởi động máy chủ phát triển.

```sh
npm run dev
```

Mở địa chỉ được in trong terminal, thường là `http://localhost:5173`. Nút **Đăng nhập** trên bản phát triển cục bộ dùng tài khoản mô phỏng. Các lượt làm thử được lưu vào D1 cục bộ.

## Mã nguồn

| Đường dẫn | Vai trò |
| --- | --- |
| [`app/`](app/) | Giao diện, luồng ôn thi và API lưu tiến độ |
| [`lib/course/`](lib/course/) | Tóm tắt lý thuyết, công thức, ngân hàng câu hỏi và lời giải |
| [`db/`](db/) và [`drizzle/`](drizzle/) | Lược đồ D1 và migration |
| [`public/hinh/`](public/hinh/) | Hình minh họa trong câu hỏi |
| [`.openai/hosting.json`](.openai/hosting.json) | Cấu hình triển khai trên ChatGPT Sites |

## Triển khai

Bản đang chạy được triển khai qua **ChatGPT Sites**, với Cloudflare Workers xử lý yêu cầu và Cloudflare D1 lưu tiến độ. Sites cung cấp luồng đăng nhập ChatGPT và kết nối cơ sở dữ liệu thông qua binding `DB`. Khi sửa lược đồ, tạo migration bằng `npm run db:generate` và đưa migration vào phiên bản triển khai.
