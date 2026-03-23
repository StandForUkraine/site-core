export const payMethods = ['IBAN', 'Credit Card', 'PayPal', 'Patreon', 'Crypto'] as const

export type PayMethod = typeof payMethods[number]
