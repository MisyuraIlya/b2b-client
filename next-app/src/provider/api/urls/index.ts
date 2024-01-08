const pages = {
  product: 'product',
  catalog: 'catalog',
  forgotPassword: 'forgot-password',
  checkEmail: 'check-email',
  login: 'login',
  signUp: 'sign-up',
  brands: 'brands',
  search: 'search',
  brand: 'brand'
}

const client = {
  categoryTree: '/b2b-api/v1/category_tree',
  productList: '/b2b-api/v1/product_list',
  filterList: '/b2b-api/v1/filter_list',
  priceList: '/b2b-api/v1/price_list',
  productPage: '/b2b-api/v1/product_page',
  brandsList: '/b2b-api/v1/brands',
  brand: '/b2b-api/v1/brand',
  searchProductsByWord: '/b2b-api/v1/product_list/search_by_word',
  searchProductsByBrand: '/b2b-api/v1/product_list/search_by_brand',
  searchFiltersByWord: '/b2b-api/v1/filter_list/search_by_word',
  searchBrandFiltersByWord: '/b2b-api/v1/filter_list/search_by_brand'
}

const customer = {
  cart: '/customer/v1/cart',
  cartPage: '/customer/v1/cart/page',
  addToCart: '/customer/v1/cart/add',
  register: '/customer/register',
  login: '/customer/login_check',
  updateCart: (id: number) => `/customer/v1/cart/product/${id}/edit`,
  deleteProductFromCart: (id: number) => `/customer/v1/cart/product/${id}/delete`,
  similarProducts: (id: number) => `/b2b-api/v1/similar/${id}/products`
}
const urls = {
  pages,
  client,
  customer
}

export default urls;