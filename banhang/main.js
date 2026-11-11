// ===== CẤU HÌNH ZALO =====
const ZALO_PHONE = "0398069447"; // 👈 thay bằng số Zalo thật của bạn

// ===== DỮ LIỆU SẢN PHẨM =====
const products = [
  {
    id: 1,
    name: "Vivo X90 Pro Plus",
    brand: "Vivo",
    price: 15990000,
    condition: 99,
    imei: "356789101234561",
    warranty: "3 tháng",
    international: false,
    note: "Full box, nguyên zin",
    images: [
      "https://picsum.photos/seed/vivo-x90-1/600/600",
      "https://picsum.photos/seed/vivo-x90-2/600/600",
      "https://picsum.photos/seed/vivo-x90-3/600/600",
      "https://picsum.photos/seed/vivo-x90-4/600/600"
    ]
  },
  {
    id: 2,
    name: "Huawei P60 Pro",
    brand: "Huawei",
    price: 13490000,
    condition: 98,
    imei: "356789101234562",
    warranty: "3 tháng",
    international: true,
    note: "Bản quốc tế, thiếu Google",
    images: [
      "https://picsum.photos/seed/huawei-p60-1/600/600",
      "https://picsum.photos/seed/huawei-p60-2/600/600",
      "https://picsum.photos/seed/huawei-p60-3/600/600",
      "https://picsum.photos/seed/huawei-p60-4/600/600"
    ]
  },
  {
    id: 3,
    name: "Xiaomi 13 Ultra",
    brand: "Xiaomi",
    price: 17290000,
    condition: 99,
    imei: "356789101234563",
    warranty: "3 tháng",
    international: false,
    note: "Full box, cáp zin",
    images: [
      "https://picsum.photos/seed/xiaomi-13u-1/600/600",
      "https://picsum.photos/seed/xiaomi-13u-2/600/600",
      "https://picsum.photos/seed/xiaomi-13u-3/600/600",
      "https://picsum.photos/seed/xiaomi-13u-4/600/600"
    ]
  },
  {
    id: 4,
    name: "Honor Magic5 Pro",
    brand: "Honor",
    price: 11990000,
    condition: 97,
    imei: "356789101234564",
    warranty: "3 tháng",
    international: false,
    note: "Màn hình xước nhẹ",
    images: [
      "https://picsum.photos/seed/honor-m5p-1/600/600",
      "https://picsum.photos/seed/honor-m5p-2/600/600",
      "https://picsum.photos/seed/honor-m5p-3/600/600",
      "https://picsum.photos/seed/honor-m5p-4/600/600"
    ]
  },
  {
    id: 5,
    name: "Oppo Find X6 Pro",
    brand: "Oppo",
    price: 14890000,
    condition: 99,
    imei: "356789101234565",
    warranty: "3 tháng",
    international: false,
    note: "Full box",
    images: [
      "https://picsum.photos/seed/oppo-x6p-1/600/600",
      "https://picsum.photos/seed/oppo-x6p-2/600/600",
      "https://picsum.photos/seed/oppo-x6p-3/600/600",
      "https://picsum.photos/seed/oppo-x6p-4/600/600"
    ]
  },
  {
    id: 6,
    name: "Vivo X100 Pro",
    brand: "Vivo",
    price: 18990000,
    condition: 99,
    imei: "356789101234566",
    warranty: "3 tháng",
    international: false,
    note: "Full box, mới 99%",
    images: [
      "https://picsum.photos/seed/vivo-x100p-1/600/600",
      "https://picsum.photos/seed/vivo-x100p-2/600/600",
      "https://picsum.photos/seed/vivo-x100p-3/600/600",
      "https://picsum.photos/seed/vivo-x100p-4/600/600"
    ]
  },
  {
    id: 7,
    name: "Xiaomi 14 Pro",
    brand: "Xiaomi",
    price: 16490000,
    condition: 98,
    imei: "356789101234567",
    warranty: "3 tháng",
    international: true,
    note: "Bản nội địa Trung",
    images: [
      "https://picsum.photos/seed/xiaomi-14p-1/600/600",
      "https://picsum.photos/seed/xiaomi-14p-2/600/600",
      "https://picsum.photos/seed/xiaomi-14p-3/600/600",
      "https://picsum.photos/seed/xiaomi-14p-4/600/600"
    ]
  },
  {
    id: 8,
    name: "Huawei Mate 60 Pro",
    brand: "Huawei",
    price: 19990000,
    condition: 99,
    imei: "356789101234568",
    warranty: "3 tháng",
    international: false,
    note: "Full box, cực hiếm",
    images: [
      "https://picsum.photos/seed/huawei-m60p-1/600/600",
      "https://picsum.photos/seed/huawei-m60p-2/600/600",
      "https://picsum.photos/seed/huawei-m60p-3/600/600",
      "https://picsum.photos/seed/huawei-m60p-4/600/600"
    ]
  }
];

// ===== DOM ELEMENTS =====
const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("search");
const brandFilter = document.getElementById("brandFilter");
const sortFilter = document.getElementById("sortFilter");
const resultCount = document.getElementById("resultCount");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

// ===== HELPER: ĐỊNH DẠNG GIÁ =====
function formatPrice(n) {
  return n.toLocaleString("vi-VN") + " ₫";
}

// ===== HELPER: LẤY DANH SÁCH ẢNH =====
// Nếu sản phẩm có field `images` thì dùng, ngược lại sinh ảnh placeholder
function getImages(p) {
  if (p.images && p.images.length > 0) return p.images;
  return Array.from({ length: 4 }, (_, i) =>
    `https://picsum.photos/seed/phone-${p.id}-${i + 1}/600/600`
  );
}

// ===== RENDER SẢN PHẨM =====
function renderProducts(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#888;padding:40px 0;">
      Không tìm thấy sản phẩm phù hợp.
    </p>`;
    resultCount.textContent = "";
    return;
  }

  resultCount.textContent = `Hiển thị ${list.length} sản phẩm`;

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    const firstImage = getImages(p)[0];

    card.innerHTML = `
      <div class="product-thumb">
        <img src="${firstImage}" alt="${p.name}" loading="lazy">
        <span class="badge">${p.condition}%</span>
        ${p.international ? '<span class="badge intl">Quốc tế</span>' : ""}
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-meta">IMEI: ${p.imei}</div>
        <div class="product-meta">BH: ${p.warranty}</div>
        <div class="product-price">${formatPrice(p.price)}</div>
        <div class="product-actions">
          <button class="btn btn-primary" data-action="detail" data-id="${p.id}">Chi tiết</button>
          <button class="btn btn-zalo" data-action="buy" data-id="${p.id}">💬 Chat Zalo</button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ===== LỌC & SẮP XẾP =====
function applyFilters() {
  let list = [...products];

  const keyword = searchInput.value.trim().toLowerCase();
  if (keyword) {
    list = list.filter(p => p.name.toLowerCase().includes(keyword));
  }

  if (brandFilter.value !== "all") {
    list = list.filter(p => p.brand === brandFilter.value);
  }

  switch (sortFilter.value) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "condition-desc":
      list.sort((a, b) => b.condition - a.condition);
      break;
  }

  renderProducts(list);
}

// ===== XỬ LÝ SỰ KIỆN: NÚT TRONG CARD =====
grid.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const product = products.find(p => p.id === id);
  if (!product) return;

  if (btn.dataset.action === "detail") {
    openModal(product);
  } else if (btn.dataset.action === "buy") {
    handleBuy(product);
  }
});

// ===== MỞ MODAL CHI TIẾT + GALLERY =====
function openModal(p) {
  const images = getImages(p);

  modalBody.innerHTML = `
    <h2>${p.name}</h2>

    <div class="gallery">
      <div class="gallery-main">
        <img id="modalMainImage" src="${images[0]}" alt="${p.name}">
      </div>
      <div class="gallery-thumbs">
        ${images.map((src, i) => `
          <img src="${src}"
               alt="${p.name} - ảnh ${i + 1}"
               class="thumb ${i === 0 ? "active" : ""}"
               data-index="${i}">
        `).join("")}
      </div>
    </div>

    <div class="modal-row"><span>Hãng</span><strong>${p.brand}</strong></div>
    <div class="modal-row"><span>Tình trạng</span><strong>${p.condition}%</strong></div>
    <div class="modal-row"><span>IMEI</span><strong>${p.imei}</strong></div>
    <div class="modal-row"><span>Bảo hành</span><strong>${p.warranty}</strong></div>
    <div class="modal-row"><span>Xuất xứ</span><strong>${p.international ? "Quốc tế" : "Chính hãng"}</strong></div>
    <div class="modal-row"><span>Ghi chú</span><strong>${p.note}</strong></div>

    <div class="modal-price">${formatPrice(p.price)}</div>

    <button class="btn btn-zalo" style="width:100%;padding:12px;"
            onclick="handleBuyFromModal(${p.id})">
      💬 Chat Zalo để đặt mua
    </button>
  `;

  // ===== GẮN SỰ KIỆN CHUYỂN ẢNH =====
  const mainImg = document.getElementById("modalMainImage");
  const thumbs = modalBody.querySelectorAll(".gallery-thumbs img");

  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      mainImg.src = thumb.src;
      thumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });

  modal.classList.add("open");
}

// ===== ĐÓNG MODAL =====
function closeModal() {
  modal.classList.remove("open");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// ===== ĐIỀU HƯỚNG ZALO =====
function handleBuy(p) {
  const message = encodeURIComponent(
    `Xin chào, tôi muốn đặt mua:\n` +
    `📱 ${p.name}\n` +
    `💰 Giá: ${formatPrice(p.price)}\n` +
    `🔑 IMEI: ${p.imei}\n` +
    `Tình trạng: ${p.condition}%`
  );

  const zaloUrl = `https://zalo.me/${ZALO_PHONE}?text=${message}`;
  window.open(zaloUrl, "_blank");
}

// ===== HÀM TOÀN CỤC CHO NÚT TRONG MODAL =====
window.handleBuyFromModal = function (id) {
  const p = products.find(x => x.id === id);
  if (p) {
    closeModal();
    handleBuy(p);
  }
};

// ===== PHÍM MŨI TÊN ← → CHUYỂN ẢNH TRONG MODAL =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    return;
  }

  if (!modal.classList.contains("open")) return;

  const thumbs = modalBody.querySelectorAll(".gallery-thumbs img");
  const mainImg = document.getElementById("modalMainImage");
  if (!mainImg || thumbs.length === 0) return;

  const current = [...thumbs].findIndex(t => t.classList.contains("active"));
  let next = current;

  if (e.key === "ArrowRight") next = (current + 1) % thumbs.length;
  if (e.key === "ArrowLeft")  next = (current - 1 + thumbs.length) % thumbs.length;

  if (next !== current) {
    mainImg.src = thumbs[next].src;
    thumbs.forEach(t => t.classList.remove("active"));
    thumbs[next].classList.add("active");
  }
});

// ===== GẮN SỰ KIỆN FILTER =====
searchInput.addEventListener("input", applyFilters);
brandFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);

// ===== KHỞI CHẠY =====
applyFilters();