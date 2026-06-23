export const clubImage = (id: string | number) => {
  return `https://images.fotmob.com/image_resources/logo/teamlogo/${id}_xsmall.png`;
};

export const tournamentImage = (id: string | number) => {
  return `https://images.fotmob.com/image_resources/logo/leaguelogo/${id}.png`;
};

export const countryImage = (alpha: string) => {
  return `https://img.sofascore.com/api/v1/country/${alpha}/flag`;
};
