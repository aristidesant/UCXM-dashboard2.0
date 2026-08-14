/** Account summary card: avatar initials, name, email, and an optional status badge (used at the top of Ajustes). */
export interface ProfileCardProps {
  initials: string;
  name: string;
  email: string;
  badgeLabel?: string;
  badgeValue?: string;
}

export declare function ProfileCard(props: ProfileCardProps): JSX.Element;
