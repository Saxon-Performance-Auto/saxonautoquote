'use client';

import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

type Props = {
  onChange: (signatureDataUrl: string) => void;
};

export default function SignaturePad({ onChange }: Props) {
  const sigRef = useRef<SignatureCanvas>(null);

  const clear = () => {
    sigRef.current?.clear();
    onChange('');
  };

  const handleEnd = () => {
    if (sigRef.current && !sigRef.current.isEmpty()) {
      const dataUrl = sigRef.current.getTrimmedCanvas().toDataURL('image/png');
      onChange(dataUrl);
    }
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigRef}
        onEnd={handleEnd}
        canvasProps={{ className: 'border w-full h-32 rounded bg-white' }}
      />
      <button
        type="button"
        onClick={clear}
        className="text-sm text-red-500 mt-2 underline"
      >
        Clear Signature
      </button>
    </div>
  );
}
