import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Character, GeneratorOptions } from './types';
import { generateRandomCharacter, CLASSES, RACES } from './data/characterData';
import { CharacterCard } from './components/CharacterCard';
import { SavedRoster } from './components/SavedRoster';
import { 
  Sparkles, 
  Dices, 
  Filter, 
  ShieldAlert, 
  Compass, 
  RefreshCw 
} from 'lucide-react';

export default function App() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [party, setParty] = useState<Character[]>(() => {
    try {
      const saved = localStorage.getItem('fantasy_party_roster');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [options, setOptions] = useState<GeneratorOptions>({
    lockedClass: null,
    lockedRace: null,
  });

  const [isRolling, setIsRolling] = useState(false);

  // Generate initial character on mount
  useEffect(() => {
    handleGenerate();
  }, []);

  // Save party roster to local storage
  useEffect(() => {
    try {
      localStorage.setItem('fantasy_party_roster', JSON.stringify(party));
    } catch (e) {
      console.error('Failed to save party roster', e);
    }
  }, [party]);

  const handleGenerate = () => {
    setIsRolling(true);
    setTimeout(() => {
      const newChar = generateRandomCharacter(options);
      setCharacter(newChar);
      setIsRolling(false);
    }, 250);
  };

  const handleSaveToggle = (charToSave: Character) => {
    setParty((prev) => {
      const exists = prev.some((c) => c.id === charToSave.id);
      if (exists) {
        return prev.filter((c) => c.id !== charToSave.id);
      } else {
        if (prev.length >= 6) {
          alert('Deck is full! Maximum 6 hero cards allowed in My Deck.');
          return prev;
        }
        return [...prev, charToSave];
      }
    });
  };

  const handleRemoveFromParty = (id: string) => {
    setParty((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClearParty = () => {
    if (confirm('Are you sure you want to clear My Deck?')) {
      setParty([]);
    }
  };

  const handleUpdatePortrait = (characterId: string, portraitUrl: string) => {
    if (character && character.id === characterId) {
      setCharacter((prev) => (prev ? { ...prev, portraitUrl } : null));
    }
    setParty((prev) =>
      prev.map((c) => (c.id === characterId ? { ...c, portraitUrl } : c))
    );
  };

  const handleUpdateBackstory = (characterId: string, backstory: string) => {
    if (character && character.id === characterId) {
      setCharacter((prev) => (prev ? { ...prev, backstory } : null));
    }
    setParty((prev) =>
      prev.map((c) => (c.id === characterId ? { ...c, backstory } : c))
    );
  };

  const isCurrentSaved = character ? party.some((c) => c.id === character.id) : false;

  return (
    <div className="min-w-screen min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Background Ambience Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-slate-950 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center gap-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Fantasy Hero Forge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
            Fantasy Character Generator
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
            Click the button below to forge a heroic legend with random names, classes, attributes, and lore.
          </p>
        </div>

        {/* Generator Controls & Button */}
        <div className="w-full flex flex-col items-center gap-6">
          {/* Main Hero Generate Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGenerate}
            disabled={isRolling}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-black text-lg sm:text-xl tracking-wide shadow-xl shadow-amber-900/30 border border-amber-300/40 cursor-pointer disabled:opacity-80 transition-all"
          >
            <motion.div
              animate={{ rotate: isRolling ? 360 : 0 }}
              transition={{ duration: 0.4, ease: 'linear' }}
            >
              <Dices className="w-7 h-7 text-slate-950 group-hover:rotate-12 transition-transform" />
            </motion.div>
            <span>{isRolling ? 'Rolling Fate...' : 'Generate Character'}</span>
            <Sparkles className="w-5 h-5 text-amber-950 opacity-70 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          {/* Quick Filters (Optional Lock Settings) */}
          <div className="w-full max-w-xl bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400 font-semibold uppercase tracking-wider shrink-0">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Lock Filters:</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Class Select */}
              <select
                value={options.lockedClass || ''}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    lockedClass: e.target.value ? e.target.value : null,
                  }))
                }
                className="w-full sm:w-auto bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-medium focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option value="">Any Class (Random)</option>
                {CLASSES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Race Select */}
              <select
                value={options.lockedRace || ''}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    lockedRace: e.target.value ? e.target.value : null,
                  }))
                }
                className="w-full sm:w-auto bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-medium focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option value="">Any Race (Random)</option>
                {RACES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              {(options.lockedClass || options.lockedRace) && (
                <button
                  onClick={() => setOptions({ lockedClass: null, lockedRace: null })}
                  className="p-1.5 text-slate-400 hover:text-amber-300 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
                  title="Reset Locks"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Character Card Display */}
        <AnimatePresence mode="wait">
          {character && (
            <CharacterCard
              character={character}
              isSaved={isCurrentSaved}
              onSaveToggle={handleSaveToggle}
              onUpdatePortrait={handleUpdatePortrait}
              onUpdateBackstory={handleUpdateBackstory}
            />
          )}
        </AnimatePresence>

        {/* Saved Party Roster */}
        <div className="w-full max-w-2xl mt-4">
          <SavedRoster
            party={party}
            activeCharacterId={character?.id}
            onSelectCharacter={(char) => setCharacter(char)}
            onRemoveCharacter={handleRemoveFromParty}
            onClearParty={handleClearParty}
          />
        </div>
      </div>
    </div>
  );
}
