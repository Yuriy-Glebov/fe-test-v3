
export const SpecialOfferType = {
    ThreeForTwo: 'ThreeForTwo',
    TenPercentDiscount: 'TenPercentDiscount',
    TwoForAmount: 'TwoForAmount',
    FiveForAmount: 'FiveForAmount'
}

export type SpecialOfferType = typeof SpecialOfferType[keyof typeof SpecialOfferType];


