export type WeaponGroup = {
  groupName: string;
  refines: Weapon[];
};

export type Weapon = { id: string; groupName: string; weaponRefineType: number | null };

export type Refine = {
  id: string;
  label: string;
  weaponRefineType: number | null;
};
