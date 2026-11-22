import type { Chapter } from "./types";
import { windingQuestions } from "./windings-bank";
import { windingTheory } from "./theory-diagrams";

export const windings: Chapter = {
  id: 2,
  title: "Những vấn đề chung về máy điện quay",
  shortTitle: "Máy điện quay",
  description: "Biến đổi điện cơ, bố trí dây quấn xoay chiều, sức điện động và từ trường quay.",
  theory: windingTheory,
  formulas: [
    {
      title: "Cảm ứng và lực điện từ",
      items: [
        { name: "Định luật Faraday", equation: "e = −dψ/dt   ·   ψ = NΦ", note: "ψ là từ thông móc vòng. Dấu âm theo quy tắc Lenz." },
        { name: "Thanh dẫn trong từ trường đều", equation: "e = Bℓv   ·   F = BIℓ", note: "Các phương vuông góc phù hợp. Chiều cảm ứng theo v × B, chiều lực theo Iℓ × B." },
      ],
    },
    {
      title: "Góc điện, cực và bố trí rãnh",
      items: [
        { name: "Góc điện từ góc cơ", equation: "θ_điện = p · θ_cơ", note: "p là số đôi cực, 2p là số cực." },
        { name: "Bước cực theo số rãnh", equation: "τ = Z/(2p)", note: "Z là tổng số rãnh. Bước bối y = τ ứng với đủ bước." },
        { name: "Rãnh trên một cực một pha", equation: "q = Z/(2p · m)", note: "m là số pha. Dùng công thức hệ số phân bố bên dưới cho dây quấn q nguyên, phân bố đều." },
        { name: "Góc điện giữa hai rãnh", equation: "α = 360° · p/Z = 180°/τ", note: "Góc thiếu bước ε = 180° − yα, với y là số khoảng rãnh của bối." },
      ],
    },
    {
      title: "Sức điện động và sóng hài",
      items: [
        { name: "Hệ số bước, sóng cơ bản", equation: "k_y = sin(yα/2) = cos(ε/2)", note: "Đủ bước thì ε = 0 và k_y = 1." },
        { name: "Hệ số phân bố, sóng cơ bản", equation: "k_q = sin(qα/2) / [q sin(α/2)]", note: "Với q nhóm sức điện động bằng nhau lệch pha từng góc α." },
        { name: "Hệ số dây quấn", equation: "k_dq = k_y · k_q", note: "Nhân hai hệ số để tính sức điện động cơ bản mỗi pha." },
        { name: "Sức điện động hiệu dụng mỗi pha", equation: "E_p = 4,44 · f · N_p · Φ₁ · k_dq", note: "N_p là số vòng nối tiếp của một nhánh pha. Φ₁ là biên độ từ thông cơ bản mỗi cực (Wb)." },
        { name: "Hệ số của hài bậc ν", equation: "k_yν = sin(νyα/2)\nk_qν = sin(qνα/2) / [q sin(να/2)]", note: "Lấy trị tuyệt đối khi tính biên độ. Có thể chọn y để triệt một hài cụ thể." },
        { name: "Bậc sóng hài răng", equation: "ν_r = kZ/p ± 1", note: "k = 1, 2, 3,… với Z là số rãnh và p là số đôi cực." },
      ],
    },
    {
      title: "Từ trường quay và mômen",
      items: [
        { name: "Tốc độ từ trường quay", equation: "n₁ = 60f/p = 120f/(2p)\nω₁ = 2πn₁/60", note: "n₁ tính bằng vòng/phút, ω₁ là tốc độ góc cơ tính bằng rad/s." },
        { name: "Mômen từ công suất cơ", equation: "T = P_cơ/ω ≈ 9.550 · P_cơ(kW)/n", note: "ω và n là tốc độ của trục tương ứng. T tính bằng N·m." },
        { name: "Sức từ động tổng ba pha", equation: "F₁ₘ = 3F_pha,ₘ/2", note: "Sóng cơ bản với hệ ba pha cân bằng, trong đó F_pha,ₘ là biên độ đập mạch cực đại của một pha." },
      ],
    },
  ],
  reference: {
    title: "MIT OpenCourseWare · Dây quấn và hệ số dây quấn",
    url: "https://ocw.mit.edu/courses/6-685-electric-machines-fall-2013/resources/mit6_685f13_chapter5/",
  },
  questions: windingQuestions,
};
