import React, { useEffect, useRef, useState } from 'react';
import { LuChevronDown, LuPin, LuPinOff, LuSparkles, LuSave, LuCheck } from 'react-icons/lu';
import AIResponsePreview from '../../pages/InterviewPrep/components/AIResponsePreview';

const QuestionCard = ({ _id, question, answer, onLearnMore, isPinned, onTogglePin, existingNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const [note, setNote] = useState(existingNote || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isNoteSaved, setIsNoteSaved] = useState(!!existingNote);
  const [showNoteInput, setShowNoteInput] = useState(!existingNote);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded, note, showNoteInput]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Save note then switch to view mode
  const handleSaveNote = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem('Token');

      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'https://backend-proj-mu.vercel.app'}/api/questions/${_id}/note`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ note }),
        }
      );

      if (!res.ok) throw new Error('Failed to save note');

      // Switch UI to view mode after successful save
      setIsNoteSaved(true);
      setShowNoteInput(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60'>
      {/* Header */}
      <div className='flex items-start justify-between mr-5 cursor-pointer'>
        <div className='flex items-start gap-3.5'>
          <span className='text-xs md:text-[15px] font-semibold text-black leading-[18px]'>Q</span>
          <h3
            className='text-xs md:text-[14px] font-medium text-gray-800 mr-0 md:mr-13'
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>

        <div className='flex items-center justify-end ml-4 relative'>
          <div className={`flex ${isExpanded ? 'md:flex' : 'md:hidden group-hover:flex'}`}>
            <button
              className='flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 mr-2 rounded text-nowrap border border-indigo-50 hover:border-indigo-200 cursor-pointer'
              onClick={onTogglePin}
            >
              {isPinned ? <LuPinOff className='text-xs' /> : <LuPin className='text-xs' />}
            </button>
            <button
              className='flex items-center gap-2 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 mr-2 rounded text-nowrap border border-cyan-50 hover:border-cyan-200 cursor-pointer'
              onClick={() => {
                setIsExpanded(true);
                onLearnMore();
              }}
            >
              <LuSparkles />
              <span className='hidden md:block'>Learn More!</span>
            </button>
          </div>
          <button
            className='text-gray-400 hover:text-gray-500 cursor-pointer ml-4'
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={25}
              className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Expandable Content */}
      <div
        className='overflow-hidden transition-all duration-300 ease-in-out'
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef} className='mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg'>
          <AIResponsePreview content={answer} />

          {/* NOTE SECTION */}
          <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Your Note:
            </label>

            {/* Show saved note with Edit button */}
            {!showNoteInput && isNoteSaved && (
              <div className='bg-gray-100 p-2 rounded-md text-sm text-gray-800 flex justify-between items-center'>
                <p className='m-0 break-words'>{note}</p>
                <button
                  onClick={() => setShowNoteInput(true)} // Switch to edit mode
                  className='text-amber-500 text-xs hover:underline flex items-center gap-1 cursor-pointer'
                >
                  Edit
                </button>
              </div>
            )}

            {/* Show textarea when editing */}
            {showNoteInput && (
              <>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder='Write a note about this question...'
                  rows='2'
                  className='w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-indigo-300 focus:outline-none'
                />
                <button
                  onClick={handleSaveNote}
                  disabled={isSaving || note.trim() === ''}
                  className={`mt-2 flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-md transition ${
                    isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 text-white hover:bg-amber-400 cursor-pointer'
                  }`}
                >
                  {isSaving ? 'Saving...' : 'Save Note'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
