
export type actionType = {
  +type: string
};

export const SAVE_CONFIG = 'SAVE_CONFIG';

export function saveConfig(value) {
  return {
    type: SAVE_CONFIG,
    value
  };
}
