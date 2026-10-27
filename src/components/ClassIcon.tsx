import React from 'react';
import { 
  Sword, 
  WandSparkles, 
  Swords, 
  Shield, 
  Cross, 
  Trees, 
  Music, 
  Flame, 
  Leaf, 
  Zap, 
  Skull, 
  Axe, 
  Sparkles 
} from 'lucide-react';

interface ClassIconProps {
  name: string;
  className?: string;
}

export const ClassIcon: React.FC<ClassIconProps> = ({ name, className = "w-6 h-6" }) => {
  switch (name) {
    case 'Sword':
      return <Sword className={className} />;
    case 'WandSparkles':
      return <WandSparkles className={className} />;
    case 'Dagger':
    case 'Swords':
      return <Swords className={className} />;
    case 'Shield':
      return <Shield className={className} />;
    case 'Cross':
      return <Cross className={className} />;
    case 'Trees':
      return <Trees className={className} />;
    case 'Music':
      return <Music className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'Leaf':
      return <Leaf className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'Skull':
      return <Skull className={className} />;
    case 'Axe':
      return <Axe className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};
