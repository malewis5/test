export enum ERROR_TYPES {
  GENERIC = 'Let’s try again.',
  ADDRESS_VALIDATION = 'Let’s try entering your info again.',
  SHIPPING = 'Let’s try entering your shipping information again.',
  BILLING = 'Let’s try entering your billing information again.',
  PROMO = 'Let’s try your promo again.',
  CREDIT_CARD = 'Let’s try your credit card information again.',
  AFTER_PAY = 'AfterPay payment was canceled...',
  ORDER = 'Let’s try placing your order again or contact Customer Service at 1-800-523-4448',
  LOGIN = 'Let’s try signing in again.',
  LOGIN_INVALID = 'Invalid username or password.',
  REGISTRATION = 'Let’s try registering again!',
  PASSWORD = 'A password is required to create a new account.',
  CONFIRM_PASSWORD = 'Passwords do not match.',
}

export enum API_ERRORS {
  PROCESS = 'the order has already been processed',
}
