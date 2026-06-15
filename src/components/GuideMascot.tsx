import { Mascot } from './Mascot';

type GuideMascotProps = {
  message: string;
};

export function GuideMascot({ message }: GuideMascotProps) {
  return <Mascot state="encourage" message={message} />;
}
