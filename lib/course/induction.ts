import type { Chapter } from "./types";
import { inductionQuestions } from "./induction-bank";

export const induction: Chapter = {
  id: 3,
  title: "Máy điện không đồng bộ",
  shortTitle: "Máy không đồng bộ",
  description: "Độ trượt, mạch tương đương, mômen, mở máy, điều tốc và động cơ một pha.",
  theory: [
    {
      title: "Cấu tạo và nguyên lý cảm ứng",
      points: [
        "Dòng ba pha trong stato tạo từ trường quay. Chuyển động tương đối với rôto gây sức điện động và dòng rôto, từ đó sinh mômen điện từ.",
        "Rôto lồng sóc có thanh dẫn được nối ngắn mạch bằng hai vòng ở hai đầu. Rôto dây quấn có thể nối điện trở phụ vào mạch qua vành trượt.",
      ],
    },
    {
      title: "Độ trượt và mạch tương đương",
      points: [
        "Khi mở máy, n = 0 nên s = 1. Ở chế độ động cơ thuận, 0 < s < 1. Ở tốc độ đồng bộ, s = 0 nên sức điện động cảm ứng rôto do sóng cơ bản bằng 0.",
        "Sau khi quy đổi về stato, nhánh rôto có phần tử R₂′/s. Tách R₂′ cho tổn hao đồng rôto và R₂′(1 − s)/s cho công suất biến đổi cơ trong chế độ động cơ.",
      ],
    },
    {
      title: "Dòng công suất và đặc tính cơ",
      points: [
        "Công suất điện qua khe hở chia thành tổn hao đồng rôto và công suất cơ phát triển. Trừ ma sát, thông gió và tổn hao cơ phụ theo giả thiết bài toán để ra công suất trục.",
        "Ở vùng làm việc gần tốc độ đồng bộ, tải tăng thì tốc độ giảm nhẹ và trượt tăng. Mômen cực đại phân cách vùng làm việc bình thường với vùng trượt lớn.",
      ],
    },
    {
      title: "Mở máy và điều chỉnh tốc độ",
      points: [
        "Đấu sao–tam giác giảm dòng mở máy và mômen mở máy còn xấp xỉ một phần ba so với mở máy trực tiếp ở tam giác cùng điện áp dây. Phương pháp này dùng cho máy định chạy tam giác tại điện áp lưới.",
        "Điều tốc bằng biến tần thay đổi tốc độ từ trường. Dưới tần số cơ sở, giữ tỉ số U/f gần như không đổi để giữ từ thông gần định mức. Đổi số cực cũng làm đổi tốc độ đồng bộ.",
      ],
    },
    {
      title: "Động cơ không đồng bộ một pha",
      points: [
        "Từ trường đập mạch tách thành hai trường quay ngược chiều. Khi rôto đứng yên, mômen của hai thành phần cân bằng nên dây quấn chính một mình không tạo mômen khởi động.",
        "Dây quấn phụ và tụ có thể tạo dòng lệch pha với dòng dây quấn chính để tạo mômen bắt đầu quay.",
      ],
    },
  ],
  formulas: [
    {
      title: "Tốc độ và trượt",
      items: [
        { name: "Tốc độ đồng bộ và tốc độ rôto", equation: "n₁ = 60f₁/p   ·   n = (1 − s)n₁", note: "p là số đôi cực. Tốc độ tính bằng vòng/phút." },
        { name: "Hệ số trượt và tần số rôto", equation: "s = (n₁ − n)/n₁\nf₂ = |s|f₁", note: "Dùng s dưới dạng thập phân khi thế. Trong chế độ động cơ, f₂ = sf₁." },
        { name: "Sức điện động và điện kháng rôto", equation: "E₂s = sE₂₀   ·   X₂s = sX₂₀", note: "Dạng chế độ động cơ, 0 ≤ s ≤ 1. Chỉ số 0 ứng với rôto đứng yên." },
        { name: "Trượt thuận, nghịch của động cơ một pha", equation: "s_thuận = s   ·   s_nghịch = 2 − s", note: "Tính theo chiều rôto quay. Hai giá trị bằng 1 khi rôto đứng yên." },
      ],
    },
    {
      title: "Mạch và cân bằng công suất",
      items: [
        { name: "Nhánh rôto quy về stato", equation: "R₂′/s = R₂′ + R₂′(1 − s)/s", note: "Điện trở thay thế phần biến đổi cơ là số hạng thứ hai, dùng với mạch tương đương ở tần số stato." },
        { name: "Công suất điện vào và qua khe hở", equation: "P₁ = √3 U_d I_d cosφ\nP_δ = P₁ − P_Cu1 − P_Fe", note: "Hệ ba pha cân bằng. P_Cu1 là tổn hao đồng stato. Dùng U_d, I_d của đường dây." },
        { name: "Công suất phản kháng và dòng dây", equation: "Q₁ = P₁ tanφ\nI_d = P_trục / (√3 U_d η cosφ)", note: "Hệ ba pha cân bằng. Dùng W và V để được A." },
        { name: "Công suất bên rôto", equation: "P_δ = 3I₂′²R₂′/s\nP_Cu2 = sP_δ   ·   P_cơ,pt = (1 − s)P_δ", note: "I₂′ là dòng rôto quy đổi mỗi pha. Dạng dòng công suất của chế độ động cơ với s > 0." },
        { name: "Công suất trục và hiệu suất", equation: "P_trục = P_cơ,pt − P_mất,cơ\nη = P_trục/P₁", note: "Trừ thêm tổn hao phụ nếu đề cho. Nhân η với 100 để ra phần trăm." },
        { name: "Mômen điện từ và mômen trên trục", equation: "T_đt = P_δ/ω₁ = P_cơ,pt/ω\nT_trục = P_trục/ω", note: "ω₁ là tốc độ góc đồng bộ, ω là tốc độ rôto. Biểu thức chia cho ω dùng khi ω ≠ 0." },
      ],
    },
    {
      title: "Đặc tính mômen, mở máy và điều tốc",
      items: [
        { name: "Mômen theo trượt", equation: "T(s) = 3V_th²(R₂′/s) / {ω₁[(R_th + R₂′/s)² + (X_th + X₂′)²]}", note: "Mạch Thévenin nhìn từ nhánh rôto. V_th là điện áp pha hiệu dụng. Dùng tại tần số cố định." },
        { name: "Độ trượt tại mômen cực đại", equation: "s_k = R₂′ / √[R_th² + (X_th + X₂′)²]", note: "Mô hình tuyến tính. Tăng điện trở rôto làm tăng s_k, còn giá trị cực đại giữ nguyên trong mô hình này." },
        { name: "Mở máy sao so với tam giác", equation: "U_p,Y/U_p,Δ = 1/√3\nI_d,Y/I_d,Δ ≈ T_Y/T_Δ ≈ 1/3", note: "Cùng điện áp dây và so ở lúc đứng yên, với cùng tổng trở pha." },
        { name: "Mở máy giảm điện áp còn 1/k", equation: "T_mở/T_trực tiếp ≈ 1/k²\nI_lưới/I_trực tiếp ≈ 1/k (cuộn kháng) hoặc 1/k² (tự ngẫu)", note: "Giữ tần số, rôto đứng yên, mạch tuyến tính. Máy biến áp tự ngẫu được coi là lý tưởng." },
        { name: "Điều khiển dưới tần số cơ sở", equation: "Φ ≈ k · U/f", note: "Bỏ qua sụt áp stato. Ở tần số rất thấp có thể cần bù sụt áp để giữ từ thông." },
      ],
    },
  ],
  reminders: [
    "Trong cân bằng công suất, s nhân với công suất qua khe hở P_δ, không nhân với công suất vào.",
    "Đổi tốc độ sang rad/s nếu tính mômen từ công suất W.",
    "Phân biệt dòng dây với dòng pha khi so sánh mở máy sao và tam giác.",
  ],
  reference: {
    title: "MIT OpenCourseWare · Mạch và đặc tính máy không đồng bộ",
    url: "https://ocw.mit.edu/courses/6-061-introduction-to-electric-power-systems-spring-2011/pages/readings/",
  },
  questions: inductionQuestions,
};
