import type { Chapter } from "./types";
import { windingQuestions } from "./windings-bank";

export const windings: Chapter = {
  id: 2,
  title: "Những vấn đề chung về máy điện quay",
  shortTitle: "Máy điện quay",
  description: "Biến đổi điện cơ, bố trí dây quấn xoay chiều, sức điện động và từ trường quay.",
  theory: [
    {
      title: "Biến đổi năng lượng điện cơ",
      points: [
        "Phần tĩnh gọi là stato, phần quay gọi là rôto. Từ trường qua khe hở liên kết hai phần và cho phép trao đổi công suất điện – cơ.",
        "Ở chế độ động cơ, lực điện từ trên các thanh dẫn tạo mômen trên trục. Ở chế độ máy phát, chuyển động tương đối giữa dây dẫn với từ trường tạo sức điện động cảm ứng.",
      ],
    },
    {
      title: "Cực từ, rãnh và bước dây quấn",
      points: [
        "Một đôi cực ứng với 360° điện. Bước cực ứng với 180° điện và bằng số rãnh chia cho số cực. Cuộn đủ bước có hai cạnh cách nhau một bước cực.",
        "Với dây quấn ba pha đều, q là số rãnh trên một cực của một pha. Dây quấn hai lớp có hai cạnh bối dây ở mỗi rãnh, thường thuộc hai bối khác nhau.",
      ],
    },
    {
      title: "Sức điện động của dây quấn",
      points: [
        "Sức điện động các cạnh bối trong những rãnh khác nhau lệch pha theo góc điện giữa rãnh. Cộng theo phasor mới ra sức điện động pha.",
        "Hệ số dây quấn bằng tích hệ số bước và hệ số phân bố. Bước ngắn và dây quấn phân bố có thể làm giảm sóng hài, đồng thời làm giảm một phần sức điện động cơ bản.",
      ],
    },
    {
      title: "Sức từ động và từ trường quay",
      points: [
        "Sức từ động cơ bản của dây quấn một pha là sóng đập mạch. Nó tách được thành hai sóng quay trái chiều với cùng tốc độ và mỗi biên độ bằng một nửa.",
        "Ba dây quấn lệch nhau 120° điện trong không gian, mang ba dòng cân bằng lệch nhau 120° theo thời gian, tạo sóng cơ bản quay có biên độ không đổi. Đổi chỗ hai dây pha làm đảo chiều quay.",
      ],
    },
  ],
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
  reminders: [
    "Ghi rõ đề cho số cực 2p hay số đôi cực p.",
    "Khi tính hệ số dây quấn, dùng góc điện và kiểm tra máy tính đang ở chế độ độ.",
    "Phân biệt sức điện động E (V) với sức từ động F (A·vòng).",
  ],
  reference: {
    title: "MIT OpenCourseWare · Dây quấn và hệ số dây quấn",
    url: "https://ocw.mit.edu/courses/6-685-electric-machines-fall-2013/resources/mit6_685f13_chapter5/",
  },
  questions: windingQuestions,
};
