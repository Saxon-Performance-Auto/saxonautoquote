// components/SignaturePad.tsx
import React, { forwardRef } from 'react';
import ReactSignatureCanvas from 'react-signature-canvas';

const SignaturePad = forwardRef<ReactSignatureCanvas, any>((props, ref) => {
  return <ReactSignatureCanvas ref={ref} {...props} />;
});

SignaturePad.displayName = 'SignaturePad';

export default SignaturePad;

