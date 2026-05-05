export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  badge?: string;
  imageUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type AminoAcidType = 'nonpolar' | 'polar' | 'positive' | 'negative';

export interface AminoAcid {
  letter: string;
  name: string;
  shortName: string;
  mw: number;
  type: AminoAcidType;
  pKaSideChain?: number;
  formula?: string;
  properties?: string;
}
