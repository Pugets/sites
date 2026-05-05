import type { AminoAcid } from '../types';

export const AMINO_ACIDS: Record<string, AminoAcid> = {
  A: { letter: 'A', name: 'Alanine',       shortName: 'Ala', mw: 89.09,  type: 'nonpolar' },
  R: { letter: 'R', name: 'Arginine',      shortName: 'Arg', mw: 174.20, type: 'positive', pKaSideChain: 12.48 },
  N: { letter: 'N', name: 'Asparagine',    shortName: 'Asn', mw: 132.12, type: 'polar' },
  D: { letter: 'D', name: 'Aspartic acid', shortName: 'Asp', mw: 133.10, type: 'negative', pKaSideChain: 3.65 },
  C: { letter: 'C', name: 'Cysteine',      shortName: 'Cys', mw: 121.16, type: 'polar',    pKaSideChain: 8.18 },
  E: { letter: 'E', name: 'Glutamic acid', shortName: 'Glu', mw: 147.13, type: 'negative', pKaSideChain: 4.25 },
  Q: { letter: 'Q', name: 'Glutamine',     shortName: 'Gln', mw: 146.15, type: 'polar' },
  G: { letter: 'G', name: 'Glycine',       shortName: 'Gly', mw: 75.03,  type: 'nonpolar' },
  H: { letter: 'H', name: 'Histidine',     shortName: 'His', mw: 155.16, type: 'positive', pKaSideChain: 6.00 },
  I: { letter: 'I', name: 'Isoleucine',    shortName: 'Ile', mw: 131.17, type: 'nonpolar' },
  L: { letter: 'L', name: 'Leucine',       shortName: 'Leu', mw: 131.17, type: 'nonpolar' },
  K: { letter: 'K', name: 'Lysine',        shortName: 'Lys', mw: 146.19, type: 'positive', pKaSideChain: 10.53 },
  M: { letter: 'M', name: 'Methionine',    shortName: 'Met', mw: 149.21, type: 'nonpolar' },
  F: { letter: 'F', name: 'Phenylalanine', shortName: 'Phe', mw: 165.19, type: 'nonpolar' },
  P: { letter: 'P', name: 'Proline',       shortName: 'Pro', mw: 115.13, type: 'nonpolar' },
  S: { letter: 'S', name: 'Serine',        shortName: 'Ser', mw: 105.09, type: 'polar' },
  T: { letter: 'T', name: 'Threonine',     shortName: 'Thr', mw: 119.12, type: 'polar' },
  W: { letter: 'W', name: 'Tryptophan',    shortName: 'Trp', mw: 204.23, type: 'nonpolar' },
  Y: { letter: 'Y', name: 'Tyrosine',      shortName: 'Tyr', mw: 163.18, type: 'polar',    pKaSideChain: 10.07 },
  V: { letter: 'V', name: 'Valine',        shortName: 'Val', mw: 83.09,  type: 'nonpolar' },
};

export const PKA = {
  Nterm: 8.0,
  Cterm: 3.1,
  D: 3.65,
  E: 4.25,
  C: 8.18,
  H: 6.00,
  K: 10.53,
  R: 12.48,
  Y: 10.07,
};

export const TYPE_STYLES: Record<string, { bg: string; label: string }> = {
  nonpolar: { bg: '#888888', label: 'Nonpolar' },
  polar:    { bg: '#62b8cc', label: 'Polar' },
  positive: { bg: '#c47830', label: 'Positive' },
  negative: { bg: '#d97070', label: 'Negative' },
};

export const PRESETS: { name: string; sequence: string }[] = [
  { name: 'Epithalon',  sequence: 'AEDG' },
  { name: 'Selank',     sequence: 'TKPRPGP' },
  { name: 'BPC-157',    sequence: 'GEPTGPASKVFDKPDL' },
  { name: 'CJC-1295',   sequence: 'HAEGTFTSDVSSYLEGQAAKEFIAWLVKGR' },
];

export function calcMW(seq: string): number {
  let mw = 18.02; // water
  for (const r of seq.toUpperCase()) {
    mw += (AMINO_ACIDS[r]?.mw ?? 0) - 18.02;
  }
  return mw;
}

export function netCharge(seq: string, pH: number): number {
  const s = seq.toUpperCase();
  let q = 0;
  q += 1 / (1 + Math.pow(10, pH - PKA.Nterm));
  q -= 1 / (1 + Math.pow(10, PKA.Cterm - pH));
  for (const r of s) {
    if (r === 'D') q -= 1 / (1 + Math.pow(10, PKA.D - pH));
    else if (r === 'E') q -= 1 / (1 + Math.pow(10, PKA.E - pH));
    else if (r === 'C') q -= 1 / (1 + Math.pow(10, PKA.C - pH));
    else if (r === 'Y') q -= 1 / (1 + Math.pow(10, PKA.Y - pH));
    else if (r === 'H') q += 1 / (1 + Math.pow(10, pH - PKA.H));
    else if (r === 'K') q += 1 / (1 + Math.pow(10, pH - PKA.K));
    else if (r === 'R') q += 1 / (1 + Math.pow(10, pH - PKA.R));
  }
  return q;
}

export function calcPI(seq: string): number {
  let lo = 0, hi = 14;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    netCharge(seq, mid) > 0 ? (lo = mid) : (hi = mid);
  }
  return (lo + hi) / 2;
}
