
// ===== DOM and browser storage =====
function $(selector) { return document.querySelector(selector); }

// Save JavaScript values as JSON so they can be loaded again after a refresh.
const DB = {
  get: function (key, defaultValue) {
    try {
      const savedValue = localStorage.getItem(key);
      return JSON.parse(savedValue) ?? defaultValue;
    } catch (error) {
      return defaultValue;
    }
  },

  set: function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

function money(amount) { return Number(amount).toLocaleString('vi-VN'); }

// Lấy ngày hôm nay theo giờ máy (dạng yyyy-mm-dd). Không dùng toISOString vì nó trả về giờ UTC, bị lệch 7 tiếng ở Việt Nam.
function today() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return now.getFullYear() + '-' + month + '-' + day;
}

const NEW = 'new';
const CANCELLED = 'cancelled';

// Bảng đổi mã tình trạng sang chữ tiếng Việt (dùng được ở cả trang khách lẫn trang admin)
const STATUS_TEXT = { new: 'Mới đặt', processed: 'Đã xử lý', delivered: 'Đã giao', cancelled: 'Hủy' };

function statusLabel(statusCode) {
  return STATUS_TEXT[statusCode] || statusCode;
}

// ===== Sample data used on the first visit =====
// Change this data to change the products that appear for a brand-new browser.
// Existing browser data is kept in localStorage and is not overwritten.
const SEED_DATA = {
  types: [
    { id: 1, name: 'Nhẫn', margin: 30, hidden: false },
    { id: 2, name: 'Dây chuyền', margin: 25, hidden: false },
    { id: 3, name: 'Bông tai', margin: 20, hidden: false }
  ],
  products: [
    { code: 'N01', name: 'Nhẫn bạc đính đá', type: 1, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/N01.png', margin: null, hidden: false },
    { code: 'N02', name: 'Nhẫn vàng 18K trơn', type: 1, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/N02.png', margin: null, hidden: false },
    { code: 'N03', name: 'Nhẫn đôi bạc', type: 1, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/N03.png', margin: null, hidden: false },
    { code: 'N04', name: 'Nhẫn ruby đỏ', type: 1, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/N04.png', margin: null, hidden: false },
    { code: 'N05', name: 'Nhẫn bạc khắc tên', type: 1, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/N05.png', margin: null, hidden: false },
    { code: 'N06', name: 'Nhẫn vàng đính CZ', type: 1, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/N06.png', margin: null, hidden: false },
    { code: 'N07', name: 'Nhẫn xoắn bạc', type: 1, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/N07.png', margin: null, hidden: false },
    { code: 'N08', name: 'Nhẫn ngọc trai', type: 1, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/N08.png', margin: null, hidden: false },
    { code: 'D01', name: 'Dây chuyền bạc mặt tim', type: 2, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/D01.png', margin: null, hidden: false },
    { code: 'D02', name: 'Dây chuyền vàng 18K', type: 2, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/D02.png', margin: null, hidden: false },
    { code: 'D03', name: 'Dây chuyền bạc mặt trăng', type: 2, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/D03.png', margin: null, hidden: false },
    { code: 'D04', name: 'Dây chuyền ngọc trai', type: 2, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/D04.png', margin: null, hidden: false },
    { code: 'D05', name: 'Dây chuyền bạc cỏ 4 lá', type: 2, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/D05.png', margin: null, hidden: false },
    { code: 'D06', name: 'Dây chuyền vàng mặt tròn', type: 2, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/D06.png', margin: null, hidden: false },
    { code: 'D07', name: 'Dây chuyền đá xanh', type: 2, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/D07.png', margin: null, hidden: false },
    { code: 'D08', name: 'Dây chuyền bạc đôi', type: 2, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/D08.png', margin: null, hidden: false },
    { code: 'B01', name: 'Bông tai ngọc trai', type: 3, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/B01.png', margin: null, hidden: false },
    { code: 'B02', name: 'Bông tai bạc tròn', type: 3, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/B02.png', margin: null, hidden: false },
    { code: 'B03', name: 'Bông tai vàng 18K', type: 3, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/B03.png', margin: null, hidden: false },
    { code: 'B04', name: 'Bông tai giọt nước', type: 3, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/B04.png', margin: null, hidden: false },
    { code: 'B05', name: 'Bông tai bạc hình sao', type: 3, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/B05.png', margin: null, hidden: false },
    { code: 'B06', name: 'Bông tai đính đá', type: 3, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/B06.png', margin: null, hidden: false },
    { code: 'B07', name: 'Bông tai khuyên vàng', type: 3, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/B07.png', margin: null, hidden: false },
    { code: 'B08', name: 'Bông tai bạc dài', type: 3, desc: 'Chất liệu bạc 925 hoặc vàng 18K, thiết kế tinh tế, bảo hành 6 tháng.', img: 'image/B08.png', margin: null, hidden: false }
  ],
  imports: [
    {
      date: null,
      lines: [
        { code: 'N01', cost: 400000, qty: 10 },
        { code: 'N02', cost: 460000, qty: 12 },
        { code: 'N03', cost: 520000, qty: 14 },
        { code: 'N04', cost: 580000, qty: 16 },
        { code: 'N05', cost: 640000, qty: 18 },
        { code: 'N06', cost: 700000, qty: 20 },
        { code: 'N07', cost: 760000, qty: 22 },
        { code: 'N08', cost: 820000, qty: 24 },
        { code: 'D01', cost: 350000, qty: 10 },
        { code: 'D02', cost: 410000, qty: 3 },
        { code: 'D03', cost: 470000, qty: 14 },
        { code: 'D04', cost: 530000, qty: 16 },
        { code: 'D05', cost: 590000, qty: 18 },
        { code: 'D06', cost: 650000, qty: 20 },
        { code: 'D07', cost: 710000, qty: 22 },
        { code: 'D08', cost: 770000, qty: 24 },
        { code: 'B01', cost: 200000, qty: 10 },
        { code: 'B02', cost: 260000, qty: 12 },
        { code: 'B03', cost: 320000, qty: 14 },
        { code: 'B04', cost: 380000, qty: 16 },
        { code: 'B05', cost: 440000, qty: 18 },
        { code: 'B06', cost: 500000, qty: 20 },
        { code: 'B07', cost: 560000, qty: 22 },
        { code: 'B08', cost: 620000, qty: 24 }
      ]
    }
  ]
};

const SEED_FLAG = 'seedV4';
if (!DB.get(SEED_FLAG, false)) {
  DB.set('types', SEED_DATA.types);
  DB.set('products', SEED_DATA.products);

  const firstImports = SEED_DATA.imports.map(function (importData, index) {
    return {
      id: index + 1,
      date: importData.date || today(),
      done: true,
      lines: importData.lines
    };
  });

  DB.set('imports', firstImports);
  // Tài khoản khách mẫu: khach1 / 123456 (để thầy thấy danh sách khách và đơn hàng ngay)
  DB.set('users', [{ username: 'khach1', password: '123456', fullname: 'Nguyễn Văn A', address: '12 Lê Lợi, Quận 1, TP.HCM', phone: '0901234567', locked: false }]);
  DB.set('orders', [{ id: 1, user: 'khach1', date: today(), items: [{ code: 'N01', name: 'Nhẫn bạc đính đá', qty: 1, price: 520000 }], addr: '12 Lê Lợi, Quận 1, TP.HCM', pay: 'Tiền mặt khi nhận hàng', status: 'new', total: 520000 }]);
  DB.set(SEED_FLAG, 1);
}

function types() { return DB.get('types', []); }

function prods() { return DB.get('products', []); }

function typeName(typeId) {
  const productType = types().find(function (type) { return type.id == typeId; });
  return productType ? productType.name : '';
}

function nameOf(productCode) {
  const product = prods().find(function (item) { return item.code === productCode; });
  return product ? product.name : productCode;
}

// Calculate the average purchase cost for a product.
function costOf(productCode) {
  let totalCost = 0;
  let totalQuantity = 0;

  DB.get('imports', []).filter(function (item) { return item.done; }).forEach(function (importData) {
    importData.lines.forEach(function (line) {
      if (line.code !== productCode) return;
      totalCost += line.cost * line.qty;
      totalQuantity += line.qty;
    });
  });

  return totalQuantity ? Math.round(totalCost / totalQuantity) : 0;
}

function marginOf(product) {
  const productType = types().find(function (type) { return type.id == product.type; });
  return product.margin ?? (productType ? productType.margin : 0);
}

function priceOf(product) { return Math.round(costOf(product.code) * (1 + marginOf(product) / 100)); }

// Calculate stock movement for a product within a date range.
function flow(productCode, fromDate, toDate) {
  let openingStock = 0;
  let incomingQuantity = 0;
  let outgoingQuantity = 0;

  DB.get('imports', []).filter(function (item) { return item.done; }).forEach(function (importData) {
    importData.lines.forEach(function (line) {
      if (line.code !== productCode) return;

      if (importData.date < fromDate) {
        openingStock += line.qty;
      } else if (importData.date <= toDate) incomingQuantity += line.qty;
    });
  });

  DB.get('orders', []).filter(function (order) { return order.status !== CANCELLED; }).forEach(function (order) {
    order.items.forEach(function (line) {
      if (line.code !== productCode) return;

      if (order.date < fromDate) {
        openingStock -= line.qty;
      } else if (order.date <= toDate) outgoingQuantity += line.qty;
    });
  });

  return { open: openingStock, inn: incomingQuantity, out: outgoingQuantity,
    close: openingStock + incomingQuantity - outgoingQuantity };
}

function stockAt(productCode, date) { return flow(productCode, '0000-00-00', date).close; }
function stockNow(productCode) { return stockAt(productCode, today()); }

function orderRow(order) {
  return {
    ...order,
    statusText: statusLabel(order.status),
    totalFmt: money(order.total),
    items: order.items.map(function (item) { return { name: item.name, priceFmt: money(item.price), qty: item.qty, amountFmt: money(item.price * item.qty) }; })
  };
}

// ===== HTML templates and display helpers =====
const act = {};

// Fill a normal element with values from an object. Elements created from a
// template are skipped so their values are not overwritten by an outer row.
function isGeneratedElement(element, root) {
  const generatedRow = element.closest('[data-gen]');
  return generatedRow && generatedRow !== root && root.contains(generatedRow);
}

function getElementsOutsideGeneratedRows(root, selector) {
  const elements = Array.from(root.querySelectorAll(selector));
  if (root.matches(selector)) elements.push(root);
  return elements.filter(function (element) { return !isGeneratedElement(element, root); });
}

function fill(root, row) {
  getElementsOutsideGeneratedRows(root, '[data-bind]').forEach(function (element) {
    element.dataset.bind.split(';').forEach(function (binding) {
      const [property, field] = binding.split(':').map(function (part) { return part.trim(); });
      if (!(field in row)) return;
      if (property in element) element[property] = row[field];
      else element.setAttribute(property, row[field]);
    });
  });

  getElementsOutsideGeneratedRows(root, '[data-if]').forEach(function (element) {
    const field = element.getAttribute('data-if');
    if (field in row) element.hidden = !row[field];
  });

  getElementsOutsideGeneratedRows(root, '[data-ifnot]').forEach(function (element) {
    const field = element.getAttribute('data-ifnot');
    if (field in row) element.hidden = Boolean(row[field]);
  });

  getElementsOutsideGeneratedRows(root, '[data-rows]').forEach(function (element) {
    list(element, row[element.dataset.rows] || []);
  });
}

function list(element, rows) {
  element.querySelectorAll(':scope > [data-gen]').forEach(function (row) { row.remove(); });

  const template = element.dataset.tpl
    ? document.getElementById(element.dataset.tpl)
    : element.querySelector(':scope > template');

  rows.forEach(function (row) {
    const fragment = template.content.cloneNode(true);
    Array.from(fragment.children).forEach(function (child) {
      fill(child, row);
      child.dataset.gen = '1';
    });

    element.append(fragment);
  });
}

// Show one view and hide the sibling views in the same page area.
function show(boxSelector, viewId) {
  document.querySelectorAll(boxSelector + ' > .view').forEach(function (view) {
    view.classList.toggle('on', view.id === viewId);
  });
}

function T(key, variables) {
  if (!variables) {
    variables = {};
  }

  const message = $('#texts [data-key="' + key + '"]');
  let text = message ? message.textContent.trim() : key;

  return text.replace(/\{(\w+)\}/g, function (match, variableName) { return variables[variableName] ?? ''; });
}

let toastTimer;

function notify(key, variables) {
  const toast = $('#toast');
  if (!toast) {
    return;
  }

  toast.textContent = T(key, variables);
  toast.hidden = false;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.hidden = true;
  }, 3500);
}

function say(selector, key, isSuccess) {
  const message = $(selector);
  if (!message) {
    return;
  }

  message.textContent = T(key);
  message.dataset.state = isSuccess ? 'success' : 'error';
}

// These listeners are shared by both pages. The data-* attributes in the
// HTML choose which function in act runs for each click, form or field change.
document.addEventListener('click', function (event) {
  const element = event.target.closest('[data-act]');
  if (!element) {
    return;
  }

  event.preventDefault();

  const action = act[element.dataset.act];
  if (action) {
    action(element.dataset.arg, element);
  }
});

document.addEventListener('submit', function (event) {
  const form = event.target.closest('[data-submit]');
  if (!form) {
    return;
  }

  event.preventDefault();

  const action = act[form.dataset.submit];
  if (action) {
    action(Object.fromEntries(new FormData(form)), form);
  }
});

document.addEventListener('change', function (event) {
  const element = event.target.closest('[data-change]');
  if (!element) {
    return;
  }

  const action = act[element.dataset.change];
  if (action) {
    action(element.value, element);
  }
});

// ===== Storefront =====
const PRODUCTS_PER_PAGE = 4;
let me = null;
let searchQuery = {
  name: '',
  type: '',
  min: '',
  max: ''
};

function user() {
  return DB.get('users', []).find(function (savedUser) { return savedUser.username === me; });
}

function getCart() { return DB.get('cart_' + me, []); }

function live() {
  return prods().filter(function (product) {
    const productType = types().find(function (type) { return type.id == product.type; });

    return !product.hidden && !(productType && productType.hidden);
  });
}

function cardRow(product) {
  const price = priceOf(product);
  const remainingStock = stockNow(product.code);

  return {
    link: '#detail:' + product.code,
    img: product.img,
    hasImg: Boolean(product.img),
    noImg: !product.img,
    name: product.name,
    code: product.code,
    price: money(price),
    hasPrice: price > 0,
    soldOut: remainingStock <= 0,
    cannotBuy: !(price && remainingStock)
  };
}

function showGrid(viewSelector, items, page, baseLink) {
  page = Number(page) || 1;

  const pageCount = Math.ceil(items.length / PRODUCTS_PER_PAGE) || 1;
  const firstItem = (page - 1) * PRODUCTS_PER_PAGE;
  const pageItems = items.slice(firstItem, firstItem + PRODUCTS_PER_PAGE);
  const pageButtons = [];

  for (let index = 0; index < pageCount; index += 1) {
    const pageNumber = index + 1;
    pageButtons.push({
      link: '#' + baseLink + ':' + pageNumber,
      n: pageNumber,
      cls: pageNumber === page ? 'on' : ''
    });
  }

  list($(viewSelector + ' .products'), pageItems.map(cardRow));
  list($(viewSelector + ' .pager'), pageButtons);
  fill($(viewSelector), { hasItems: items.length > 0 });
}

function refreshNav() {
  const currentUser = user();
  document.body.dataset.login = currentUser ? 'in' : 'out';

  const cartCount = me
    ? getCart().reduce(function (total, item) { return total + item.qty; }, 0)
    : 0;

  fill($('#nav'), {
    userName: currentUser ? currentUser.fullname : '',
    cartCount: cartCount
  });

  const visibleTypes = types().filter(function (type) { return !type.hidden; }).map(function (type) {
    return {
      link: '#list:' + type.id + ':1',
      name: type.name
    };
  });

  list($('#typeNav'), visibleTypes);
  $('#nav').classList.remove('open');
}

function route() {
  if (!$('#app') || document.body.dataset.mode === 'admin') {
    return;
  }

  me = DB.get('me', null);

  const currentUser = user();
  if (currentUser && currentUser.locked) {
    DB.set('me', null);
    me = null;
    notify('locked');
  }

  refreshNav();

  // Split a URL such as #list:2:1 into the page name and its arguments.
  const routeParts = location.hash.slice(1).split(':');
  const viewName = routeParts[0];
  const firstArgument = routeParts[1];
  const secondArgument = routeParts[2];
  const routes = {
    home: vHome,
    list: vList,
    detail: vDetail,
    search: vSearch,
    cart: vCart,
    checkout: vCheckout,
    orders: vOrders,
    profile: vProfile
  };
  const routeFunction = routes[viewName] || vHome;

  routeFunction(firstArgument, secondArgument);
}

window.onhashchange = route;

act.toggleMenu = function () {
  $('#nav').classList.toggle('open');
};

act.setMode = function (mode) {
  document.body.dataset.mode = mode;

  if (mode === 'admin') {
    showPanel();
  } else {
    route();
  }
};

function needLogin() {
  if (me) {
    return false;
  }

  act.openAuth();
  vHome();
  return true;
}

function vHome() {
  show('#app', 'v-home');

  const latestProducts = live().slice(-4).reverse();
  list($('#homeGrid'), latestProducts.map(cardRow));
}

function vList(typeId, page) {
  show('#app', 'v-list');
  fill($('#v-list'), { title: typeName(typeId) });

  const productsInType = live().filter(function (product) { return product.type == typeId; });

  showGrid('#v-list', productsInType, page, 'list:' + typeId);
}

function vDetail(productCode) {
  const product = prods().find(function (item) { return item.code === productCode; });

  if (!product) {
    vHome();
    return;
  }

  show('#app', 'v-detail');

  const price = priceOf(product);
  const remainingStock = stockNow(productCode);
  fill($('#v-detail'), {
    img: product.img,
    hasImg: Boolean(product.img),
    noImg: !product.img,
    name: product.name,
    code: productCode,
    typeName: typeName(product.type),
    price: money(price),
    hasPrice: price > 0,
    left: remainingStock,
    desc: product.desc,
    cannotBuy: !(price && remainingStock)
  });

  $('#dq').value = 1;
}

function vSearch(page) {
  show('#app', 'v-search');

  const visibleTypes = types().filter(function (type) { return !type.hidden; }).map(function (type) {
    return {
      value: type.id,
      text: type.name
    };
  });

  list($('#searchType'), visibleTypes);
  fill($('#v-search'), searchQuery);

  const matchingProducts = live().filter(function (product) {
    const matchesName = !searchQuery.name ||
      product.name.toLowerCase().includes(searchQuery.name.toLowerCase());
    const matchesType = !searchQuery.type || product.type == searchQuery.type;
    const matchesMinimum = !searchQuery.min || priceOf(product) >= Number(searchQuery.min);
    const matchesMaximum = !searchQuery.max || priceOf(product) <= Number(searchQuery.max);

    return matchesName && matchesType && matchesMinimum && matchesMaximum;
  });

  showGrid('#v-search', matchingProducts, page, 'search');
}

act.doSearch = function (data) {
  searchQuery = {
    name: data.name.trim(),
    type: data.type,
    min: data.min,
    max: data.max
  };

  vSearch(1);
};

function addCart(productCode, quantity) {
  if (!me) {
    act.openAuth();
    return;
  }

  if (!(quantity > 0)) {
    quantity = 1;
  }

  const cart = getCart();
  const cartItem = cart.find(function (item) { return item.code === productCode; });
  const currentQuantity = cartItem ? cartItem.qty : 0;
  const newQuantity = currentQuantity + quantity;

  if (newQuantity > stockNow(productCode)) {
    notify('noStock');
    return;
  }

  if (cartItem) {
    cartItem.qty = newQuantity;
  } else {
    cart.push({ code: productCode, qty: quantity });
  }

  DB.set('cart_' + me, cart);
  refreshNav();
  notify('added');
}

act.addCart = function (productCode) {
  addCart(productCode, 1);
};

act.addDetail = function (productCode) {
  addCart(productCode, Number($('#dq').value));
};

act.chg = function (productCode, element) {
  const cart = getCart();
  const cartItem = cart.find(function (item) { return item.code === productCode; });

  cartItem.qty += Number(element.dataset.d);

  const remainingStock = stockNow(productCode);
  if (cartItem.qty > remainingStock) {
    notify('noStock');
    cartItem.qty = remainingStock;
  }

  const updatedCart = cart.filter(function (item) { return item.qty > 0; });

  DB.set('cart_' + me, updatedCart);
  refreshNav();
  vCart();
};

function vCart() {
  if (needLogin()) {
    return;
  }

  show('#app', 'v-cart');

  const cart = getCart().filter(function (cartItem) {
    return prods().some(function (product) { return product.code === cartItem.code; });
  });
  let total = 0;

  const cartRows = cart.map(function (cartItem) {
    const product = prods().find(function (item) { return item.code === cartItem.code; });
    const price = priceOf(product);
    const amount = price * cartItem.qty;
    total += amount;

    return {
      code: product.code,
      name: product.name,
      price: money(price),
      qty: cartItem.qty,
      amount: money(amount)
    };
  });

  list($('#cartRows'), cartRows);
  fill($('#v-cart'), {
    isEmpty: cart.length === 0,
    hasItems: cart.length > 0,
    total: money(total)
  });
}

function vCheckout() {
  if (needLogin()) {
    return;
  }

  if (!getCart().length) {
    location.hash = 'cart';
    return;
  }

  show('#app', 'v-checkout');
  $('#checkoutForm').reset();
  $('#checkoutForm').dataset.addr = 'old';
  fill($('#v-checkout'), { address: user().address });
}

act.addrMode = function (value) {
  $('#checkoutForm').dataset.addr = value;
};

act.placeOrder = function (data) {
  let address = user().address;

  if (data.addr === 'new') {
    const addressParts = [data.a1, data.a2, data.a3].map(function (part) { return part.trim(); });

    if (addressParts.includes('')) {
      notify('noAddr');
      return;
    }

    address = addressParts.join(', ');
  }

  const items = getCart().map(function (cartItem) {
    const product = prods().find(function (item) { return item.code === cartItem.code; });

    return {
      code: product.code,
      name: product.name,
      qty: cartItem.qty,
      price: priceOf(product)
    };
  });

  const hasInsufficientStock = items.some(function (item) { return item.qty > stockNow(item.code); });

  if (hasInsufficientStock) {
    notify('orderNoStock');
    return;
  }

  const orders = DB.get('orders', []);
  const total = items.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
  const order = {
    id: orders.length + 1,
    user: me,
    date: today(),
    items: items,
    addr: address,
    pay: data.pay,
    status: NEW,
    total: total
  };

  orders.push(order);
  DB.set('orders', orders);
  DB.set('cart_' + me, []);
  refreshNav();

  show('#app', 'v-done');
  list($('#doneOrder'), [orderRow(order)]);
};

function vOrders() {
  if (needLogin()) {
    return;
  }

  show('#app', 'v-orders');

  const myOrders = DB.get('orders', []).filter(function (order) { return order.user === me; }).reverse();

  list($('#orderList'), myOrders.map(orderRow));
  fill($('#v-orders'), { hasItems: myOrders.length > 0 });
}

function vProfile() {
  if (needLogin()) {
    return;
  }

  show('#app', 'v-profile');
  fill($('#profileForm'), {
    ...user(),
    newpass: ''
  });
}

act.saveProfile = function (data) {
  const users = DB.get('users', []);
  const currentUser = users.find(function (savedUser) { return savedUser.username === me; });

  currentUser.fullname = data.fullname.trim();
  currentUser.address = data.address.trim();
  currentUser.phone = data.phone.trim();

  if (data.password) {
    currentUser.password = data.password;
  }

  DB.set('users', users);
  refreshNav();
  notify('saved');
};

act.openAuth = function () {
  $('#authBox').classList.add('show');
  act.authTab('login');
};

act.closeAuth = function () {
  $('#authBox').classList.remove('show');
};

act.authTab = function (tabName) {
  $('#authBox').dataset.tab = tabName;
  $('#authMsg').textContent = '';
};

act.register = function (data, form) {
  const users = DB.get('users', []);
  const username = data.username.trim();
  const phone = data.phone.trim();

  if (!/^[0-9]{10}$/.test(phone)) {
    say('#authMsg', 'badPhone');
    return;
  }

  if (data.password !== data.again) {
    say('#authMsg', 'mismatch');
    return;
  }

  const usernameExists = users.some(function (savedUser) { return savedUser.username.toLowerCase() === username.toLowerCase(); });

  if (usernameExists) {
    say('#authMsg', 'userExists');
    return;
  }

  users.push({
    username: username,
    password: data.password,
    fullname: data.fullname.trim(),
    address: data.address.trim(),
    phone: phone,
    locked: false
  });

  DB.set('users', users);
  form.reset();
  act.authTab('login');
  say('#authMsg', 'regOk', true);
};

act.login = function (data, form) {
  const username = data.username.trim().toLowerCase();
  const savedUser = DB.get('users', []).find(function (item) {
    return item.username.toLowerCase() === username &&
      item.password === data.password;
  });

  if (!savedUser) {
    say('#authMsg', 'loginFail');
    return;
  }

  if (savedUser.locked) {
    say('#authMsg', 'loginLocked');
    return;
  }

  DB.set('me', savedUser.username);
  form.reset();
  act.closeAuth();
  route();
};

act.logout = function () {
  DB.set('me', null);
  location.hash = 'home';
  route();
};

route();

// ===== Admin dashboard =====
const ADMIN = {
  user: 'admin',
  pass: 'admin123'
};
const RESET_PASS = '123456';

function option(value, text) {
  return {
    value: value,
    text: text
  };
}

function typeOptions() {
  return types().map(function (type) { return option(type.id, type.name); });
}

function productOptions() {
  return prods().map(function (product) { return option(product.code, product.code + ' - ' + product.name); });
}

const sections = {};

// Keep the admin form visible until a login succeeds; restore the current
// section automatically when the browser still has an admin session.
function showPanel() {
  const isLoggedIn = sessionStorage.getItem('admin') === '1';
  document.body.dataset.admin = isLoggedIn ? 'in' : 'out';

  if (isLoggedIn) {
    act.go('users');
  }
}

act.go = function (sectionName) {
  document.querySelectorAll('.side [data-arg]').forEach(function (button) {
    button.classList.toggle('on', button.dataset.arg === sectionName);
  });

  show('#main', 'a-' + sectionName);
  sections[sectionName]();
};

act.adminLogin = function (data) {
  if (data.user === ADMIN.user && data.pass === ADMIN.pass) {
    sessionStorage.setItem('admin', '1');
    $('#aerr').textContent = '';
    showPanel();
    return;
  }

  say('#aerr', 'adminFail');
};

act.adminLogout = function () {
  sessionStorage.removeItem('admin');
  showPanel();
};

// Customer accounts
sections.users = function () {
  const users = DB.get('users', []).map(function (savedUser) {
    return {
      ...savedUser,
      locked: Boolean(savedUser.locked)
    };
  });

  list($('#userRows'), users);
};

act.resetPw = function (username) {
  const users = DB.get('users', []);
  const savedUser = users.find(function (item) { return item.username === username; });

  savedUser.password = RESET_PASS;
  DB.set('users', users);
  notify('pwReset', {
    name: username,
    pass: RESET_PASS
  });
};

act.lockUser = function (username) {
  const users = DB.get('users', []);
  const savedUser = users.find(function (item) { return item.username === username; });

  savedUser.locked = !savedUser.locked;
  DB.set('users', users);
  sections.users();
};

// Product types
sections.types = function () {
  list($('#typeRows'), types());
};

act.addType = function (data, form) {
  const productTypes = types();

  productTypes.push({
    id: Date.now(),
    name: data.name.trim(),
    margin: 20,
    hidden: false
  });

  DB.set('types', productTypes);
  form.reset();
  sections.types();
};

act.saveType = function (data) {
  const productTypes = types();
  const productType = productTypes.find(function (type) { return type.id == data.id; });

  if (data.name.trim()) {
    productType.name = data.name.trim();
    DB.set('types', productTypes);
  }

  sections.types();
};

act.hideType = function (typeId) {
  const productTypes = types();
  const productType = productTypes.find(function (type) { return type.id == typeId; });

  productType.hidden = !productType.hidden;
  DB.set('types', productTypes);
  sections.types();
};

act.delType = function (typeId) {
  const hasProducts = prods().some(function (product) { return product.type == typeId; });

  if (hasProducts) {
    notify('typeHasProd');
    return;
  }

  const remainingTypes = types().filter(function (type) { return type.id != typeId; });

  DB.set('types', remainingTypes);
  sections.types();
};

// Products
let editCode = null;

sections.products = function () {
  list($('#prodType'), typeOptions());

  const product = prods().find(function (item) { return item.code === editCode; });
  const defaultType = types()[0];

  fill($('#prodForm'), {
    editing: Boolean(product),
    type: product ? product.type : (defaultType ? defaultType.id : ''),
    code: product ? product.code : '',
    name: product ? product.name : '',
    img: product ? product.img : '',
    desc: product ? product.desc : ''
  });

  const productRows = prods().map(function (item) {
    return {
      code: item.code,
      name: item.name,
      typeName: typeName(item.type),
      hidden: item.hidden
    };
  });

  list($('#prodRows'), productRows);
};

act.editProd = function (productCode) {
  editCode = productCode;
  sections.products();
};

act.cancelEdit = function () {
  editCode = null;
  sections.products();
};

act.saveProd = function (data) {
  const products = prods();
  const productCode = data.code.trim();
  const productData = {
    type: Number(data.type),
    name: data.name.trim(),
    img: data.img.trim(),
    desc: data.desc.trim()
  };

  if (!productData.type) {
    notify('needType');
    return;
  }

  if (editCode) {
    const product = products.find(function (item) { return item.code === editCode; });
    Object.assign(product, productData);
  } else {
    const codeExists = products.some(function (item) { return item.code === productCode; });

    if (codeExists) {
      notify('dupCode');
      return;
    }

    products.push({
      code: productCode,
      ...productData,
      margin: null,
      hidden: false
    });
  }

  DB.set('products', products);
  editCode = null;
  sections.products();
};

act.hideProd = function (productCode) {
  const products = prods();
  const product = products.find(function (item) { return item.code === productCode; });

  product.hidden = !product.hidden;
  DB.set('products', products);
  sections.products();
};

act.delProd = function (productCode) {
  const hasImport = DB.get('imports', []).some(function (importData) {
    return importData.lines.some(function (line) { return line.code === productCode; });
  });
  const hasOrder = DB.get('orders', []).some(function (order) {
    return order.items.some(function (item) { return item.code === productCode; });
  });

  if (hasImport || hasOrder) {
    notify('prodUsed');
    return;
  }

  const remainingProducts = prods().filter(function (product) { return product.code !== productCode; });

  DB.set('products', remainingProducts);
  sections.products();
};

// Stock imports
let importFilter = {
  from: '',
  to: ''
};
let currentImportId = null;

function sumLines(importData) {
  return importData.lines.reduce(function (total, line) { return total + line.cost * line.qty; }, 0);
}

sections.imports = function () {
  fill($('#impFilter'), importFilter);

  const imports = DB.get('imports', []).filter(function (importData) {
    const afterStartDate = !importFilter.from || importData.date >= importFilter.from;
    const beforeEndDate = !importFilter.to || importData.date <= importFilter.to;
    return afterStartDate && beforeEndDate;
  });

  const rows = imports.map(function (importData) {
    return {
      id: importData.id,
      date: importData.date,
      lineCount: importData.lines.length,
      total: money(sumLines(importData)),
      done: importData.done
    };
  });

  list($('#impRows'), rows);
};

act.findImp = function (data) {
  importFilter = {
    from: data.from,
    to: data.to
  };

  sections.imports();
};

act.newImport = function () {
  const imports = DB.get('imports', []);
  const importIds = imports.map(function (importData) { return importData.id; });
  const newId = Math.max(0, ...importIds) + 1;

  imports.push({
    id: newId,
    date: today(),
    done: false,
    lines: []
  });

  DB.set('imports', imports);
  act.openImport(newId);
};

act.delImport = function (importId) {
  const remainingImports = DB.get('imports', []).filter(function (importData) { return importData.id != importId || importData.done; });

  DB.set('imports', remainingImports);
  sections.imports();
};

act.openImport = function (importId) {
  currentImportId = Number(importId);
  show('#main', 'a-impdetail');
  sections.impDetail();
};

sections.impDetail = function () {
  const importData = DB.get('imports', []).find(function (item) { return item.id === currentImportId; });

  $('#finishBox').hidden = true;
  list($('#impProd'), productOptions());
  fill($('#a-impdetail'), {
    id: importData.id,
    date: importData.date,
    done: importData.done
  });

  const lines = importData.lines.map(function (line, index) {
    return {
      prodCode: line.code,
      prodName: nameOf(line.code),
      cost: money(line.cost),
      qty: line.qty,
      amount: money(line.cost * line.qty),
      idx: index,
      done: importData.done
    };
  });

  list($('#lineRows'), lines);
};

function editImport(updateImport) {
  const imports = DB.get('imports', []);
  const importData = imports.find(function (item) { return item.id === currentImportId; });

  if (importData.done) {
    return;
  }

  updateImport(importData);
  DB.set('imports', imports);
  sections.impDetail();
}

act.setImpDate = function (date) {
  editImport(function (importData) {
    importData.date = date;
  });
};

act.delLine = function (lineIndex) {
  editImport(function (importData) {
    importData.lines.splice(Number(lineIndex), 1);
  });
};

act.addLine = function (data, form) {
  form.reset();

  editImport(function (importData) {
    importData.lines.push({
      code: data.code,
      cost: Number(data.cost),
      qty: Number(data.qty)
    });
  });
};

act.finishImp = function () {
  const importData = DB.get('imports', []).find(function (item) { return item.id === currentImportId; });

  if (!importData.lines.length) {
    notify('impEmpty');
    return;
  }

  $('#finishBox').hidden = false;
};

act.finishNo = function () {
  $('#finishBox').hidden = true;
};

act.finishYes = function () {
  editImport(function (importData) {
    importData.done = true;
  });
};

// Product pricing
let priceSearchQuery = '';

sections.prices = function () {
  const typeRows = types().map(function (type) {
    return {
      id: type.id,
      name: type.name,
      margin: type.margin
    };
  });
  list($('#typeMarginRows'), typeRows);
  fill($('#priceFilter'), { q: priceSearchQuery });

  const matchingProducts = prods().filter(function (product) {
    const searchableText = (product.code + product.name).toLowerCase();
    return searchableText.includes(priceSearchQuery.toLowerCase());
  });

  const priceRows = matchingProducts.map(function (product) {
    return {
      code: product.code,
      name: product.name,
      typeName: typeName(product.type),
      cost: money(costOf(product.code)),
      margin: marginOf(product),
      own: product.margin !== null && product.margin !== undefined,
      marginOwn: product.margin ?? '',
      price: money(priceOf(product))
    };
  });

  list($('#priceRows'), priceRows);
};

act.findPrice = function (data) {
  priceSearchQuery = data.q;
  sections.prices();
};

act.saveTypeMargin = function (data) {
  const productTypes = types();
  const productType = productTypes.find(function (type) { return type.id == data.id; });

  if (data.margin === '' || Number(data.margin) < 0) {
    notify('badMargin');
    return;
  }

  productType.margin = Number(data.margin);
  DB.set('types', productTypes);
  sections.prices();
};

act.saveProdMargin = function (data) {
  if (data.margin !== '' && Number(data.margin) < 0) {
    notify('badMargin');
    return;
  }

  const products = prods();
  const product = products.find(function (item) { return item.code === data.code; });

  product.margin = data.margin === '' ? null : Number(data.margin);
  DB.set('products', products);
  sections.prices();
};

// Customer orders
let orderFilter = {
  from: '',
  to: '',
  st: ''
};
let currentOrderId = null;

sections.orders = function () {
  fill($('#ordFilter'), orderFilter);

  const orders = DB.get('orders', []).filter(function (order) {
    const afterStartDate = !orderFilter.from || order.date >= orderFilter.from;
    const beforeEndDate = !orderFilter.to || order.date <= orderFilter.to;
    const matchesStatus = !orderFilter.st || order.status === orderFilter.st;
    return afterStartDate && beforeEndDate && matchesStatus;
  });

  const rows = orders.map(function (order) {
    return {
      id: order.id,
      date: order.date,
      user: order.user,
      total: money(order.total),
      statusText: statusLabel(order.status)
    };
  });

  list($('#ordRows'), rows);
};

act.findOrd = function (data) {
  orderFilter = {
    from: data.from,
    to: data.to,
    st: data.st
  };

  sections.orders();
};

act.openOrder = function (orderId) {
  currentOrderId = Number(orderId);
  show('#main', 'a-orddetail');
  sections.orderDetail();
};

sections.orderDetail = function () {
  const order = DB.get('orders', []).find(function (item) { return item.id === currentOrderId; });
  const customer = DB.get('users', []).find(function (savedUser) { return savedUser.username === order.user; });

  fill($('#a-orddetail'), {
    id: order.id,
    customerName: customer ? customer.fullname : order.user,
    customerPhone: customer ? customer.phone : '',
    st: order.status
  });

  list($('#ordBox'), [orderRow(order)]);
};

act.setStatus = function () {
  const orders = DB.get('orders', []);
  const order = orders.find(function (item) { return item.id === currentOrderId; });

  order.status = $('#statusSel').value;
  DB.set('orders', orders);
  sections.orderDetail();
};

// Stock reports
sections.stock = function () {
  list($('#stockType'), typeOptions());
  list($('#flowProd'), productOptions());
  fill($('#a-stock'), {
    today: today(),
    th: 5
  });
  act.showStock({ type: '', date: today() });   // hiện sẵn bảng tồn kho khi mở trang
  act.showLow({ th: 5 });
};

act.showStock = function (data) {
  const matchingProducts = prods().filter(function (product) { return !data.type || product.type == data.type; });

  const stockRows = matchingProducts.map(function (product) {
    return {
      code: product.code,
      name: product.name,
      typeName: typeName(product.type),
      qty: stockAt(product.code, data.date)
    };
  });

  list($('#stockRows'), stockRows);
};

act.showLow = function (data) {
  const lowStockProducts = prods().filter(function (product) { return stockNow(product.code) <= Number(data.th); });

  const rows = lowStockProducts.map(function (product) {
    return {
      code: product.code,
      name: product.name,
      qty: stockNow(product.code)
    };
  });

  list($('#lowRows'), rows);
  fill($('#a-stock'), {
    hasLow: lowStockProducts.length > 0
  });
};

act.showFlow = function (data) {
  const stockMovement = flow(data.code, data.from, data.to);
  fill($('#flowResult'), {
    ...stockMovement,
    isHidden: false
  });
};

if ($('#adminWrap')) {
  showPanel();
}