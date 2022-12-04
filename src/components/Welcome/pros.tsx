import { useTranslation } from 'react-i18next';

type ProsType = {
  id: number;
  pro: string;
}[];

export const Pros = () => {
  const { t } = useTranslation();

  const pros: ProsType = t('pros', { returnObjects: true });

  return (
    <ul className="main-pros">{pros && pros.map((item) => <li key={item.id}>{item.pro}</li>)}</ul>
  );
};
