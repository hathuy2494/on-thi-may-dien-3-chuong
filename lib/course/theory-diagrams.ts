import type { TheoryDiagram } from "./types";

export const transformerTheory: TheoryDiagram[] = [
  {
    title: "Lõi thép và hai dây quấn",
    image: "mba-cau-tao",
    alt: "Sơ đồ mạch từ khép kín. Cuộn sơ cấp ở trái, cuộn thứ cấp ở phải và từ thông Φ đi qua lõi.",
    notes: [
      { title: "Lõi ghép lá", text: "Dẫn từ thông và giảm dòng điện xoáy." },
      { title: "Cuộn sơ cấp", text: "Dòng xoay chiều tạo từ thông Φ biến thiên." },
      { title: "Cuộn thứ cấp", text: "Cảm ứng điện áp có cùng tần số." },
    ],
  },
  {
    title: "Thí nghiệm không tải và ngắn mạch",
    image: "mba-thi-nghiem",
    alt: "Sơ đồ phía trên có thứ cấp hở và điện áp cấp định mức. Sơ đồ phía dưới có thứ cấp nối tắt và điện áp cấp thấp.",
    notes: [
      { title: "Thứ cấp hở", text: "I₂ = 0. Công suất đo P₀ gần bằng tổn hao sắt." },
      { title: "Thứ cấp nối tắt", text: "Cấp áp thấp tới dòng định mức. Pₙ ≈ tổn hao đồng định mức." },
    ],
  },
  {
    title: "Điện áp và tổn hao khi có tải",
    image: "mba-co-tai",
    alt: "Đồ thị định tính điện áp thứ cấp U₂ theo hệ số tải β. Đường xanh tăng, đường nâu giảm từ cùng điểm không tải U₂₀.",
    notes: [
      { title: "Tải dung", text: "U₂ có thể tăng so với lúc không tải." },
      { title: "Tải cảm", text: "U₂ thường giảm khi dòng tải tăng." },
      { title: "Hệ số tải β", text: "Tổn hao đồng tăng theo β². P₀ gần như cố định." },
    ],
  },
  {
    title: "Nối dây ba pha",
    image: "mba-ba-pha",
    alt: "Ba đầu pha nối sao Y, nối tam giác Δ và hình đồng hồ chỉ góc lệch pha giữa hai phía.",
    notes: [
      { title: "Nối sao Y", text: "Điện áp dây bằng √3 lần điện áp pha." },
      { title: "Nối tam giác Δ", text: "Dòng dây bằng √3 lần dòng pha." },
      { title: "Tổ nối dây", text: "Chỉ góc lệch pha. Ghép song song cần tỉ số và uₙ% phù hợp." },
    ],
  },
];

export const windingTheory: TheoryDiagram[] = [
  {
    title: "Stato, rôto và khe hở",
    image: "quay-cau-tao",
    alt: "Mặt cắt máy điện quay với stato bên ngoài, khe hở hình vành khăn và rôto nối với trục ở giữa.",
    notes: [
      { title: "Stato", text: "Phần đứng yên bao quanh rôto." },
      { title: "Khe hở", text: "Từ trường qua khe hở liên kết hai phần." },
      { title: "Rôto", text: "Nhận mômen khi làm động cơ, nhận công cơ khi làm máy phát." },
    ],
  },
  {
    title: "Rãnh, bước cực và bước bối",
    image: "quay-buoc-boi",
    alt: "Dãy 12 rãnh. Bước cực minh họa là sáu khoảng rãnh. Bối ngắn ở dưới nối rãnh 1 và 6. Hai rãnh cạnh nhau được đánh dấu thành nhóm.",
    notes: [
      { title: "Bước cực τ", text: "Khoảng giữa hai cực kề nhau, bằng 180° điện." },
      { title: "Số rãnh q", text: "Số rãnh phân cho một cực của một pha." },
      { title: "Bối bước ngắn", text: "y < τ. Chọn bước bối để giảm sóng hài." },
    ],
  },
  {
    title: "Ba pha tạo từ trường quay",
    image: "quay-tu-truong",
    alt: "Ba trục dây quấn A, B, C bố trí quanh stato. Mũi tên trong lòng máy biểu thị chiều quay. Ba đường sin phía dưới lệch pha nhau.",
    notes: [
      { title: "Trục ba pha", text: "Cách nhau 120° điện trong không gian." },
      { title: "Chiều quay", text: "Đổi chỗ hai dây pha để đảo chiều từ trường." },
      { title: "Dòng ba pha", text: "Lệch 120° theo thời gian. Hệ cân bằng tạo từ trường có biên độ không đổi." },
    ],
  },
];

export const inductionTheory: TheoryDiagram[] = [
  {
    title: "Tốc độ từ trường và độ trượt",
    image: "kdb-do-truot",
    alt: "Mặt cắt động cơ không đồng bộ. Hai mũi tên cong cùng chiều biểu thị từ trường và rôto. Hai mũi tên thẳng phía dưới so sánh n₁ với n.",
    notes: [
      { title: "Từ trường n₁", text: "Tốc độ đồng bộ n₁ = 60f₁/p." },
      { title: "Rôto n", text: "Ở chế độ động cơ, rôto quay chậm hơn từ trường." },
      { title: "Độ trượt s", text: "s = (n₁ − n)/n₁. Tần số rôto f₂ = sf₁." },
    ],
  },
  {
    title: "Đường đi của công suất",
    image: "kdb-cong-suat",
    alt: "Dòng công suất đi từ nguồn qua khe hở, thành công suất cơ phát triển rồi ra trục. Ba nhánh bên dưới biểu thị tổn hao.",
    notes: [
      { title: "Qua khe hở", text: "Pδ truyền từ stato sang rôto." },
      { title: "Ra trục", text: "Công suất cơ phát triển trừ tổn hao quay." },
      { title: "Tổn hao đồng rôto", text: "Bằng sPδ. Công suất cơ phát triển bằng (1 − s)Pδ." },
    ],
  },
  {
    title: "Mở máy và điều tốc",
    image: "kdb-mo-may",
    alt: "Sơ đồ chuyển từ nối sao Y sang nối tam giác Δ. Phía dưới là biến tần và tỉ số U trên f.",
    notes: [
      { title: "Mở máy nối Y", text: "Dòng dây và mômen còn khoảng 1/3 so với mở trực tiếp nối Δ." },
      { title: "Chạy nối Δ", text: "Áp dụng khi động cơ định mức nối Δ ở điện áp lưới." },
      { title: "Điều tốc bằng biến tần", text: "Đổi f. Giữ U/f gần như cố định dưới tần số cơ sở." },
    ],
  },
  {
    title: "Động cơ không đồng bộ một pha",
    image: "kdb-mot-pha",
    alt: "Mạch xoay chiều một pha có cuộn chính và cuộn phụ nối tiếp với tụ C. Mũi tên phía dưới biểu thị chiều quay của rôto.",
    notes: [
      { title: "Cuộn chính", text: "Tạo từ trường đập mạch." },
      { title: "Tụ nối với cuộn phụ", text: "Làm dòng cuộn phụ lệch pha với dòng cuộn chính." },
      { title: "Mômen mở máy", text: "Hai dòng lệch pha giúp rôto bắt đầu quay." },
    ],
  },
];
