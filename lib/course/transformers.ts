import type { Chapter } from "./types";
import { transformerQuestions } from "./transformers-bank";

export const transformers: Chapter = {
  id: 1,
  title: "Máy biến áp",
  shortTitle: "Máy biến áp",
  description: "Tỉ số biến áp, mạch tương đương, tổn hao, hiệu suất và tổ nối dây ba pha.",
  theory: [
    {
      title: "Cấu tạo và nguyên lý",
      points: [
        "Máy biến áp truyền năng lượng giữa các dây quấn qua từ thông biến thiên. Điện áp và dòng điện có thể đổi, còn tần số hai phía bằng nhau.",
        "Trụ mang dây quấn, gông nối các trụ để khép kín mạch từ. Lõi thép kỹ thuật điện ghép lá cách điện làm giảm dòng điện xoáy. Trong máy kiểu trụ, hai cuộn cùng pha thường được lồng đồng tâm trên cùng một trụ.",
      ],
    },
    {
      title: "Quan hệ điện từ và quy đổi",
      points: [
        "Từ thông chính móc vòng qua cả hai dây quấn. Từ thông tản chủ yếu móc vòng với dây quấn sinh ra nó và được mô hình hóa bằng điện kháng tản.",
        "Mạch tương đương có các điện trở dây quấn, điện kháng tản và nhánh từ hóa song song. Quy đổi thứ cấp về sơ cấp nhân điện áp với k, chia dòng cho k, nhân tổng trở với k².",
      ],
    },
    {
      title: "Thí nghiệm không tải và ngắn mạch",
      points: [
        "Không tải: hở mạch thứ cấp, cấp điện áp định mức vào phía đo. Dòng I₀ nhỏ, công suất P₀ gần bằng tổn hao sắt.",
        "Ngắn mạch: nối tắt một dây quấn và cấp điện áp thấp vào dây quấn còn lại đến dòng định mức. Từ thông chính nhỏ, công suất Pₙ gần bằng tổn hao đồng ở định mức.",
      ],
    },
    {
      title: "Có tải, điện áp và hiệu suất",
      points: [
        "Khi có tải, sơ cấp lấy thêm dòng để cân bằng sức từ động của thứ cấp. Tải cảm thường làm điện áp thứ cấp giảm. Tải dung có thể làm điện áp tăng.",
        "Ở điện áp và tần số gần định mức, tổn hao không tải gần như cố định còn tổn hao đồng tăng theo bình phương hệ số tải. Khi hệ số công suất cố định, hiệu suất cực đại tại điểm hai tổn hao xấp xỉ bằng nhau.",
      ],
    },
    {
      title: "Máy biến áp ba pha và vận hành song song",
      points: [
        "Nối sao có điện áp dây bằng √3 lần điện áp pha. Nối tam giác có dòng dây bằng √3 lần dòng pha. Tỉ số vòng dây luôn áp dụng cho từng pha.",
        "Tổ nối dây dùng ký hiệu kiểu nối và số giờ để mô tả độ lệch pha giữa hai phía. Vận hành song song cần đúng thứ tự pha, tương thích góc lệch, gần bằng tỉ số điện áp và điện áp ngắn mạch tương đối.",
      ],
    },
  ],
  formulas: [
    {
      title: "Cảm ứng và định mức",
      items: [
        { name: "Sức điện động hiệu dụng", equation: "E = 4,44 · f · N · Φₘ", note: "Từ thông hình sin. N là số vòng, Φₘ là từ thông cực đại (Wb)." },
        { name: "Tỉ số vòng dây", equation: "k = N₁/N₂ = E₁/E₂ ≈ U₁/U₂₀", note: "U₂₀ là điện áp thứ cấp không tải. Với máy lý tưởng, I₂/I₁ = k." },
        { name: "Công suất biểu kiến", equation: "S₁φ = UI   ·   S₃φ = √3 U_d I_d", note: "Với ba pha cân bằng, U_d và I_d là điện áp và dòng điện dây." },
        { name: "Đại lượng dây và pha", equation: "Y: U_d = √3 U_p, I_d = I_p\nΔ: U_d = U_p, I_d = √3 I_p", note: "Dùng U_p hai phía để tính tỉ số vòng dây của máy ba pha." },
      ],
    },
    {
      title: "Mạch tương đương và thí nghiệm",
      items: [
        { name: "Quy đổi thứ cấp về sơ cấp", equation: "U₂′ = kU₂   ·   I₂′ = I₂/k\nZ₂′ = k²Z₂", note: "Lấy k = N₁/N₂. Quy đổi ngược thì đảo các hệ số." },
        { name: "Nhánh từ hóa, gần đúng", equation: "I_w = P₀/U₀   ·   Iₘ = √(I₀² − I_w²)\nR_c = U₀/I_w   ·   Xₘ = U₀/Iₘ", note: "Dạng một pha hoặc mỗi pha. P₀ ở đây là công suất mỗi pha, bỏ qua tổn hao đồng không tải." },
        { name: "Thông số ngắn mạch", equation: "Zₙ = Uₙ/Iₙ   ·   Rₙ = Pₙ/Iₙ²\nXₙ = √(Zₙ² − Rₙ²)", note: "Dạng một pha hoặc mỗi pha, quy về phía đo. Với máy ba pha lấy Pₙ tổng chia 3 trước khi thế." },
        { name: "Điện áp ngắn mạch", equation: "uₙ% = 100 · Uₙ/U_đm", note: "Đo tại dòng định mức. Dùng cùng phía và cùng cách đo điện áp." },
        { name: "Thành phần trở và kháng tương đối", equation: "rₙ% = 100 · Pₙ/S_đm = uₙ% cosφₙ\nxₙ% = √[(uₙ%)² − (rₙ%)²]", note: "Pₙ đo tại dòng định mức. Dùng Pₙ và S_đm cùng quy mô đơn vị." },
      ],
    },
    {
      title: "Tải, tổn hao và hiệu suất",
      items: [
        { name: "Hệ số tải và công suất ra", equation: "β = I₂/I₂đm\nP₂ ≈ β · S_đm · cosφ", note: "Gần đúng với điện áp thứ cấp xấp xỉ định mức. Dùng nhất quán W và VA hoặc kW và kVA." },
        { name: "Thay đổi điện áp gần đúng", equation: "Δu% ≈ β(rₙ% cosφ + xₙ% sinφ)", note: "rₙ%, xₙ% là các thành phần trở và kháng trên cùng cơ sở. Lấy φ dương cho tải cảm, âm cho tải dung." },
        { name: "Tổn hao và hiệu suất", equation: "P_mất ≈ P₀ + β²Pₙ\nη = P₂/(P₂ + P_mất)", note: "Pₙ là công suất đo được ở thí nghiệm ngắn mạch tại dòng định mức. Nhân η với 100 để ra phần trăm." },
        { name: "Tải cho hiệu suất cực đại", equation: "β* = √(P₀/Pₙ)", note: "Với cosφ cố định và tổn hao sắt coi như không đổi. Nếu β* ngoài dải cho phép, xét cực đại trong dải vận hành." },
        { name: "Điện năng tổn hao một chu kỳ", equation: "A_mất ≈ P₀t_đóng + Σ(βᵢ²Pₙtᵢ)", note: "P₀ tính trong toàn bộ thời gian đóng điện, tᵢ là số giờ ở từng mức tải. Dùng kW để được kWh." },
        { name: "Chia tải giữa các máy song song", equation: "Sᵢ ≈ S_tổng · (S_đm,ᵢ/uₙᵢ%) / Σ(S_đm,ⱼ/uₙⱼ%)\nβᵢuₙᵢ% ≈ C", note: "Cùng tỉ số và tổ nối dây, góc tổng trở gần nhau. Với cùng giới hạn β, máy có uₙ% thấp nhất đạt giới hạn trước." },
      ],
    },
  ],
  reminders: [
    "Không tải nghĩa là I₂ = 0, trong khi I₁ = I₀ vẫn khác 0.",
    "Phân biệt điện áp dây và điện áp pha trước khi dùng tỉ số vòng dây.",
    "Trong công thức hiệu suất, nhân Pₙ với β² và giữ P₀ gần như không đổi.",
  ],
  reference: {
    title: "IIT Kharagpur · Thử nghiệm và hiệu suất máy biến áp",
    url: "https://www.nptel.ac.in/courses/108105155",
  },
  questions: transformerQuestions,
};
