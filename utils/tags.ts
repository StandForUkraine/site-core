export const allTags = [
  'Military',
  'NGO',
  'Medical',
  'Humanitarian',
  'Non-combat',
  'Refugees',
  'Human Rights',
  'Press',
] as const

export type Tag = typeof allTags[number]
