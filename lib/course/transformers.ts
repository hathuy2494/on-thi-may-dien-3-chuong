import type { Chapter } from "./types";
import { transformerQuestions } from "./transformers-bank";
import { transformerTheory } from "./theory-diagrams";

export const transformers: Chapter = {
  id: 1,
  title: "Máy biến áp",
  shortTitle: "Máy biến áp",
  description: "Tỉ số biến áp, mạch tương đương, tổn hao, hiệu suất và tổ nối dây ba pha.",
  theory: transformerTheory,
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
  reference: {
    title: "IIT Kharagpur · Thử nghiệm và hiệu suất máy biến áp",
    url: "https://www.nptel.ac.in/courses/108105155",
  },
  questions: transformerQuestions,
};
