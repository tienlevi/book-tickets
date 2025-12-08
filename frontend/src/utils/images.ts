export const clubImage = (id: string | number) => {
  return `https://img.sofascore.com/api/v1/team/${id}/image`;
};

export const tournamentImage = (id: string | number) => {
  return `https://img.sofascore.com/api/v1/unique-tournament/${id}/image`;
};

export const countryImage = (alpha: string) => {
  return `https://img.sofascore.com/api/v1/country/${alpha}/flag`;
};
