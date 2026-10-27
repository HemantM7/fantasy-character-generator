import React from 'react';
import { Character } from '../types';
import { ClassIcon } from './ClassIcon';
import { Layers, Trash2, Eye, Heart, Zap, Swords } from 'lucide-react';

interface SavedRosterProps {
  party: Character[];
  activeCharacterId?: string;
  onSelectCharacter: (character: Character) => void;
  onRemoveCharacter: (id: string) => void;
  onClearParty: () => void;
}

export const SavedRoster: React.FC<SavedRosterProps> = ({
  party,
  activeCharacterId,
  onSelectCharacter,
  onRemoveCharacter,
  onClearParty
}) => {
  if (party.length === 0) {
    return (
      <div className="w-full bg-slate-950/80 border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center text-slate-400">
        <Layers className="w-8 h-8 mx-auto mb-2 text-amber-500/60" />
        <p className="text-sm font-bold text-slate-200">My Deck is Empty</p>
        <p className="text-xs text-slate-400 mt-1">
          Click "Save to Deck" on generated player cards to collect your hero cards here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-950/90 border-2 border-amber-500/30 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-extrabold text-slate-100 tracking-wide">My Hero Deck</h3>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {party.length} {party.length === 1 ? 'Card' : 'Cards'}
          </span>
        </div>

        {party.length > 0 && (
          <button
            onClick={onClearParty}
            className="text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 cursor-pointer font-semibold"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Deck</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {party.map((hero) => {
          const isActive = hero.id === activeCharacterId;
          return (
            <div
              key={hero.id}
              onClick={() => onSelectCharacter(hero)}
              className={`group relative p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                isActive
                  ? 'bg-amber-950/50 border-amber-400 shadow-lg shadow-amber-950/30 ring-1 ring-amber-400/40'
                  : 'bg-slate-900/80 border-amber-900/40 hover:border-amber-500/50 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  {hero.portraitUrl ? (
                    <img 
                      src={hero.portraitUrl} 
                      alt={hero.name} 
                      className="w-10 h-10 rounded-lg object-cover border border-amber-400/50 shrink-0 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${hero.avatarGradient} shrink-0 shadow-sm border border-white/10`}>
                      <ClassIcon name={hero.iconName} className="w-5 h-5 text-amber-200" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-black text-slate-100 truncate group-hover:text-amber-300 transition-colors">
                      {hero.name}
                    </p>
                    <p className="text-[11px] text-amber-200/70 font-semibold truncate">
                      Lvl {hero.level} {hero.characterClass}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCharacter(hero);
                    }}
                    className="p-1.5 text-slate-400 hover:text-amber-300 rounded-lg hover:bg-slate-800 transition-colors"
                    title="View Player Card"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveCharacter(hero.id);
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Remove from Deck"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Vitals pill footer */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[10px] text-slate-300 font-bold">
                <span className="flex items-center gap-0.5 text-rose-400">
                  <Heart className="w-3 h-3 fill-rose-500/20" /> {hero.health} HP
                </span>
                <span className="flex items-center gap-0.5 text-cyan-400">
                  <Zap className="w-3 h-3 fill-cyan-500/20" /> {hero.mana} MP
                </span>
                <span className="flex items-center gap-0.5 text-amber-400">
                  <Swords className="w-3 h-3" /> {hero.strength} STR
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

