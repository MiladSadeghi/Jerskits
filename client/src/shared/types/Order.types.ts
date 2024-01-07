import { IProfileForm } from './Profile.types'
import { TBagItem } from './User.types'

export interface IOrder {
  orderNumber: number
  user: string
  information: IProfileForm
  delivery: IOrderDelivery
  payment: IOrderPayment
  orderItems: IOrderItems
  createdAt: Date
  updatedAt: Date
}

export interface IOrderDelivery {
  arriveTime: Date
  type: 'standard' | 'express'
  price: 10 | 20
}

export interface IOrderPayment {
  nameOnCard: string
  cardNumber: string
  expirationDate: string
  cvv: string
}

export interface IOrderItems {
  items: TBagItem[]
  subTotal: number
}

export interface IGetOrdersResponse {
  error: boolean
  orders: {
    history: IOrder[]
    ongoing: IOrder[]
  }
}

export interface IGetOrderResponse {
  error: boolean
  order: IOrder
}

export type IGetOrderRequest = string

export type TValidateCheckoutInformationRequest = IProfileForm

export type TValidateCheckoutInformationResponse = Omit<
  IProfileForm,
  'address' | 'country' | 'state' | 'city' | 'postalCode'
> & {
  address: string
  country: Option
  state: Option
  city: Option
  postalCode: string
}

export type TInformation = Omit<
  IProfileForm,
  'address' | 'country' | 'state' | 'city' | 'postalCode'
> & {
  address: string
  country: Option
  state: Option
  city: Option
  postalCode: string
}

export type TValidateCheckoutDeliveryRequest = IOrderDelivery

export type TValidateCheckoutPaymentRequest = IOrderPayment & {
  saveAsDefault: boolean
}

export enum ECheckoutSteps {
  INFORMATION = 1,
  DELIVERY = 2,
  BILLING = 3,
  PAYMENT = 4
}

export type TValidatingError<T> = {
  status: number
  data: {
    errors: T
  }
}

export type TValidateCheckoutError<T> = {
  [key in keyof T]: string
}

export type TPlaceOrderRequest = {
  information?: IProfileForm
  delivery?: IOrderDelivery
  payment?: IOrderPayment & {
    saveAsDefault: boolean
  }
}

export type TPlaceOrderResponse = {
  error: boolean
  orderId: number
}

export type TPlaceOrderError = {
  error: boolean
  step: ECheckoutSteps
  message: string
  errors: unknown
}
