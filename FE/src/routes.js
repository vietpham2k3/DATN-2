import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const Charts = React.lazy(() => import("./views/charts/Charts"));

const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);

// Buttons
const SanPham = React.lazy(() => import("./views/sanpham/sanpham/SanPham"));
const AddSanPham = React.lazy(() =>
  import("./views/sanpham/sanpham/AddSanPham")
);
const UpdateSanPham = React.lazy(() =>
  import("./views/sanpham/sanpham/UpdateSanPham")
);

const MauSac = React.lazy(() => import("./views/sanpham/mausac/MauSac"));
const ChatLieu = React.lazy(() => import("./views/sanpham/chatlieu/ChatLieu"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/theme", name: "Theme", element: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", element: Colors },
  { path: "/theme/typography", name: "Typography", element: Typography },

  { path: "/san-pham", name: "SanPham", element: SanPham, exact: true },
  { path: "/san-pham", name: "Sản Phẩm", element: SanPham },
  { path: "/san-pham/chi-tiet-san-pham/add", element: AddSanPham },
  {
    path: "/san-pham/chi-tiet-san-pham/detail/:id/:idSP",
    element: UpdateSanPham,
  },
  { path: "/san-pham/mau-sac", name: "Màu Sắc", element: MauSac },
  { path: "/san-pham/chat-lieu", name: "Chất Liệu", element: ChatLieu },

  { path: "/charts", name: "Charts", element: Charts },
  { path: "/thong-ke", name: "Thống kê", element: Dashboard },
];

export default routes;
