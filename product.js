/* ======================
   Hàm tạo Sản phẩm
====================== */
function SanPham(ma, ten, gia, soLuong, danhMuc, dangBan) {
  this.ma = ma;
  this.ten = ten;
  this.gia = gia;
  this.soLuong = soLuong;
  this.danhMuc = danhMuc;
  this.dangBan = dangBan;
}

/* ======================
   Danh sách sản phẩm (nhập tay)
====================== */
const danhSachSanPham = [];

/* ======================
   In tiêu đề cho dễ nhìn
====================== */
function inTieuDe(noiDung) {
 // console.log("\n==============================");
  console.log(noiDung.toUpperCase());
 // console.log("==============================");
}


console.log(`
👉 Thêm sản phẩm:
   themSanPham(1,"iPhone",25000000,10,"Phones",true)

👉 Các hàm xử lý:
   hienThiTenVaGia()
   hienThiSanPhamConHang()
   kiemTraGiaLonHon30Trieu()
   kiemTraAccessoriesDangBan()
   tinhTongGiaTriKho()
   hienThiDanhSachSanPham()
   hienThiThuocTinhSanPham()
   hienThiSanPhamDangBanConHang()
`);

/* ======================
   THÊM SẢN PHẨM
====================== */
function themSanPham(ma, ten, gia, soLuong, danhMuc, dangBan) {
  danhSachSanPham.push(
    new SanPham(ma, ten, gia, soLuong, danhMuc, dangBan)
  );
  console.log(`✅ Đã thêm sản phẩm: ${ten}`);
}

/* ======================
   CÁC HÀM XỬ LÝ (ĐÚNG YÊU CẦU ĐỀ)
====================== */

// Tạo mảng tên & giá
function hienThiTenVaGia() {
  inTieuDe("Danh sách tên và giá sản phẩm");
  console.table(
    danhSachSanPham.map(sp => ({
      "Tên sản phẩm": sp.ten,
      "Giá (VND)": sp.gia
    }))
  );
}

// Lọc sản phẩm còn hàng
function hienThiSanPhamConHang() {
  inTieuDe("Danh sách sản phẩm còn hàng");
  console.table(
    danhSachSanPham.filter(sp => sp.soLuong > 0)
  );
}

// Kiểm tra giá > 30 triệu
function kiemTraGiaLonHon30Trieu() {
  inTieuDe("Kiểm tra sản phẩm có giá > 30.000.000");
  const ketQua = danhSachSanPham.some(sp => sp.gia > 30000000);
  console.log(
    ketQua
      ? "✔ Có ít nhất một sản phẩm giá trên 30.000.000"
      : "✘ Không có sản phẩm nào giá trên 30.000.000"
  );
}

// Kiểm tra Accessories có đang bán
function kiemTraAccessoriesDangBan() {
  inTieuDe("Kiểm tra Accessories có đang bán");
  const ketQua = danhSachSanPham
    .filter(sp => sp.danhMuc === "Accessories")
    .every(sp => sp.dangBan);

  console.log(
    ketQua
      ? "✔ Tất cả sản phẩm Accessories đều đang bán"
      : "✘ Có sản phẩm Accessories đã ngừng bán"
  );
}

// Tính tổng giá trị kho
function tinhTongGiaTriKho() {
  inTieuDe("Tổng giá trị kho");
  const tong = danhSachSanPham.reduce(
    (sum, sp) => sum + sp.gia * sp.soLuong,
    0
  );
  console.log("👉 Tổng giá trị kho:", tong.toLocaleString(), "VND");
}

// Duyệt danh sách (for...of)
function hienThiDanhSachSanPham() {
  inTieuDe("Danh sách toàn bộ sản phẩm");
  for (const sp of danhSachSanPham) {
    console.log(
      `- ${sp.ten} | Danh mục: ${sp.danhMuc} | Trạng thái: ${
        sp.dangBan ? "Đang bán" : "Ngừng bán"
      }`
    );
  }
}

// In thuộc tính sản phẩm (for...in)
function hienThiThuocTinhSanPham() {
  inTieuDe("Thuộc tính của một sản phẩm");
  if (danhSachSanPham.length === 0) {
    console.log("⚠ Chưa có sản phẩm nào");
    return;
  }
  for (const key in danhSachSanPham[0]) {
    console.log(`${key}: ${danhSachSanPham[0][key]}`);
  }
}

// Sản phẩm đang bán & còn hàng
function hienThiSanPhamDangBanConHang() {
  inTieuDe("Sản phẩm đang bán và còn hàng");
  const danhSach = danhSachSanPham
    .filter(sp => sp.dangBan && sp.soLuong > 0)
    .map(sp => sp.ten);

  if (danhSach.length === 0) {
    console.log("⚠ Không có sản phẩm phù hợp");
  } else {
    danhSach.forEach(ten => console.log("- " + ten));
  }
}
