
export const ProductUnit = {
    Kilo: 'Kilo',
    Each: 'Each'
}

export type ProductUnit = typeof ProductUnit[keyof typeof ProductUnit];
