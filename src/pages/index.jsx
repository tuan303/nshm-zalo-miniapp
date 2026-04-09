import { useEffect, useMemo, useState } from "react";
import { Box, Icon, Page, Text } from "zmp-ui";

const audiences = ["Phụ huynh", "Học sinh", "Giáo viên"];

const audienceContent = {
  "Phụ huynh": {
    greeting: "Chào buổi chiều, Phụ huynh!",
    heroTitle: "Cùng kiến tạo tương lai",
    heroText: "Theo dõi tuyển sinh, lịch học và thông báo quan trọng của nhà trường.",
  },
  "Học sinh": {
    greeting: "Chào buổi chiều, Học sinh!",
    heroTitle: "Sẵn sàng cho một ngày học tốt",
    heroText: "Xem lịch học, hoạt động ngoại khóa và thông tin học tập mới nhất.",
  },
  "Giáo viên": {
    greeting: "Chào buổi chiều, Giáo viên!",
    heroTitle: "Kết nối lớp học hiệu quả",
    heroText: "Tra cứu kế hoạch giảng dạy, lịch công tác và thông báo chuyên môn.",
  },
};

const features = {
  "Phụ huynh": [
    {
      id: "admission",
      icon: "zi-call",
      title: "Tư vấn tuyển sinh",
      description: "Giải đáp mọi thắc mắc",
      tone: "rose",
      detailTitle: "Tư vấn tuyển sinh",
      detailBody:
        "Phụ huynh có thể gửi câu hỏi, đăng ký tư vấn trực tuyến và nhận lịch hẹn với bộ phận tuyển sinh.",
    },
    {
      id: "schedule",
      icon: "zi-calendar",
      title: "Lịch học giảng đường",
      description: "Thời khóa biểu chi tiết",
      tone: "amber",
      detailTitle: "Lịch học giảng đường",
      detailBody:
        "Xem thời khóa biểu theo lớp, theo tuần và cập nhật thay đổi lịch học ngay khi nhà trường điều chỉnh.",
    },
    {
      id: "result",
      icon: "zi-camera",
      title: "Điểm tuyển sinh",
      description: "Tra cứu kết quả nhanh",
      tone: "rose-soft",
      detailTitle: "Điểm tuyển sinh",
      detailBody:
        "Tra cứu kết quả xét tuyển bằng mã hồ sơ và xem trạng thái xử lý hồ sơ theo thời gian thực.",
    },
    {
      id: "programs",
      icon: "zi-book",
      title: "Các ngành đào tạo",
      description: "Đa dạng và chuyên sâu",
      tone: "slate",
      detailTitle: "Các ngành đào tạo",
      detailBody:
        "Khám phá chương trình mũi nhọn, lớp chất lượng cao và các định hướng học tập theo từng cấp học.",
    },
  ],
  "Học sinh": [
    {
      id: "clubs",
      icon: "zi-star",
      title: "Câu lạc bộ",
      description: "Hoạt động ngoại khóa",
      tone: "rose",
      detailTitle: "Câu lạc bộ và hoạt động",
      detailBody:
        "Đăng ký hoạt động trải nghiệm, câu lạc bộ STEM, nghệ thuật và thể thao ngay trong app.",
    },
    {
      id: "schedule",
      icon: "zi-calendar",
      title: "Lịch học cá nhân",
      description: "Theo lớp và phòng học",
      tone: "amber",
      detailTitle: "Lịch học cá nhân",
      detailBody:
        "Xem lịch học theo ngày, lịch kiểm tra và ghi chú của giáo viên cho từng tiết học.",
    },
    {
      id: "scores",
      icon: "zi-chart",
      title: "Kết quả học tập",
      description: "Theo dõi tiến độ",
      tone: "rose-soft",
      detailTitle: "Kết quả học tập",
      detailBody:
        "Theo dõi điểm số, nhận xét và mục tiêu học tập trong từng giai đoạn của năm học.",
    },
    {
      id: "library",
      icon: "zi-book",
      title: "Thư viện số",
      description: "Tài liệu ôn tập",
      tone: "slate",
      detailTitle: "Thư viện số",
      detailBody:
        "Truy cập tài liệu học tập, đề cương ôn luyện và tài nguyên do giáo viên chia sẻ.",
    },
  ],
  "Giáo viên": [
    {
      id: "plans",
      icon: "zi-note",
      title: "Kế hoạch giảng dạy",
      description: "Theo tuần và học kỳ",
      tone: "rose",
      detailTitle: "Kế hoạch giảng dạy",
      detailBody:
        "Quản lý tiến độ bài giảng, chủ đề chuyên môn và các mốc kiểm tra đánh giá của từng lớp.",
    },
    {
      id: "schedule",
      icon: "zi-calendar",
      title: "Lịch công tác",
      description: "Phân công rõ ràng",
      tone: "amber",
      detailTitle: "Lịch công tác",
      detailBody:
        "Xem lịch dạy, họp chuyên môn và sự kiện toàn trường trong một lịch tổng hợp.",
    },
    {
      id: "classroom",
      icon: "zi-chat",
      title: "Trao đổi phụ huynh",
      description: "Kết nối nhanh chóng",
      tone: "rose-soft",
      detailTitle: "Trao đổi phụ huynh",
      detailBody:
        "Gửi thông báo, phản hồi và cập nhật tình hình học tập của học sinh trực tiếp trong app.",
    },
    {
      id: "resource",
      icon: "zi-book",
      title: "Tài nguyên chuyên môn",
      description: "Mẫu biểu và học liệu",
      tone: "slate",
      detailTitle: "Tài nguyên chuyên môn",
      detailBody:
        "Tập hợp mẫu giáo án, biểu mẫu đánh giá và học liệu số dùng chung trong tổ bộ môn.",
    },
  ],
};

const navItems = [
  { id: "home", label: "Trang chủ", icon: "zi-home" },
  { id: "program", label: "Chương trình", icon: "zi-book" },
  { id: "tuition", label: "Biểu phí", icon: "zi-wallet" },
  { id: "support", label: "Liên hệ", icon: "zi-help-circle" },
  { id: "profile", label: "Cá nhân", icon: "zi-user" },
];

const fallbackNewsItems = [
  {
    id: "open-day",
    title: "Ngày hội trải nghiệm tuyển sinh 2026",
    summary: "Phụ huynh đăng ký tham quan trường và gặp trực tiếp giáo viên phụ trách.",
    url: "",
  },
  {
    id: "scholarship",
    title: "Công bố chính sách học bổng đầu vào",
    summary: "Áp dụng cho các chương trình chất lượng cao và nhóm học sinh xuất sắc.",
    url: "",
  },
];

const navContent = {
  home: {
    title: "Trung tâm điều hành",
    body: "Theo dõi nhanh các tiện ích chính, thông báo mới và tin tức nổi bật của trường.",
  },
  program: {
    title: "Chương trình đào tạo",
    body: "Giới thiệu hệ đào tạo, chuẩn đầu ra, hoạt động trải nghiệm và lộ trình học tập theo cấp học.",
  },
  tuition: {
    title: "Biểu phí và thanh toán",
    body: "Xem học phí dự kiến, các khoản dịch vụ và trạng thái thanh toán theo từng kỳ.",
  },
  support: {
    title: "Liên hệ và hỗ trợ",
    body: "Kết nối nhanh với tuyển sinh, giáo vụ, tài vụ và bộ phận công tác học sinh.",
  },
  profile: {
    title: "Thông tin cá nhân",
    body: "Quản lý hồ sơ, thông tin liên hệ, tài khoản học sinh hoặc phụ huynh và các cài đặt ứng dụng.",
  },
};

function HomePage() {
  const [activeAudience, setActiveAudience] = useState("Phụ huynh");
  const [activeNav, setActiveNav] = useState("home");
  const [selectedFeature, setSelectedFeature] = useState(features["Phụ huynh"][0]);
  const [newsItems, setNewsItems] = useState(fallbackNewsItems);
  const [newsStatus, setNewsStatus] = useState("loading");

  const handleAudienceChange = (audience) => {
    setActiveAudience(audience);
    setSelectedFeature(features[audience][0]);
  };

  const newsApiBase = useMemo(() => {
    if (import.meta.env.VITE_NEWS_API_BASE) {
      return import.meta.env.VITE_NEWS_API_BASE;
    }

    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return "http://localhost:8787";
    }

    return "";
  }, []);

  useEffect(() => {
    if (!newsApiBase) {
      setNewsStatus("fallback");
      return;
    }

    const controller = new AbortController();

    fetch(`${newsApiBase}/api/oa/posts?limit=5`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không lấy được dữ liệu bài viết");
        }

        return response.json();
      })
      .then((payload) => {
        if (!payload?.items?.length) {
          setNewsStatus("fallback");
          return;
        }

        setNewsItems(
          payload.items.map((item, index) => ({
            id: item.id || `oa-${index}`,
            title: item.title || "Bài viết từ Zalo OA",
            summary: item.summary || item.description || "Xem chi tiết bài viết trên Zalo OA.",
            url: item.url || "",
          }))
        );
        setNewsStatus("ready");
      })
      .catch(() => {
        setNewsStatus("fallback");
      });

    return () => controller.abort();
  }, [newsApiBase]);

  const openNewsItem = (item) => {
    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Page className="school-page">
      <Box className="app-shell">
        <Box className="school-header">
          <Box className="school-brand">
            <img
              className="school-brand-image"
              src="https://hoangmaistarschool.edu.vn/thongtin/LogoNSHM.png"
              alt="Ngôi Sao Hoàng Mai"
            />
          </Box>
          <button className="notify-button" type="button" aria-label="Thông báo">
            <Icon icon="zi-notif" />
          </button>
        </Box>

        <Box className="intro-copy">
          <Text className="intro-subtitle">{audienceContent[activeAudience].greeting}</Text>
          <Text.Title className="intro-title">
            {audienceContent[activeAudience].heroTitle}
          </Text.Title>
        </Box>

        <button className="admission-banner" type="button">
          <Box className="admission-copy">
            <Text className="banner-pill">THÔNG BÁO MỚI</Text>
            <Text.Title className="banner-title">
              Tuyển sinh hệ chất lượng cao SPT 2026
            </Text.Title>
            <Text className="banner-text">{audienceContent[activeAudience].heroText}</Text>
            <span className="banner-button">Tìm hiểu ngay</span>
          </Box>
          <Box className="admission-visual">
            <Box className="visual-glow"></Box>
            <Box className="visual-person"></Box>
          </Box>
        </button>

        <Box className="audience-tabs">
          {audiences.map((item) => (
            <button
              key={item}
              type="button"
              className={`audience-tab ${activeAudience === item ? "is-active" : ""}`}
              onClick={() => handleAudienceChange(item)}
            >
              {item}
            </button>
          ))}
        </Box>

        <Box className="feature-grid">
          {features[activeAudience].map((item) => (
            <button
              key={item.id}
              type="button"
              className={`feature-card ${
                selectedFeature.id === item.id ? "is-selected" : ""
              }`}
              onClick={() => setSelectedFeature(item)}
            >
              <Box className={`feature-icon tone-${item.tone}`}>
                <Icon icon={item.icon} />
              </Box>
              <Text.Title className="feature-title">{item.title}</Text.Title>
              <Text className="feature-description">{item.description}</Text>
            </button>
          ))}
        </Box>

        <Box className="detail-card">
          <Text className="detail-label">Tính năng đang chọn</Text>
          <Text.Title className="detail-title">{selectedFeature.detailTitle}</Text.Title>
          <Text className="detail-body">{selectedFeature.detailBody}</Text>
        </Box>

        <Box className="news-section">
          <Box className="section-head">
            <Text.Title className="section-title">TIN TỨC</Text.Title>
            <button className="section-link-button" type="button">
              {newsStatus === "ready" ? "Đồng bộ OA" : "Dữ liệu mẫu"}
            </button>
          </Box>

          <Box className="news-list">
            {newsItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="news-item"
                onClick={() => openNewsItem(item)}
              >
                <Box className="news-thumb"></Box>
                <Box className="news-copy">
                  <Text.Title className="news-title">{item.title}</Text.Title>
                  <Text className="news-summary">{item.summary}</Text>
                </Box>
              </button>
            ))}
          </Box>
          <Text className="news-hint">
            {newsStatus === "ready"
              ? "Tin tức đang lấy từ API backend kết nối Zalo OA."
              : "Chưa cấu hình OA API hoặc backend chưa chạy, đang hiển thị dữ liệu mẫu."}
          </Text>
        </Box>

        <Box className="nav-panel">
          <Text className="detail-label">Mục đang mở</Text>
          <Text.Title className="detail-title">{navContent[activeNav].title}</Text.Title>
          <Text className="detail-body">{navContent[activeNav].body}</Text>
        </Box>

        <Box className="bottom-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-button ${activeNav === item.id ? "is-active" : ""}`}
              onClick={() => setActiveNav(item.id)}
            >
              <Icon icon={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </Box>
      </Box>
    </Page>
  );
}

export default HomePage;
