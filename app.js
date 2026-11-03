
const products = [
  ["Cuddledry Baby Diaper","S",48,6,75,24,21,7.6,3.144],
  ["Cuddledry Baby Diaper","M",42,6,72,27,21,7.5,2.995],
  ["Cuddledry Baby Diaper","L",40,6,75,29,21,8,3.152],
  ["Cuddledry Baby Diaper","XL",36,6,69,30,21,8,3.020],

  ["Cuddledry Baby Pull-Up Pants","M",48,6,60,36,28,9,3.373],
  ["Cuddledry Baby Pull-Up Pants","L",42,6,62,34,28,8.5,3.364],
  ["Cuddledry Baby Pull-Up Pants","XL",40,6,63,31,28,8.8,3.254],
  ["Cuddledry Baby Pull-Up Pants","XXL",36,6,66,28,28,8.3,3.043],

  ["Cuddledry Baby Wipes","Giraffe",100,24,43,34,26,18,0.467],
  ["Cuddledry Baby Wipes","Elephant",100,24,43,34,26,18,0.467],
  ["Cuddledry Baby Wipes","Lion",100,24,43,34,26,18,0.467],
  ["Cuddledry Baby Wipes","Zebra",100,24,43,34,26,18,0.467],

  ["Sanitary Pad – Cool Fresh","240mm",10,48,69,31,13,3.9,0.344],
  ["Sanitary Pad – Cool Fresh","290mm",10,48,70.5,32.5,13,4.72,0.398],
  ["Sanitary Pad – Cool Fresh","320mm",8,48,71.5,36.5,13,4.44,0.379],

  ["Menstrual Pants – Cool Fresh","L",10,12,58,36.5,18.5,4.2,1.240],
  ["Menstrual Pants – Cool Fresh","XL",10,12,60.5,37.5,19.5,4.5,1.300],

  ["Sanitary Pad – Anion","160mm",30,48,40,25,22,4.5,0.420],
  ["Sanitary Pad – Anion","180mm",30,48,46,24,29,5.5,0.480],
  ["Sanitary Pad – Anion","240mm",10,48,53,22,25,4.6,0.350],
  ["Sanitary Pad – Anion","290mm",10,48,53,22,29,5.6,0.410],
  ["Sanitary Pad – Anion","340mm",8,48,53,26,25,5.3,0.400],

  ["Medinaps Adult Diaper","M",10,10,85,41,23,7.8,1.710],
  ["Medinaps Adult Diaper","L",10,10,85,42,24,8.8,1.900],
  ["Medinaps Adult Diaper","XL",10,10,85,42,25,9.8,2.100],

  ["Medinaps Adult Pull-up Pants","M",10,10,41,71,18,5.6,1.670],
  ["Medinaps Adult Pull-up Pants","L",10,10,41,71,18.5,6.2,1.850],
  ["Medinaps Adult Pull-up Pants","XL",10,10,41,71,18.5,7.5,2.130],

  ["Medinaps Under Pad","60 × 90",10,10,38,30,19,5.6,1.000]
].map(([category,size,pcsPerPack,packsPerBale,length,width,height,weight,unitPrice], index) => ({
  id:index,
  category,
  size,
  pcsPerPack,
  packsPerBale,
  length,
  width,
  height,
  weight,
  unitPrice,
  cbmPerBale:(length*width*height)/1000000
}));

const categoryImages = {
  "Cuddledry Baby Diaper": {
    src: "https://cuddledrydiaper.com/wp-content/uploads/2026/09/QQ20260910-095334.png",
    alt: "Cuddledry Baby Diaper"
  },
  "Cuddledry Baby Pull-Up Pants": {
    src: "https://cuddledrydiaper.com/wp-content/uploads/2026/09/WechatIMG27336-1-1-1.jpg",
    alt: "Cuddledry Baby Pull-Up Pants"
  },
  "Cuddledry Baby Wipes": {
    src: "https://cuddledrydiaper.com/wp-content/uploads/2026/09/Cuddledry_wipes_4_products_poster_gray_no_title_full.jpg",
    alt: "Cuddledry Baby Wipes"
  },
  "Sanitary Pad – Cool Fresh": {
    src: "https://blysspad.com/wp-content/uploads/2026/05/WechatIMG2295.jpg",
    alt: "Blyss Cool Fresh Sanitary Pad"
  },
  "Menstrual Pants – Cool Fresh": {
    src: "https://blysspad.com/wp-content/uploads/2026/05/WechatIMG2293.jpg",
    alt: "Blyss Cool Fresh Menstrual Pants"
  },
  "Sanitary Pad – Anion": {
    src: "https://blysspad.com/wp-content/uploads/2026/05/WechatIMG2291.jpg",
    alt: "Blyss Anion Sanitary Pad"
  },
  "Medinaps Adult Diaper": {
    src: "assets/medinaps-adult-diaper.png",
    alt: "Medinaps Adult Diaper in M, L and XL"
  },
  "Medinaps Adult Pull-up Pants": {
    src: "https://cuddledrydiaper.com/wp-content/uploads/2026/09/exec-de8b9fcc-2f3f-4599-98a2-82d9f9dd76e6.jpg",
    alt: "Medinaps Adult Pull-up Pants"
  },
  "Medinaps Under Pad": {
    src: "https://cuddledrydiaper.com/wp-content/uploads/2026/09/exec-e9ffb2c1-ded9-4f9d-961e-86e2f298da09.jpg",
    alt: "Medinaps Under Pad"
  }
};

const state = { quantities: {} };
const $ = (selector) => document.querySelector(selector);

const money = new Intl.NumberFormat("en-US", {
  style:"currency",
  currency:"USD"
});

const unitPriceMoney = new Intl.NumberFormat("en-US", {
  style:"currency",
  currency:"USD",
  minimumFractionDigits:3,
  maximumFractionDigits:3
});

const number = new Intl.NumberFormat("en-US");
const categoryFilter = $("#categoryFilter");

function populateCategories(){
  [...new Set(products.map(p => p.category))].forEach(category =>
    categoryFilter.add(new Option(category, category))
  );
}

function filteredProducts(){
  const term = $("#search").value.trim().toLowerCase();
  const category = categoryFilter.value;
  return products.filter(p =>
    (category === "all" || p.category === category) &&
    `${p.category} ${p.size}`.toLowerCase().includes(term)
  );
}

function renderProducts(){
  const list = $("#productList");
  const visible = filteredProducts();

  if (!visible.length) {
    list.innerHTML = '<p class="empty-row">No products match your search.</p>';
    return;
  }

  const grouped = Object.groupBy(visible, p => p.category);

  list.innerHTML = Object.entries(grouped).map(([category, items]) => {
    const image = categoryImages[category];
    return `<article class="product-group">
      <div class="group-title">
        <div style="display:flex;align-items:center;gap:14px">
          <img src="${image.src}" alt="${image.alt}" loading="lazy"
               style="width:58px;height:58px;object-fit:cover;border:1px solid #d8ded7;background:#fff" />
          <h3>${category}</h3>
        </div>
        <span>${items.length} size${items.length > 1 ? "s" : ""}</span>
      </div>
      ${items.map(p => productRow(p)).join("")}
    </article>`;
  }).join("");

  list.querySelectorAll("[data-quantity]").forEach(input => {
    input.addEventListener("input", event =>
      updateQuantity(+event.target.dataset.quantity, event.target.value)
    );
    input.addEventListener("change", event =>
      updateQuantity(+event.target.dataset.quantity, event.target.value)
    );
  });
}

function productRow(p){
  const quantity = state.quantities[p.id] || 0;

  return `<div class="product-row">
    <div class="product-name">
      <strong>${p.size}</strong>
      <small>${p.pcsPerPack} pcs / pack · ${p.weight} kg / bale</small>
    </div>
    <div class="data-cell">
      <b>${p.packsPerBale}</b>
      <small>packs / bale</small>
    </div>
    <div class="data-cell data-cbm">
      <b>${p.cbmPerBale.toFixed(3)}</b>
      <small>CBM / bale</small>
    </div>
    <div class="data-cell data-price">
      <b>${unitPriceMoney.format(p.unitPrice)}</b>
      <small>per pack</small>
    </div>
    <div class="quantity" aria-label="Quantity in bales" style="width:92px">
      <input data-quantity="${p.id}" type="number" min="0" step="1"
             value="${quantity}"
             aria-label="Bales of ${p.category} ${p.size}"
             style="width:100%;padding:8px;text-align:center" />
    </div>
  </div>`;
}

function updateQuantity(id, value){
  const quantity = Math.max(0, Math.floor(Number(value) || 0));

  if (quantity) {
    state.quantities[id] = quantity;
  } else {
    delete state.quantities[id];
  }

  renderProducts();
  renderQuote();
}

function selectedItems(){
  return products
    .filter(p => state.quantities[p.id])
    .map(p => ({...p, bales:state.quantities[p.id]}));
}

function renderQuote(){
  const items = selectedItems();

  $("#quoteItems").innerHTML = items.length
    ? items.map(p => {
        const packs = p.bales * p.packsPerBale;
        const cbm = p.bales * p.cbmPerBale;
        const amount = packs * p.unitPrice;
        const image = categoryImages[p.category];

        return `<tr>
          <td>
            <div style="display:flex;align-items:center;gap:8px">
              <img src="${image.src}" alt="${image.alt}"
                   style="width:38px;height:38px;object-fit:cover;border:1px solid #d8ded7;background:#fff" />
              <span>
                <b>${p.category}</b><br>
                <small>${p.size}</small>
              </span>
            </div>
          </td>
          <td>${p.pcsPerPack} pcs</td>
          <td>${number.format(p.bales)}</td>
          <td>${number.format(packs)}</td>
          <td>${unitPriceMoney.format(p.unitPrice)}</td>
          <td>${cbm.toFixed(3)}</td>
          <td>${money.format(amount)}</td>
          <td>
            <button class="remove-item" data-remove="${p.id}"
                    aria-label="Remove ${p.category} ${p.size}">×</button>
          </td>
        </tr>`;
      }).join("")
    : '<tr class="empty-row"><td colspan="8">Your selected products will appear here.</td></tr>';

  const totals = items.reduce((sum,p) => ({
    bales: sum.bales + p.bales,
    packs: sum.packs + p.bales*p.packsPerBale,
    cbm: sum.cbm + p.bales*p.cbmPerBale,
    price: sum.price + p.bales*p.packsPerBale*p.unitPrice
  }), {
    bales:0,
    packs:0,
    cbm:0,
    price:0
  });

  $("#totalBales").textContent = number.format(totals.bales);
  $("#totalPacks").textContent = number.format(totals.packs);
  $("#totalCbm").textContent = totals.cbm.toFixed(3);
  $("#totalPrice").textContent = money.format(totals.price);

  $("#quoteItems").querySelectorAll("[data-remove]").forEach(button =>
    button.addEventListener("click", () =>
      updateQuantity(+button.dataset.remove,0)
    )
  );
}

function renderCustomer(){
  const name = $("#buyerName").value.trim();
  const contact = $("#contactName").value.trim();
  const email = $("#email").value.trim();
  const destination = $("#destination").value.trim();
  const ref = $("#quoteRef").value.trim();
  const date = $("#quoteDate").value;

  $("#displayRef").textContent = ref || (date ? `Quote · ${date}` : "");

  $("#quoteCustomer").innerHTML =
    name || contact || email || destination
      ? `<b>${name || contact}</b>
         ${contact && name ? `<br>${contact}` : ""}
         ${email ? `<br>${email}` : ""}
         ${destination ? `<br>Destination: ${destination}` : ""}`
      : "Add your buyer details above to personalize this quotation.";
}

function downloadCsv(){
  const rows = [
    ["Agree (Fujian) Sanitary Products Co., Ltd Product Quotation"],
    ["Buyer",$("#buyerName").value],
    ["Contact",$("#contactName").value],
    ["Email",$("#email").value],
    ["Destination",$("#destination").value],
    ["Reference",$("#quoteRef").value],
    [],
    [
      "Product line",
      "Size",
      "Pieces per pack",
      "Packs per bale",
      "Bales",
      "Packs",
      "CBM",
      "Unit price (USD)",
      "Amount (USD)"
    ]
  ];

  selectedItems().forEach(p => rows.push([
    p.category,
    p.size,
    p.pcsPerPack,
    p.packsPerBale,
    p.bales,
    p.bales*p.packsPerBale,
    p.bales*p.cbmPerBale,
    p.unitPrice,
    p.bales*p.packsPerBale*p.unitPrice
  ]));

  const csv = rows.map(row =>
    row.map(value =>
      `"${String(value ?? "").replaceAll('"','""')}"`
    ).join(",")
  ).join("\n");

  const url = URL.createObjectURL(
    new Blob([csv],{type:"text/csv;charset=utf-8"})
  );

  const link = document.createElement("a");
  link.href = url;
  link.download =
    `Agree-Fujian-quotation-${$("#quoteRef").value.trim() || "draft"}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}

$("#quoteDate").value = new Date().toISOString().slice(0,10);
$("#year").textContent = new Date().getFullYear();

populateCategories();
renderProducts();
renderQuote();
renderCustomer();

$("#search").addEventListener("input",renderProducts);
categoryFilter.addEventListener("change",renderProducts);

document.querySelectorAll(".details-grid input").forEach(input =>
  input.addEventListener("input",renderCustomer)
);

$("#printQuote").addEventListener("click",()=>window.print());
$("#downloadCsv").addEventListener("click",downloadCsv);

$("#clearQuote").addEventListener("click",()=>{
  state.quantities = {};
  renderProducts();
  renderQuote();
});
