export * from "@/constant/status";
export * from "@/constant/enum";
export * from "@/constant/regex";
export * from "@/constant/theme";

// < URL >
export const APP_DEFAULT_AVT =
  "https://demoda.vn/wp-content/uploads/2022/01/hinh-anh-naruto-chibi-naruto-hien-nhan-ket-an-phan-than-chi-thuat.jpg";
export const APP_LOGIN_URL = `http://${process.env.NEXT_PUBLIC_HOST}:3000/auth/signin`;
export const APP_HOME_URL = `http://${process.env.NEXT_PUBLIC_HOST}:3000/dashboard`;
export const APP_SOCKET_URL = "http://localhost:3006";

// </ URL>

// < KEY >
export const AUTH_TOKEN = "AUTH_TOKEN";
export const AUTH_PASSWORD = "AUTH_PASSWORD";
export const AUTH_EMAIL = "AUTH_EMAIL";
export const AUTH_INFO = "AUTH_INFO";
export const CART_DATA = "CART_DATA";

// </ KEY>

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAIL = "LOAD_USER_FAIL";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_RESET = "UPDATE_PROFILE_RESET";
export const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";

export const UPDATE_PASSWORD_REQUEST = "UPDATE_PASSWORD_REQUEST";
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
export const UPDATE_PASSWORD_RESET = "UPDATE_PASSWORD_RESET";
export const UPDATE_PASSWORD_FAIL = "UPDATE_PASSWORD_FAIL";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAIL = "FORGOT_PASSWORD_FAIL";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL";

export const ALL_USERS_REQUEST = "ALL_USERS_REQUEST";
export const ALL_USERS_SUCCESS = "ALL_USERS_SUCCESS";
export const ALL_USERS_FAIL = "ALL_USERS_FAIL";

export const USER_DETAILS_REQUEST = "USER_DETAILS_REQUEST";
export const USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS";
export const USER_DETAILS_FAIL = "USER_DETAILS_FAIL";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_RESET = "UPDATE_USER_RESET";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";
export const DELETE_USER_RESET = "DELETE_USER_RESET";

export const CLEAR_ERRORS = "CLEAR_ERRORS";


export interface IProduct {
  id: number;
  cover: string;
  name: string;
  price: number;
  priceSale: number;
  colors: string[];
  status: "sale" | "new" | "feature";
  rate: number;
  size: string[];
  inStock: boolean;
  categoryId: number;
  createAt: string;
  updateAt: string;
}

export interface IOrder {
  id?: number;
  cover: string;
  name: string;
  price: number;
  priceSale: number;
  colors: string;
  status: "sale" | "new" | "feature";
  rate: number;
  size: string;
  inStock: boolean;
  quantity: number;
  categoryId: number;
  createAt?: string;
  updateAt?: string;
}

// Fake Data Product
export const products: IProduct[] = [
  {
    id: 1,
    cover: `/images/product_1.jpg`,
    name: "Nike Air Force 1 NDESTRUKT",
    price: 20,
    priceSale: 18,
    colors: ["#00AB55", "#000000"],
    status: "sale",
    rate: 4,
    inStock: true,
    size: ["29", "30", "31"],
    categoryId: 1,
    createAt: '2023-4-28',
    updateAt: '2023-4-28',
  },
  {
    id: 2,
    cover: `/images/product_2.jpg`,
    name: "Nike Space Hippie 04",
    price: 10,
    priceSale: 8,
    colors: ["#94D82D", "#FFC107"],
    status: "new",
    rate: 4,
    inStock: true,
    size: ["29", "30", "31"],
    categoryId: 1,
    createAt: '2023-4-28',
    updateAt: '2023-4-28',
  },
  {
    id: 3,
    cover: `/images/product_3.jpg`,
    name: "Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear",
    price: 30,
    priceSale: 26,
    colors: ["#FFFFFF", "#FFC0CB"],
    status: "feature",
    rate: 4,
    inStock: true,
    size: ["29", "30", "31"],
    categoryId: 1,
    createAt: '2023-4-28',
    updateAt: '2023-4-28',
  },
  {
    id: 4,
    cover: `/images/product_4.jpg`,
    name: "Nike Blazer Low 77 Vintage",
    price: 56,
    priceSale: 50,
    colors: ["#94D82D", "#FFC107"],
    status: "sale",
    rate: 4,
    inStock: true,
    size: ["29", "30", "31"],
    categoryId: 1,
    createAt: '2023-4-28',
    updateAt: '2023-4-28',
  },
  {
    id: 5,
    cover: `/images/product_5.jpg`,
    name: "Nike ZoomX SuperRep Surge",
    price: 17,
    priceSale: 16,
    colors: ["#FFC0CB", "#FF4842", "#1890FF", "#94D82D"],
    status: "feature",
    rate: 4,
    inStock: true,
    size: ["29", "30", "31"],
    categoryId: 1,
    createAt: '2023-4-28',
    updateAt: '2023-4-28',
  },
  {
    id: 6,
    cover: `/images/product_6.jpg`,
    name: "Zoom Freak 2",
    price: 60,
    priceSale: 48,
    colors: ["#00AB55", "#000000", "#FFFFFF", "#FFC0CB", "#FF4842"],
    status: "sale",
    rate: 4,
    inStock: true,
    size: ["29", "30", "31"],
    categoryId: 1,
    createAt: '2023-4-28',
    updateAt: '2023-4-28',
  },
  {
    id: 7,
    cover: `/images/product_7.jpg`,
    name: "Nike Air Max Zephyr",
    price: 33,
    priceSale: 30,
    colors: ["#FFC107"],
    status: "new",
    rate: 4,
    inStock: true,
    size: ["29", "30", "31"],
    categoryId: 1,
    createAt: '2023-4-28',
    updateAt: '2023-4-28',
  },
  {
    id: 8,
    cover: `/images/product_8.jpg`,
    name: "Jordan Delta",
    price: 44,
    priceSale: 42,
    colors: ["#00AB55", "#000000", "#FFFFFF"],
    status: "new",
    rate: 4,
    inStock: true,
    size: ["29", "30", "31"],
    categoryId: 1,
    createAt: '2023-4-28',
    updateAt: '2023-4-28',
  },
  {
    id: 9,
    cover: `/images/product_9.jpg`,
    name: "Air Jordan XXXV PF",
    price: 52,
    priceSale: 50,
    colors: ["#94D82D"],
    status: "sale",
    rate: 4,
    inStock: true,
    size: ["29", "30", "31"],
    categoryId: 1,
    createAt: '2023-4-28',
    updateAt: '2023-4-28',
  },
  {
    id: 10,
    cover: `/images/product_10.jpg`,
    name: "Nike Waffle Racer Crater",
    price: 67,
    priceSale: 60,
    colors: ["#000000", "#FFFFFF", "#FFC0CB", "#FF4842"],
    status: "new",
    rate: 4,
    inStock: true,
    size: ["29", "30", "31"],
    categoryId: 1,
    createAt: '2023-4-28',
    updateAt: '2023-4-28',
  },
];

export interface IFieldOption {
  key: string;
  label: string;
  type: string;
}

export const fieldOption: IFieldOption[] = [
  {
    key: "fullName",
    label: "Full Name",
    type: "text",
  },
  {
    key: "name",
    label: "User Name",
    type: "text",
  },
  {
    key: "email",
    label: "Email",
    type: "text",
  },
  {
    key: "phone",
    label: "Phone",
    type: "text",
  },

  {
    key: "description",
    label: "Role",
    type: "select",
  },
  {
    key: "address",
    label: "Address",
    type: "select",
  },
  {
    key: "dateOfBirth",
    label: "Birthday",
    type: "date",
  },
  {
    key: "password",
    label: "Password",
    type: "text",
  },
];
export const roleOptions = ["Admin", "Employee"];
export const cityOptions = [
  "Hanoi",
  "HoChiMinh",
  "HaiPhong",
  "Danang",
  "Thanhhoa",
  "Phutho",
  "Thaibinh",
  "Namdinh",
  "Ninhbinh",
  "Nghean",
];
