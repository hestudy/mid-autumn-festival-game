import { useLayoutEffect } from 'react';
import { run } from '@/pages/oasis';

export default function IndexPage() {
  useLayoutEffect(() => {
    run();
  }, []);
  return (
    <canvas
      id="canvas"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}
    />
  );
}
