import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Character } from '../types';
import { ClassIcon } from './ClassIcon';
import { 
  Heart,
  Zap,
  Swords,
  Shield, 
  Sparkles, 
  ScrollText, 
  UserCheck,
  Image as ImageIcon,
  RefreshCw,
  Loader2,
  Wand2,
  Layers,
  Copy,
  Check,
  BookmarkCheck
} from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  isSaved: boolean;
  onSaveToggle: (character: Character) => void;
  onUpdatePortrait: (characterId: string, portraitUrl: string) => void;
  onUpdateBackstory: (characterId: string, backstory: string) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character, 
  isSaved, 
  onSaveToggle,
  onUpdatePortrait,
  onUpdateBackstory
}) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);

  const getModifier = (score: number) => {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const copyToClipboard = () => {
    const text = `🎴 PLAYER CARD: ${character.name}\n` +
      `Class: ${character.characterClass} | Race: ${character.race} | Level: ${character.level}\n` +
      `Alignment: ${character.alignment}\n` +
      `❤️ Health: ${character.health} HP | ⚡ Mana: ${character.mana} MP | ⚔️ Strength: ${character.strength}\n` +
      `Stats: STR ${character.stats.str} (${getModifier(character.stats.str)}), DEX ${character.stats.dex} (${getModifier(character.stats.dex)}), CON ${character.stats.con} (${getModifier(character.stats.con)}), INT ${character.stats.int} (${getModifier(character.stats.int)}), WIS ${character.stats.wis} (${getModifier(character.stats.wis)}), CHA ${character.stats.cha} (${getModifier(character.stats.cha)})\n` +
      `Weapon: ${character.weapon} | Armor: ${character.armor}\n` +
      `Trait: ${character.trait}\n` +
      `Backstory: ${character.backstory}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGeneratePortrait = async () => {
    setIsGeneratingPortrait(true);
    try {
      const response = await fetch('/api/generate-portrait', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterClass: character.characterClass,
          race: character.race,
          weapon: character.weapon,
          armor: character.armor,
          name: character.name,
          seed: Math.floor(Math.random() * 1000000)
        }),
      });
      const data = await response.json();
      if (data.imageUrl) {
        onUpdatePortrait(character.id, data.imageUrl);
      }
    } catch (err) {
      console.error('Error generating portrait:', err);
    } finally {
      setIsGeneratingPortrait(false);
    }
  };

  const handleGenerateBackstory = async () => {
    setIsGeneratingBackstory(true);
    try {
      const response = await fetch('/api/generate-backstory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: character.name,
          characterClass: character.characterClass,
          race: character.race,
          weapon: character.weapon,
          armor: character.armor,
          trait: character.trait
        }),
      });
      const data = await response.json();
      if (data.backstory) {
        onUpdateBackstory(character.id, data.backstory);
      }
    } catch (err) {
      console.error('Error generating backstory:', err);
    } finally {
      setIsGeneratingBackstory(false);
    }
  };

  const statList = [
    { label: 'STR', key: 'str', score: character.stats.str, color: 'bg-red-500' },
    { label: 'DEX', key: 'dex', score: character.stats.dex, color: 'bg-emerald-500' },
    { label: 'CON', key: 'con', score: character.stats.con, color: 'bg-amber-500' },
    { label: 'INT', key: 'int', score: character.stats.int, color: 'bg-blue-500' },
    { label: 'WIS', key: 'wis', score: character.stats.wis, color: 'bg-purple-500' },
    { label: 'CHA', key: 'cha', score: character.stats.cha, color: 'bg-pink-500' },
  ];

  return (
    <motion.div
      key={character.id}
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto p-2 sm:p-2.5 rounded-[28px] bg-gradient-to-b from-amber-400 via-amber-600/80 to-amber-950 border-4 border-amber-300/70 shadow-2xl shadow-amber-950/60 text-slate-100 relative"
    >
      {/* Decorative Golden Corner Accents */}
      <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-amber-200 pointer-events-none rounded-tl" />
      <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-amber-200 pointer-events-none rounded-tr" />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-amber-200 pointer-events-none rounded-bl" />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-amber-200 pointer-events-none rounded-br" />

      {/* Inner Card Container */}
      <div className="rounded-[20px] bg-slate-950 border border-amber-500/40 overflow-hidden relative">
        
        {/* Card Header Tag */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 px-4 py-1.5 border-b border-amber-500/30 flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400/90 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" /> Hero Trading Card
          </span>
          <span className="text-[10px] font-bold text-amber-300/80 uppercase tracking-wider">
            Card #{character.id.slice(-4)}
          </span>
        </div>

        {/* Top Banner Header */}
        <div className={`p-5 bg-gradient-to-r ${character.avatarGradient} relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10`}>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-950/50 rounded-2xl border-2 border-amber-400/50 shadow-inner backdrop-blur-sm shrink-0">
              <ClassIcon name={character.iconName} className="w-9 h-9 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-950/70 text-amber-300 border border-amber-500/40 shadow-sm">
                  LVL {character.level}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/30 text-slate-200 backdrop-blur-sm border border-white/10">
                  {character.alignment}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 drop-shadow-lg">
                {character.name}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-amber-200/90 mt-0.5">
                {character.race} <span className="text-amber-400">•</span> {character.characterClass}
              </p>
            </div>
          </div>

          {/* Action Header Controls */}
          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={() => onSaveToggle(character)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black tracking-wide transition-all border shadow-lg cursor-pointer ${
                isSaved
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-200 shadow-amber-500/20'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border-amber-300'
              }`}
              title={isSaved ? "Saved in My Deck" : "Save to Deck"}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
              <span>{isSaved ? 'In My Deck' : 'Save to Deck'}</span>
            </button>

            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-950/60 hover:bg-slate-950 text-slate-200 border border-white/20 transition-all shadow-sm cursor-pointer"
              title="Copy player card text"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-5 space-y-5">
          
          {/* Prominent Card Stats Row: Health, Mana, Strength */}
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                Primary Card Vitals
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {/* HEALTH */}
              <div className="bg-gradient-to-br from-rose-950/90 via-slate-900 to-red-950/80 p-3 rounded-2xl border-2 border-rose-500/40 flex flex-col items-center justify-center text-center shadow-lg group hover:border-rose-400 transition-colors">
                <div className="flex items-center gap-1 text-rose-400 mb-1">
                  <Heart className="w-4 h-4 fill-rose-500/30 text-rose-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Health</span>
                </div>
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {character.health}
                </span>
                <span className="text-[10px] text-rose-300/70 font-semibold">HP</span>
              </div>

              {/* MANA */}
              <div className="bg-gradient-to-br from-cyan-950/90 via-slate-900 to-blue-950/80 p-3 rounded-2xl border-2 border-cyan-500/40 flex flex-col items-center justify-center text-center shadow-lg group hover:border-cyan-400 transition-colors">
                <div className="flex items-center gap-1 text-cyan-400 mb-1">
                  <Zap className="w-4 h-4 fill-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Mana</span>
                </div>
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {character.mana}
                </span>
                <span className="text-[10px] text-cyan-300/70 font-semibold">MP</span>
              </div>

              {/* STRENGTH */}
              <div className="bg-gradient-to-br from-amber-950/90 via-slate-900 to-orange-950/80 p-3 rounded-2xl border-2 border-amber-500/40 flex flex-col items-center justify-center text-center shadow-lg group hover:border-amber-400 transition-colors">
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  <Swords className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Strength</span>
                </div>
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {character.strength}
                </span>
                <span className="text-[10px] text-amber-300/70 font-semibold">STR</span>
              </div>
            </div>
          </div>

          {/* Character Portrait Section */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-amber-900/40 flex flex-col sm:flex-row items-center gap-5">
            <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-500/50 flex items-center justify-center shrink-0 shadow-xl group">
              {isGeneratingPortrait ? (
                <div className="flex flex-col items-center justify-center gap-2 p-3 text-center">
                  <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
                  <span className="text-xs text-amber-300 font-semibold">Rendering Portrait...</span>
                </div>
              ) : character.portraitUrl ? (
                <img
                  src={character.portraitUrl}
                  alt={`${character.name} Portrait`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${character.avatarGradient} opacity-80`}>
                    <ClassIcon name={character.iconName} className="w-8 h-8 text-amber-200" />
                  </div>
                  <span className="text-xs text-slate-400 font-medium">No Custom Portrait</span>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-center gap-3 text-center sm:text-left">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-400">
                  <ImageIcon className="w-4 h-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">Player Card Art</h3>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Render custom video game artwork matching this <span className="text-amber-300 font-medium">{character.characterClass}</span> warrior.
                </p>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap pt-1">
                <button
                  onClick={handleGeneratePortrait}
                  disabled={isGeneratingPortrait}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md disabled:opacity-50 cursor-pointer"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Generate Art</span>
                </button>

                <button
                  onClick={handleGeneratePortrait}
                  disabled={isGeneratingPortrait}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 transition-all shadow-md disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate Art</span>
                </button>
              </div>
            </div>
          </div>

          {/* D&D / RPG Core Attributes Grid */}
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <UserCheck className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                Detailed RPG Attributes
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {statList.map((stat) => (
                <div 
                  key={stat.key} 
                  className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400">{stat.label}</span>
                    <span className="text-[11px] font-semibold text-amber-300">
                      {getModifier(stat.score)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between my-0.5">
                    <span className="text-lg font-black text-white">{stat.score}</span>
                    <span className="text-[10px] text-slate-500">/ 20</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${stat.color}`}
                      style={{ width: `${Math.min(100, (stat.score / 20) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment & Gear */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Swords className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Equipped Weapon</span>
              </div>
              <p className="text-xs font-semibold text-slate-200">{character.weapon}</p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Equipped Armor</span>
              </div>
              <p className="text-xs font-semibold text-slate-200">{character.armor}</p>
            </div>
          </div>

          {/* Special Trait */}
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Special Trait</span>
            </div>
            <p className="text-xs font-medium text-amber-100/90">
              "{character.trait}"
            </p>
          </div>

          {/* Lore & Backstory */}
          <div className="bg-slate-900/80 p-3.5 sm:p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-amber-400">
                <ScrollText className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Origin & Lore</span>
              </div>

              <button
                onClick={handleGenerateBackstory}
                disabled={isGeneratingBackstory}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all cursor-pointer disabled:opacity-50"
                title="Generate new unique backstory for this hero"
              >
                {isGeneratingBackstory ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                    <span>Weaving Lore...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Generate Backstory</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              {isGeneratingBackstory ? (
                <span className="text-amber-400/80 animate-pulse">Consulting ancient scrolls for an epic backstory...</span>
              ) : (
                character.backstory
              )}
            </p>
          </div>

        </div>

        {/* Card Footer Tag */}
        <div className="bg-gradient-to-r from-slate-950 via-amber-950/40 to-slate-950 px-4 py-2 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-amber-200/80">
          <div className="flex items-center gap-3">
            <span>❤️ {character.health} HP</span>
            <span>⚡ {character.mana} MP</span>
            <span>⚔️ {character.strength} STR</span>
          </div>
          <button
            onClick={() => onSaveToggle(character)}
            className="text-amber-400 hover:text-amber-300 font-bold transition-colors flex items-center gap-1 cursor-pointer"
          >
            {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-300" /> : <Layers className="w-3.5 h-3.5" />}
            <span>{isSaved ? 'In Deck' : 'Save to Deck'}</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
};

