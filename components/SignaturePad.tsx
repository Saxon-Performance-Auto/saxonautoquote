import React, { useEffect, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

type Props = {
  onChange: (dataUrl: string) => void;
};

export default function SignaturePad({ onChange }: Props) {
  const sigRef = useRef<SignatureCanvas>(null);

  const clear = () => {
    sigRef.current?.clear();
    onChange('');
  };

  // Attach onEnd manually to the canvas after mounting
  useEffect(() => {
    if (!sigRef.current) return;

    const canvas = sigRef.current;
    const handler = () => {
      if (!canvas.isEmpty()) {
        const data = canvas.getTrimmedCanvas().toDataURL('image/png');
        onChange(data);
      }
    };

    // Hacky attach to internal canvas event
    const canvasEl = canvas.getCanvas();
    canvasEl.addEventListener('mouseup', handler);
    canvasEl.addEventListener('touchend', handler);

    return () => {
      canvasEl.removeEventListener('mouseup', handler);
      canvasEl.removeEventListener('touchend', handler);
    };
  }, [onChange]);

  return (
    <div className="space-y-2">
      <SignatureCanvas
        ref={sigRef}
        canvasProps={{
          className: 'border w-full h-32 rounded bg-white'
        }}
      />
      <button
        type="button"
        onClick={clear}
        className="text-sm text-red-600 underline"
      >
        Clear Signature
      </button>
    </div>
  );
}
